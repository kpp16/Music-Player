from routers.audioController import index
from fastapi import FastAPI, Depends
from routers import audioController
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(audioController.router)

origins = [
    "http://192.168.29.52:3000",
    "http://localhost:3000",
    "https://music-player-6fegg6s8n-kaipar.vercel.app/",
    "https://music-player-lilac.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def root():
    return {"message": "root"}