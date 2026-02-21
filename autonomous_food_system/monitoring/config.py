"""
Configuration for the monitoring system.
"""
from dataclasses import dataclass
from typing import Dict, Any, Optional

@dataclass
class MonitoringConfig:
    """Configuration for the monitoring system."""
    # Default check interval in seconds for system metrics
    system_metrics_interval: int = 60
    
    # Default check interval in seconds for component health checks
    component_check_interval: int = 60
    
    # Whether to start the monitoring system automatically
    autostart: bool = True
    
    # Maximum number of metrics to keep in memory
    max_metrics: int = 1000
    
    # Component-specific configurations
    component_configs: Dict[str, Dict[str, Any]] = None
    
    # System metrics to collect
    collect_cpu: bool = True
    collect_memory: bool = True
    collect_disk: bool = True
    collect_network: bool = True
    
    # Logging configuration
    log_level: str = "INFO"
    log_file: Optional[str] = None  # Set to a file path to enable file logging
    
    def __post_init__(self):
        if self.component_configs is None:
            self.component_configs = {
                # Example configuration for a database component
                "database": {
                    "check_interval": 30,  # Check every 30 seconds
                    "metrics": {
                        "connection_count": "SELECT COUNT(*) FROM pg_stat_activity",
                        "query_count": "SELECT SUM(xact_commit + xact_rollback) FROM pg_stat_database"
                    }
                },
                # Example configuration for a web service
                "web_service": {
                    "check_interval": 10,  # Check every 10 seconds
                    "endpoint": "http://localhost:8000/health"
                },
                # Example configuration for a message queue
                "message_queue": {
                    "check_interval": 15,
                    "host": "localhost",
                    "port": 5672,
                    "vhost": "/",
                    "queue": "tasks"
                }
            }

# Default configuration
default_config = MonitoringConfig()
