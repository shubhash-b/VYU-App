import random
from pymongo import MongoClient
from datetime import datetime
import time

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['traffic_data']  # Database name
collection = db['vehicle_counts']  # Collection name

def generate_random_counts():
    """Generate random counts for different categories."""
    return {
        'car': random.randint(0, 100),
        'bike': random.randint(0, 100),
        'bus': random.randint(0, 50),
        'human': random.randint(0, 200),
        'truck': random.randint(0, 30)
    }

def push_random_data():
    """Push random data to MongoDB with timestamp."""
    # Current timestamp in HH:MM:SS format
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Generate random counts for vehicles and humans
    counts = generate_random_counts()

    # Create data document to insert
    data = {
        'timestamp': timestamp,
        'car': counts['car'],
        'bike': counts['bike'],
        'bus': counts['bus'],
        'human': counts['human'],
        'truck': counts['truck']
    }

    # Insert the data into MongoDB
    collection.insert_one(data)
    print(f"Data inserted at {timestamp}: {data}")

# Insert 200 records
for _ in range(200):
    push_random_data()
    time.sleep(0.1)  # Small delay to simulate real-time insertion, adjust as needed

print("200 records inserted successfully!")
