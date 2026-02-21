"""
Core self-healing functionality for the Autonomous Food System.
"""
import time
import logging
from typing import Callable, Dict, Any, Optional
from dataclasses import dataclass, field
from enum import Enum, auto
import threading

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class HealthStatus(Enum):
    HEALTHY = auto()
    DEGRADED = auto()
    CRITICAL = auto()

@dataclass
class Component:
    name: str
    health_check: Callable[[], bool]
    recovery_action: Callable[[], bool]
    check_interval: int = 60  # seconds
    max_retries: int = 3
    retry_count: int = 0
    status: HealthStatus = HealthStatus.HEALTHY
    last_checked: float = field(default_factory=time.time)

class SelfHealingSystem:
    def __init__(self):
        self.components: Dict[str, Component] = {}
        self.running = False
        self.thread = None
        
    def register_component(self, name: str, health_check: Callable[[], bool], 
                         recovery_action: Callable[[], bool],
                         check_interval: int = 60,
                         max_retries: int = 3) -> None:
        """Register a new component with its health check and recovery action."""
        self.components[name] = Component(
            name=name,
            health_check=health_check,
            recovery_action=recovery_action,
            check_interval=check_interval,
            max_retries=max_retries
        )
        logger.info(f"Registered component: {name}")
    
    def check_health(self) -> None:
        """Check health of all registered components."""
        current_time = time.time()
        for component in self.components.values():
            if current_time - component.last_checked >= component.check_interval:
                try:
                    is_healthy = component.health_check()
                    if is_healthy:
                        component.status = HealthStatus.HEALTHY
                        component.retry_count = 0
                        logger.info(f"Component {component.name} is healthy")
                    else:
                        self._handle_failure(component)
                except Exception as e:
                    logger.error(f"Error checking health of {component.name}: {e}")
                    self._handle_failure(component)
                component.last_checked = current_time
    
    def _handle_failure(self, component: Component) -> None:
        """Handle a component failure by attempting recovery."""
        component.retry_count += 1
        
        if component.retry_count >= component.max_retries:
            component.status = HealthStatus.CRITICAL
            logger.error(f"Component {component.name} is in CRITICAL state after {component.retry_count} retries")
            return
            
        component.status = HealthStatus.DEGRADED
        logger.warning(f"Component {component.name} is unhealthy, attempting recovery (attempt {component.retry_count}/{component.max_retries})")
        
        try:
            if component.recovery_action():
                component.status = HealthStatus.HEALTHY
                component.retry_count = 0
                logger.info(f"Successfully recovered component {component.name}")
            else:
                logger.warning(f"Recovery attempt failed for {component.name}")
        except Exception as e:
            logger.error(f"Error during recovery of {component.name}: {e}")
    
    def start(self) -> None:
        """Start the self-healing system in a background thread."""
        if self.running:
            logger.warning("Self-healing system is already running")
            return
            
        self.running = True
        self.thread = threading.Thread(target=self._run, daemon=True)
        self.thread.start()
        logger.info("Self-healing system started")
    
    def stop(self) -> None:
        """Stop the self-healing system."""
        self.running = False
        if self.thread:
            self.thread.join()
        logger.info("Self-healing system stopped")
    
    def _run(self) -> None:
        """Main loop for the self-healing system."""
        while self.running:
            self.check_health()
            time.sleep(1)  # Check every second, but components have their own intervals

# Global instance for easy access
self_healing_system = SelfHealingSystem()

def start_self_healing() -> None:
    """Start the global self-healing system."""
    self_healing_system.start()

def stop_self_healing() -> None:
    """Stop the global self-healing system."""
    self_healing_system.stop()

def register_component(name: str, health_check: Callable[[], bool], 
                     recovery_action: Callable[[], bool],
                     check_interval: int = 60,
                     max_retries: int = 3) -> None:
    """Register a component with the global self-healing system."""
    self_healing_system.register_component(
        name, health_check, recovery_action, check_interval, max_retries
    )
