# Monitoring System

## Overview
This module provides comprehensive monitoring capabilities for the Autonomous Food System, enabling real-time tracking of system health, performance metrics, and component status.

## Features
- System-level metrics collection (CPU, memory, disk, network)
- Component health monitoring with custom health checks
- Custom metrics collection for application-specific data
- Thread-safe implementation
- Configurable check intervals and alerting thresholds
- Extensible architecture for adding new monitoring sources

## Usage

### Basic Setup
```python
from autonomous_food_system.monitoring import start_monitoring, register_component

def health_check() -> bool:
    # Implement your health check logic
    return True

# Register a component with custom metrics
register_component(
    name="my_component",
    health_check=health_check,
    metrics={
        'queue_size': lambda: get_queue_size(),
        'processing_time': lambda: get_avg_processing_time()
    }
)

# Start the monitoring system with a 30-second update interval
start_monitoring(interval=30)
```

### Configuration
Edit `config.py` to customize monitoring behavior. Example configuration:

```python
from autonomous_food_system.monitoring.config import MonitoringConfig

# Custom configuration
custom_config = MonitoringConfig(
    system_metrics_interval=60,  # Collect system metrics every 60 seconds
    component_check_interval=30,  # Check component health every 30 seconds
    max_metrics=5000,            # Keep up to 5000 metrics in memory
    log_level="DEBUG"            # Enable debug logging
)
```

### Checking System Status
```python
from autonomous_food_system.monitoring import get_status

# Get current system status
status = get_status()
print(f"System status: {status}")
```

## Example
See `examples/monitoring_example.py` for a complete usage example with simulated components.

## Requirements
- Python 3.7+
- psutil (for system metrics collection)
- (Optional) Any additional dependencies required by your custom metrics collectors

## Integration
To integrate with the self-healing system, use the health check status to trigger recovery actions when components become unhealthy.
