from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("Your_Database_URL")
db = client["5g"]
users_collection = db["user_data"]
chat_collection = db["chat_history"] 
llm_collection = db["llm_data"]
