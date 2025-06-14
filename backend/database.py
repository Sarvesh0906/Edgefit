# database.py
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize variables
client = None
db = None
users_collection = None
chat_collection = None
llm_collection = None

def init_db():
    """Initialize database connection and collections"""
    global client, db, users_collection, chat_collection, llm_collection
    
    try:
        load_dotenv()
        MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        
        client = AsyncIOMotorClient(MONGODB_URL)
        # Ping the server to confirm connection
        client.admin.command('ping')
        logger.info("Successfully connected to MongoDB!")
        
        db = client["5g"]
        users_collection = db["user_data"]
        chat_collection = db["chat_history"]
        llm_collection = db["llm_data"]
        
        return True
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {str(e)}")
        return False

def close_db():
    """Close database connection"""
    global client
    if client:
        client.close()
        logger.info("MongoDB connection closed")
