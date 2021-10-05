from fastapi import APIRouter

router = APIRouter(
    prefix="/audiocontroller"
)

@router.get("/")
async def index():
    return {"message": "Hello, World"}

@router.get("/next/{song_id}")
async def all(song_id: int):
    print("Function called...")
    name = "Cipher"
    if song_id == 2:
        name = "Cipher 2"
    return {
        "name": name,
        "author": "Lemino",
        "audioLocation": "../../static/cipher.mp3",
        "imageLocation": "../../static/img1.png",
        "id": song_id
    }