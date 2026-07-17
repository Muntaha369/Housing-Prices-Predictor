from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

model = joblib.load("Linear_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    df = pd.DataFrame([data])
    df = df[model.feature_names_in_]  # <-- reorders columns to match training order
    prediction = model.predict(df)
    return jsonify({
        "prediction": float(prediction[0])
    })

if __name__ == "__main__":
    app.run(debug=True)