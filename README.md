A music player built using NextJS and Python FastAPI.

To run, you must first install the required python libraries in a virtual environment:
```
pip install "fastapi[all]"
```
After installing FastAPI, you can run the server by:
```
uvicorn main:app --reload
```

To get the frontend running, you need to install all node packages in the package.json file.
Simply execute the command:
```
npm install
```
To install all the required node packages.

To run the frontend app after installing all the dependencies,
```
npm run dev
```

Visit ```http://localhost:3000``` to visit the music player.

![ScreenshotMobile](https://github.com/kpp16/Music-Player/blob/main/Screenshot%202022-03-24%20at%2000-55-21%20Screenshot.png)
![ScreenshotPC](https://github.com/kpp16/Music-Player/blob/main/Screenshot%202022-03-24%20at%2000-59-30%20Screenshot.png)
