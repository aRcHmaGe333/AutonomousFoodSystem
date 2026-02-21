"""
Core monitoring functionality for the Autonomous Food System.
"""
import time
import logging
import psutil
import platform
from typing import Dict, List, Optional, Callable, Any
from dataclasses import dataclass, field
from datetime import datetime
import threading
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class Metric:
    """Represents a single metric measurement."""
    name: str
    value: float
    timestamp: float = field(default_factory=time.time)
    tags: Dict[str, str] = field(default_factory=dict)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert metric to dictionary."""
        return {
            'name': self.name,
            'value': self.value,
            'timestamp': self.timestamp,
            'tags': self.tags
        }

class MetricCollector:
    """Collects and manages system and application metrics."""
    
    def __init__(self):
        self.metrics: List[Metric] = []
        self.max_metrics = 1000  # Maximum number of metrics to keep in memory
        self.lock = threading.Lock()
        self.running = False
        self.thread: Optional[threading.Thread] = None
        
    def add_metric(self, name: str, value: float, tags: Optional[Dict[str, str]] = None) -> None:
        """Add a new metric."""
        with self.lock:
            if tags is None:
                tags = {}
            self.metrics.append(Metric(name, value, tags=tags))
            
            # Trim old metrics if we have too many
            if len(self.metrics) > self.max_metrics:
                self.metrics = self.metrics[-self.max_metrics:]
    
    def collect_system_metrics(self) -> None:
        """Collect system-level metrics."""
        # CPU
        self.add_metric('system.cpu.percent', psutil.cpu_percent(interval=1))
        
        # Memory
        mem = psutil.virtual_memory()
        self.add_metric('system.memory.percent', mem.percent)
        self.add_metric('system.memory.used', mem.used / (1024 ** 3))  # in GB
        self.add_metric('system.memory.available', mem.available / (1024 ** 3))  # in GB
        
        # Disk
        disk = psutil.disk_usage('/')
        self.add_metric('system.disk.percent', disk.percent)
        self.add_metric('system.disk.used', disk.used / (1024 ** 3))  # in GB
        self.add_metric('system.disk.free', disk.free / (1024 ** 3))  # in GB
        
        # Network
        net_io = psutil.net_io_counters()
        self.add_metric('system.network.bytes_sent', net_io.bytes_sent / (1024 ** 2))  # in MB
        self.add_metric('system.network.bytes_recv', net_io.bytes_recv / (1024 ** 2))  # in MB
    
    def get_metrics(self, name: Optional[str] = None, 
                   tags: Optional[Dict[str, str]] = None,
                   limit: int = 100) -> List[Metric]:
        """Get metrics with optional filtering."""
        with self.lock:
            metrics = self.metrics.copy()
        
        if name:
            metrics = [m for m in metrics if m.name == name]
            
        if tags:
            metrics = [m for m in metrics if all(item in m.tags.items() for item in tags.items())]
            
        return metrics[-limit:]
    
    def start(self, interval: int = 60) -> None:
        """Start the metric collection in a background thread."""
        if self.running:
            logger.warning("Metric collection is already running")
            return
            
        self.running = True
        
        def collect_loop():
            while self.running:
                try:
                    self.collect_system_metrics()
                except Exception as e:
                    logger.error(f"Error collecting metrics: {e}")
                time.sleep(interval)
        
        self.thread = threading.Thread(target=collect_loop, daemon=True)
        self.thread.start()
        logger.info(f"Started metric collection with {interval}s interval")
    
    def stop(self) -> None:
        """Stop the metric collection."""
        self.running = False
        if self.thread:
            self.thread.join()
        logger.info("Stopped metric collection")

class ComponentMonitor:
    """Monitors individual system components."""
    
    def __init__(self, name: str, health_check: Callable[[], bool], 
                 metrics: Optional[Dict[str, Callable[[], float]]] = None):
        self.name = name
        self.health_check = health_check
        self.metrics = metrics or {}
        self.status = 'unknown'
        self.last_checked = 0
        self.check_interval = 60  # seconds
        
    def check_health(self) -> bool:
        """Check the health of the component."""
        try:
            is_healthy = self.health_check()
            self.status = 'healthy' if is_healthy else 'unhealthy'
            self.last_checked = time.time()
            return is_healthy
        except Exception as e:
            logger.error(f"Error checking health of {self.name}: {e}")
            self.status = 'error'
            self.last_checked = time.time()
            return False
    
    def collect_metrics(self) -> Dict[str, float]:
        """Collect metrics for this component."""
        metrics = {}
        for name, func in self.metrics.items():
            try:
                metrics[f"component.{self.name}.{name}"] = func()
            except Exception as e:
                logger.error(f"Error collecting metric {name} for {self.name}: {e}")
        return metrics

class MonitoringSystem:
    """Main monitoring system that manages multiple component monitors."""
    
    def __init__(self):
        self.metric_collector = MetricCollector()
        self.components: Dict[str, ComponentMonitor] = {}
        self.running = False
        self.thread: Optional[threading.Thread] = None
    
    def register_component(self, name: str, 
                         health_check: Callable[[], bool],
                         metrics: Optional[Dict[str, Callable[[], float]]] = None) -> None:
        """Register a new component to monitor."""
        self.components[name] = ComponentMonitor(name, health_check, metrics)
        logger.info(f"Registered component for monitoring: {name}")
    
    def check_all_components(self) -> Dict[str, str]:
        """Check health of all registered components."""
        statuses = {}
        for name, component in self.components.items():
            if time.time() - component.last_checked >= component.check_interval:
                component.check_health()
            statuses[name] = component.status
            
            # Collect component metrics
            metrics = component.collect_metrics()
            for metric_name, value in metrics.items():
                self.metric_collector.add_metric(metric_name, value, {"component": name})
                
        return statuses
    
    def start(self, interval: int = 60) -> None:
        """Start the monitoring system."""
        if self.running:
            logger.warning("Monitoring system is already running")
            return
            
        self.running = True
        self.metric_collector.start(interval)
        
        def monitor_loop():
            while self.running:
                try:
                    self.check_all_components()
                except Exception as e:
                    logger.error(f"Error in monitoring loop: {e}")
                time.sleep(interval)
        
        self.thread = threading.Thread(target=monitor_loop, daemon=True)
        self.thread.start()
        logger.info(f"Started monitoring system with {interval}s check interval")
    
    def stop(self) -> None:
        """Stop the monitoring system."""
        self.running = False
        self.metric_collector.stop()
        if self.thread:
            self.thread.join()
        logger.info("Stopped monitoring system")
    
    def get_status(self) -> Dict[str, Any]:
        """Get the current status of all components."""
        return {
            'system': {
                'hostname': platform.node(),
                'platform': platform.platform(),
                'python_version': platform.python_version(),
                'timestamp': datetime.utcnow().isoformat()
            },
            'components': {name: {
                'status': comp.status,
                'last_checked': comp.last_checked,
                'metrics': list(comp.metrics.keys())
            } for name, comp in self.components.items()}
        }

# Global instance for easy access
monitoring_system = MonitoringSystem()

def start_monitoring(interval: int = 60) -> None:
    """Start the global monitoring system."""
    monitoring_system.start(interval)

def stop_monitoring() -> None:
    """Stop the global monitoring system."""
    monitoring_system.stop()

def register_component(name: str, 
                     health_check: Callable[[], bool],
                     metrics: Optional[Dict[str, Callable[[], float]]] = None) -> None:
    """Register a component with the global monitoring system."""
    monitoring_system.register_component(name, health_check, metrics)

def get_status() -> Dict[str, Any]:
    """Get the current status from the global monitoring system."""
    return monitoring_system.get_status()
