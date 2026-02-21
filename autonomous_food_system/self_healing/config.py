""
Configuration for the self-healing system.
"""
from dataclasses import dataclass
from typing import Dict, Any

@dataclass
class SelfHealingConfig:
    """Configuration for the self-healing system."""
    # Default check interval in seconds
    default_check_interval: int = 60
    
    # Maximum number of recovery attempts before giving up
    default_max_retries: int = 3
    
    # Whether to start the self-healing system automatically
    autostart: bool = True
    
    # Component-specific configurations
    component_configs: Dict[str, Dict[str, Any]] = None
    
    def __post_init__(self):
        if self.component_configs is None:
            self.component_configs = {
                # Example configuration for a database component
                "database": {
                    "check_interval": 30,  # Check every 30 seconds
                    "max_retries": 5,      # Allow 5 retries before giving up
                },
                # Example configuration for an API service
                "api_service": {
                    "check_interval": 10,  # Check every 10 seconds
                    "max_retries": 3,
                }
            }

# Default configuration
default_config = SelfHealingConfig()
