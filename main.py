from fastapi import FastAPI

app=FastAPI()

@app.get("/")
def welcome():
    return "hi,welcome"

welcome()