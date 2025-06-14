# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from chatbot import router as chatbot_router
import database
import os
from dotenv import load_dotenv
from contextlib import asynccontextmanager

# Load environment variables
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for FastAPI application"""
    # Startup: Initialize database connection
    if not database.init_db():
        raise Exception("Failed to connect to database")
    yield
    # Shutdown: Close database connection
    database.close_db()

app = FastAPI(lifespan=lifespan)

url = os.getenv("HOST_URL")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[url],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "Authorization", "Content-Type"],
    expose_headers=["*", "Authorization"],
)

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(chatbot_router, prefix="/bot", tags=["Chatbot"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app, 
        host=os.getenv("HOST", "0.0.0.0"), 
        port=int(os.getenv("PORT", "8000"))
    )
