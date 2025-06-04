# 🟦 Mercari Mini Marketplace (Full-Stack SWE Portfolio Project)

## 🚀 Project Goal
Build a **miniature Mercari marketplace** that demonstrates:
- **Machine Learning microservice**: Suggests prices for secondhand items (like Mercari’s real platform).
- **Backend API**: Handles users, items, orders, and connects to ML microservice for price prediction.
- **Android client** (or web UI): Lets users upload/list/search items and get price suggestions, using your backend and ML.
- Modular “microservice” structure—mirrors real-world engineering at Mercari and top tech companies.

---

## 👔 Application/Interview Context

**Who you are:**  
- Final-year undergrad, University of Malaya (graduating Sept 2025)  
- Incoming Master’s at University of Tokyo (MEXT, Oct 2025)  
- Applying for Mercari Software Engineer Internship in Tokyo  
- Skills: Python, Java, JavaScript, React, Node, SQL, MongoDB, Docker, AWS, ML, ROS2

**What you want to show:**  
- Teamwork, product thinking, “not just code”  
- Growth, humility, user-focus  
- You can deliver real value to users—*not* just “homework” code

---

## 🏆 Mercari’s Mission, Values, and What They Want

- **Mission:**  
  “Circulate all forms of value—goods, skills, time, digital content, knowledge—to unleash everyone’s potential.”

- **Values:**  
  - **Go Bold:** Take risks, innovate, learn from failure, share lessons.
  - **All for One:** Team over ego, respect differences, build trust, collaborate.
  - **Be a Pro:** Skill, responsibility, learning, own your outcomes, speed > perfection.
  - **Move Fast:** Avoid endless debate, act quickly, iterate, learn by doing.

- **Engineering Mindset:**  
  - Passion for product/user experience  
  - Grow together (help/share, open source, mentor/learn)  
  - Solve through mechanisms (root cause, scalable solutions)  
  - Collaborate openly (transparent, cross-team, doc everything)

- **What to show in this project:**  
  - Direct impact for users (ML helps sellers price items, backend supports the flow, Android makes it mobile and user-friendly)
  - Teamwork, documentation, communication (open source, clean README, video demo if possible)
  - Iterative mindset (“Started simple, improved after user/testing feedback”)
  - “Mini Mercari” mirrors their architecture—shows you think like a Mercari engineer

---

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
  - Use Kaggle [Mercari Price Suggestion dataset](https://www.kaggle.com/competitions/mercari-price-suggestion-challenge/data).
  - Data cleaning/EDA, combine fields into text, TF-IDF vectorization (baseline).
  - Model: RandomForestRegressor (baseline, robust), or XGBoost for improvement.
  - Save model/vectorizer (`joblib`).
  - REST API (Flask/FastAPI): `/predict` endpoint that takes JSON (name, description, category) and returns price.

- **Skills Demonstrated:**  
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

## 📝 README/Portfolio/Interview Story

- “I built a modular mini-marketplace, inspired by Mercari’s mission to unlock value and help users price secondhand goods fairly.  
I designed and deployed an ML price suggestion microservice, integrated it into a scalable backend API, and built a mobile (Android) client—mirroring Mercari’s microservices architecture and focus on user value.  
I open-sourced each part, documented my learnings, and iterated based on feedback, embodying Mercari’s ‘Go Bold,’ ‘Move Fast,’ and ‘All for One’ values.”

---

## 📄 Example Résumé Bullets

- Developed an ML-powered API that predicts prices for secondhand items, modeled after Mercari’s real user flow.
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

# Download and extract train.tsv from Kaggle Mercari Price Suggestion
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
    app.run(host='0.0.0.0', port=5001, debug=True)

# Test with:
curl -X POST http://localhost:5001/predict \
-H "Content-Type: application/json" \
-d '{"name":"Nike Air Max","item_description":"Good condition, size 9","category_name":"Men/Shoes/Sneakers"}'
```

✅ **What to do next**
Start with ML microservice: EDA, train model, deploy REST API.

Once ML works, scaffold backend_service/ and start integrating.

Last, connect Android/web app.

Document every part with a README, screenshots, (video demo if possible).

Use STAR format for stories: “Situation, Task, Action, Result.”

🏅 **Mercari Interview/README “North Star”**
“This project shows my ability to build and integrate ML, backend, and mobile services, always thinking about the user and business value.
It reflects Mercari’s values of ‘Go Bold’ (ML in production), ‘Move Fast’ (MVP-first, iterate), ‘All for One’ (documented, reusable, open source), and ‘Be a Pro’ (testing, clean code, real-world deployment).
I’m excited to bring these mindsets to Mercari and help unlock new value for millions of users.”

