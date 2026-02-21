# Self-Healing System

## Overview
This module provides a self-healing mechanism for the Autonomous Food System. It periodically checks component health and attempts automatic recovery with configurable retry limits.

## Features
- Component health monitoring with configurable check intervals
- Automatic failure detection and recovery
- Configurable retry policies
- Thread-safe implementation
- Detailed logging

## Usage

### Registering Components
```python
from autonomous_food_system.self_healing.core import register_component, start_self_healing

def health_check() -> bool:
    # Implement your health check logic
    return True

def recovery_action() -> bool:
    # Implement your recovery logic
    return True

# Register a component
register_component(
    name="my_component",
    health_check=health_check,
    recovery_action=recovery_action,
    check_interval=60,  # seconds
    max_retries=3
)

# Start the self-healing system
start_self_healing()
```

## Configuration
Edit `config.py` to customize the self-healing behavior for different components.

## Example
See `examples/self_healing_example.py` for a complete usage example.

## Requirements
- Python 3.7+
- No external dependencies required
