"""
Example usage of the self-healing system with the Autonomous Food System.
"""
import time
import random
from autonomous_food_system.self_healing.core import (
    SelfHealingSystem, register_component, start_self_healing
)

# Example component: Database connection
def check_database_health() -> bool:
    """Simulate checking if the database is healthy."""
    # 80% chance of being healthy
    return random.random() < 0.8

def recover_database() -> bool:
    """Simulate database recovery."""
    print("Attempting to recover database...")
    time.sleep(1)  # Simulate recovery time
    # 70% chance of successful recovery
    return random.random() < 0.7

# Example component: Sensor network
def check_sensor_network() -> bool:
    """Simulate checking if the sensor network is healthy."""
    # 90% chance of being healthy
    return random.random() < 0.9

def recover_sensor_network() -> bool:
    """Simulate sensor network recovery."""
    print("Attempting to recover sensor network...")
    time.sleep(2)  # Simulate recovery time
    # 80% chance of successful recovery
    return random.random() < 0.8

def main():
    # Register components with the self-healing system
    register_component(
        name="database",
        health_check=check_database_health,
        recovery_action=recover_database,
        check_interval=10,  # Check every 10 seconds
        max_retries=3       # Try up to 3 times to recover
    )
    
    register_component(
        name="sensor_network",
        health_check=check_sensor_network,
        recovery_action=recover_sensor_network,
        check_interval=15,  # Check every 15 seconds
        max_retries=2       # Try up to 2 times to recover
    )
    
    # Start the self-healing system
    start_self_healing()
    
    print("Self-healing system started. Press Ctrl+C to stop.")
    
    try:
        # Keep the main thread alive
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down...")

if __name__ == "__main__":
    main()
