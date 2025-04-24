from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb+srv://202251126:U2YB6N3fO7F7p4eV@cluster0.yx7y7.mongodb.net/")
db = client["5g"]
users_collection = db["user_data"]
chat_collection = db["chat_history"] 
llm_collection = db["llm_data"]