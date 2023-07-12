import uvicorn
from main import app

# npm run build
# Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process
# serve -s build
# http://192.168.45.245:80

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=80, reload=True, workers=1)
    # uvicorn.run("main:app", reload=True, workers=1)