from motor.motor_asyncio import AsyncIOMotorClient

# client = AsyncIOMotorClient("mongodb+srv://SarveshChaurasia:sar007%40123%24@cluster0.7jitf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

client = AsyncIOMotorClient("mongodb://localhost:27017")

db = client["5g"]
users_collection = db["user_data"]
chat_collection = db["chat_history"] 
llm_collection = db["llm_data"]
