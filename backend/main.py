from fastapi import FastAPI


app = FastAPI(title="DocChat Backend")


@app.get("/")
def root():
    return {"message": "DocChat backend is running"}


if __name__ == "__main__":
    main()
