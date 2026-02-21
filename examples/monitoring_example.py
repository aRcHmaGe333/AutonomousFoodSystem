"""
Example usage of the monitoring system with the Autonomous Food System.
"""
import time
import random
import psutil
from autonomous_food_system.monitoring.core import (
    start_monitoring, register_component, get_status
)

def check_database_health() -> bool:
    """Simulate checking if the database is healthy."""
    # 90% chance of being healthy
    return random.random() < 0.9

def get_database_metrics() -> dict:
    """Simulate collecting database metrics."""
    return {
        'connection_count': random.randint(5, 50),
        'query_rate': random.uniform(10.0, 100.0),
        'cache_hit_ratio': random.uniform(0.8, 0.99)
    }

def check_sensor_network() -> bool:
    """Simulate checking if the sensor network is healthy."""
    # 95% chance of being healthy
    return random.random() < 0.95

def get_sensor_metrics() -> dict:
    """Simulate collecting sensor network metrics."""
    return {
        'connected_sensors': random.randint(10, 50),
        'update_frequency': random.uniform(1.0, 10.0),  # Hz
        'error_rate': random.uniform(0.0, 0.05)  # 0-5% error rate
    }

def main():
    # Register components with the monitoring system
    register_component(
        name="database",
        health_check=check_database_health,
        metrics={
            'connection_count': lambda: get_database_metrics()['connection_count'],
            'query_rate': lambda: get_database_metrics()['query_rate'],
            'cache_hit_ratio': lambda: get_database_metrics()['cache_hit_ratio']
        }
    )
    
    register_component(
        name="sensor_network",
        health_check=check_sensor_network,
        metrics={
            'connected_sensors': lambda: get_sensor_metrics()['connected_sensors'],
            'update_frequency': lambda: get_sensor_metrics()['update_frequency'],
            'error_rate': lambda: get_sensor_metrics()['error_rate']
        }
    )
    
    # Start the monitoring system with a 10-second update interval
    start_monitoring(interval=10)
    
    print("Monitoring system started. Press Ctrl+C to stop.")
    print("System status will be displayed every 30 seconds...\n")
    
    try:
        while True:
            # Display system status periodically
            status = get_status()
            print("\n=== System Status ===")
            print(f"Host: {status['system']['hostname']}")
            print(f"Time: {status['system']['timestamp']}")
            print("\nComponent Status:")
            
            for name, comp in status['components'].items():
                print(f"- {name}: {comp['status'].upper()}")
                
                # Display metrics for the component
                metrics = get_database_metrics() if name == 'database' else get_sensor_metrics()
                print(f"  Metrics: {', '.join([f'{k}: {v:.2f}' if isinstance(v, float) else f'{k}: {v}' for k, v in metrics.items()])}")
            
            # Wait before next update
            time.sleep(30)
            
    except KeyboardInterrupt:
        print("\nShutting down monitoring system...")

if __name__ == "__main__":
    main()
