# 🟦 Mini Marketplace (Full-Stack SWE Portfolio Project)

## 🚀 Project Goal
The objective is to build a **miniature marketplace** that demonstrates:
- **Machine Learning microservice**: Suggests prices for secondhand items.
- **Backend API**: Handles users, items, orders, and connects to ML microservice for price prediction.
- **Android client** (or web UI): Lets users upload/list/search items and get price suggestions, using your backend and ML.
- Modular microservice structure—mirrors real-world engineering at top tech companies.

This project is my initiative to practice full-stack development across machine learning, backend services, and mobile UI.
For educational purposes.

## 🏗️ Project Structure & Plan

```
mini-mercari/
├── ml_service/ # ML microservice: price prediction (REST API)
├── backend_service/ # Marketplace backend: users, items, orders, connects to ML
├── android_app/ # Android client (optional: web_demo/ for Streamlit or React)
├── README.md # This file!
```

---

## 💻 Step-by-Step Technical Roadmap

### 1. ML Price Suggestion Microservice

- **Goal:**  
  Deploy an ML model as a REST API that predicts the price of an item, given title, description, category.

- **How:**  
  - Use the Kaggle [Price Suggestion dataset](https://www.kaggle.com/competitions/mercari-price-suggestion-challenge/data).
  - Data cleaning/EDA, combine fields into text, TF-IDF vectorization (baseline).
  - Model: RandomForestRegressor (baseline, robust), or XGBoost for improvement.
  - Save model/vectorizer (`joblib`).
  - REST API (Flask/FastAPI): `/predict` endpoint that takes JSON (name, description, category) and returns price.

- **Skills Used:**  
  - Data science workflow, model deployment, API design.

---

### 2. Backend Marketplace API (to add after ML)

- **Goal:**  
  Simple REST API for registering users, creating/listing items, creating orders, calling ML service for price suggestions.

- **How:**  
  - Node.js (Express) or Python (FastAPI)
  - Database: MongoDB or PostgreSQL (MVP: start with in-memory if needed)
  - Microservice: On item creation, calls ML `/predict` to suggest price.
  - Clean API docs (OpenAPI/Swagger or markdown)

- **Skills Demonstrated:**  
  - Backend system design, microservice orchestration, teamwork/collaboration.

---

### 3. Android (or Web) Client (to add last)

- **Goal:**  
  Android app to list items (photo, title, desc, category), fetch price suggestion, view/search marketplace.

- **How:**  
  - Kotlin (preferred) + Firebase/Auth, or connect directly to backend.
  - UI: Simple, user-focused, clean Material Design.
  - Calls backend/ML for price suggestion.

- **Skills Demonstrated:**  
  - Mobile dev, API integration, UX thinking.

---

## 📝 README/Portfolio Story

- I built a modular mini-marketplace to help users price secondhand goods fairly.
I designed and deployed an ML price suggestion microservice, integrated it into a scalable backend API, and built a mobile (Android) client with a focus on user value.
I open-sourced each part, documented my learnings, and iterated based on feedback, emphasizing bold experimentation, fast iteration, teamwork, and professionalism.

---

## 📄 Example Résumé Bullets

- Developed an ML-powered API that predicts prices for secondhand items.
- Designed a microservices backend for a marketplace, with clean REST APIs and CI/CD integration.
- Created an Android app for listing and discovering items, focusing on user experience and seamless price prediction.

---

## 🛠️ Command/Code Scaffold (ML Service)

```bash
# Folder setup
mkdir -p mini-mercari/ml_service
cd mini-mercari/ml_service
python3 -m venv venv
source venv/bin/activate
pip install pandas scikit-learn flask joblib

# Download and extract train.tsv from the Kaggle Price Suggestion dataset
# Place train.tsv in ml_service/

# Sample EDA/Training (in eda_and_training.ipynb):
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib

df = pd.read_csv('train.tsv', sep='\t').dropna(subset=['name', 'item_description', 'category_name', 'price'])
df['all_text'] = df['name'] + ' ' + df['item_description'] + ' ' + df['category_name']

X = df['all_text']
y = df['price']

tfidf = TfidfVectorizer(max_features=10000)
X_tfidf = tfidf.fit_transform(X)

X_train, X_val, y_train, y_val = train_test_split(X_tfidf, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=50, n_jobs=-1)
model.fit(X_train, y_train)
joblib.dump(model, 'price_model.pkl')
joblib.dump(tfidf, 'tfidf.pkl')

# Sample Flask API (app.py):
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load('price_model.pkl')
tfidf = joblib.load('tfidf.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = f"{data['name']} {data['item_description']} {data['category_name']}"
    X = tfidf.transform([text])
    pred = model.predict(X)[0]
    return jsonify({'predicted_price': round(float(pred), 2)})

if __name__ == '__main__':
    # The ML API listens on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)

# Test with:
curl -X POST http://localhost:5000/predict \
-H "Content-Type: application/json" \
-d '{"name":"Nike Air Max","item_description":"Good condition, size 9","category_name":"Men/Shoes/Sneakers"}'
```

✅ **What to do next**
Start with ML microservice: EDA, train model, deploy REST API.

Once ML works, scaffold backend_service/ and start integrating.

Last, connect Android/web app.

Document every part with a README, screenshots, (video demo if possible).

Use STAR format for stories: “Situation, Task, Action, Result.”

🏅 **Portfolio README “North Star”**
This project shows my ability to build and integrate ML, backend, and mobile services, always thinking about the user and business value.
It reflects principles of bold experimentation, fast iteration, teamwork, and professional software practices.
I’m excited to bring these mindsets to future opportunities and help unlock value for users.

