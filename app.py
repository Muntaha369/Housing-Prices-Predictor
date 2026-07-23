from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class HouseInput(BaseModel):
    area: float
    bedrooms: int
    bathrooms: int
    stories: int
    mainroad: str
    guestroom: str
    basement: str
    hotwaterheating: str
    airconditioning: str
    parking: int
    prefarea: str
    furnishingstatus: str

model = joblib.load("Linear_model.pkl")
encoders = joblib.load("encoders.pkl")

print(encoders.items())

for col,le in encoders.items():
    print(col,le.classes_)


@app.post("/predict")
async def predict(data: HouseInput):
    row = data.dict()
    
    try:
            for col, le in encoders.items():
                if row[col] not in le.classes_:
                    raise ValueError(f"Invalid value '{row[col]}' for '{col}'. Expected one of {list(le.classes_)}")
                row[col] = le.transform([row[col]])[0]
    
            df = pd.DataFrame([row])
            df = df[model.feature_names_in_]  # reorders columns to match training order
            prediction = model.predict(df)
    except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
    
    return {"prediction": float(prediction[0])}