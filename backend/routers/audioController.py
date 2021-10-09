from fastapi import APIRouter

router = APIRouter(
    prefix="/audiocontroller"
)

data = {
    1: {
        "audioLocation": "../../static/cipher.mp3",
        "imageLocation": "../../static/img1.png",
        "name": "Cipher"
    },
    2: {
        "audioLocation": "../../static/LightTheme.mp3",
        "imageLocation": "../../static/LLight.png",
        "name": "Light's Theme A"
    },
    3: {
        "audioLocation": "../../static/LTheme.mp3",
        "imageLocation": "../../static/LLight.png",
        "name": "L's Theme A"
    }
}

@router.get("/")
async def index():
    return {"message": "Hello, World"}

@router.get("/next/{song_id}")
async def all(song_id: int):
    print("Function called...")
    song_id = song_id % 3
    if song_id == 0:
        song_id = 3
    name = data[song_id]["name"]
    audioLocation = data[song_id]["audioLocation"]
    imageLocation = data[song_id]["imageLocation"]
    return {
        "name": name,
        "audioLocation": audioLocation,
        "imageLocation": imageLocation,
        "id": song_id
    }