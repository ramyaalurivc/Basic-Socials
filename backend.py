import os
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
import requests
import json

app = FastAPI()

SARVAM_API_KEY = os.environ.get("SARVAM_API_KEY", "sk_6npcon1r_ZnT6coWN5DbPluigoTUEsGfm")
SARVAM_URL = "https://api.sarvam.ai/v1/chat/completions" # Or their specific regional endpoint

@app.post("/chat/completions")
async def custom_llm_bridge(request: Request):
    vapi_payload = await request.json()
    
    # Extract messages from Vapi payload
    messages = vapi_payload.get("messages", [])
    
    # Construct payload for Sarvam AI
    # We use sarvam-2b or sarvam-105b for conversational speech tasks
    sarvam_payload = {
        "model": "sarvam-2b", 
        "messages": messages,
        "stream": True,
        "temperature": 0.7
    }
    
    headers = {
        "Authorization": f"Bearer {SARVAM_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Call Sarvam AI and stream response back to Vapi line by line
    def stream_response():
        response = requests.post(SARVAM_URL, json=sarvam_payload, headers=headers, stream=True)
        for line in response.iter_lines():
            if line:
                yield f"{line.decode('utf-8')}\n\n"
                
    return StreamingResponse(stream_response(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
