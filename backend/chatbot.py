from fastapi import APIRouter, Depends, HTTPException
from groq import Groq
from pydantic import BaseModel
import pandas as pd
from datetime import datetime
from database import chat_collection
from auth import verify_token  # Use the JWT authentication from auth.py
from database import llm_collection

# Load dataset
df = pd.read_csv('../dailyActivity_merged.csv')

router = APIRouter()

class QueryRequest(BaseModel):
    prompt: str

client = Groq(api_key="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")

@router.post("/chat/")
async def generate_saas_component(
    request: QueryRequest, user: dict = Depends(verify_token)
):
    """Secure Chat API - Requires authentication"""
    
    username = user["sub"]  # Get username from the verified JWT token

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a helpful AI fitness assistant. Be concise and goal-focused. Avoid unnecessary dataset analysis unless explicitly asked."},
            {"role": "user", "content": f"Dataset Information:\n{df.describe().to_string()}\n{request.prompt}"}
        ],
        max_tokens=500
    )

    generated_text = response.choices[0].message.content


    # Save chat history in MongoDB
    chat_collection.insert_one({
        "username": username,
        "prompt": request.prompt,
        "response": generated_text,
        "timestamp": datetime.utcnow()
    })

    return {"response": generated_text}


class SaveRequest(BaseModel):
    prompt: str
    response: str

@router.post("/save")
async def save_interaction(data: SaveRequest):
    llm_collection.insert_one({
        "prompt": data.prompt,
        "response": data.response
    })
    return {"message": "Saved to database"}


