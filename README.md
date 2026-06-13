# 🛡️ CyberSentinel AI

## AI-Powered Scam Detection & Threat Analysis Platform

CyberSentinel AI is a cybersecurity-focused web application designed to detect scam messages, phishing emails, malicious URLs, and social engineering attempts using Machine Learning techniques.

The platform provides:

- Scam Detection
- Phishing URL Detection
- Risk Analysis
- Threat Categorization
- Scan History Tracking
- Security Analytics Dashboard

Unlike traditional chatbot-based solutions, CyberSentinel AI uses trained Machine Learning models and cybersecurity feature engineering for real-time threat detection.

---

# 🚀 Features

## 📩 Text Scam Detection

Analyze and classify:

- SMS Messages
- Email Content
- WhatsApp Messages
- Social Media Messages
- Customer Support Scams

### Output

- Classification (Scam / Legitimate)
- Risk Score
- Confidence Level
- Scam Category
- Detection Reasons

---

## 🌐 URL Threat Detection

Analyze URLs for:

- Phishing Attacks
- Malware Distribution
- Defacement Websites
- Legitimate Websites

### Security Checks

- URL Length Analysis
- HTTPS Verification
- Domain Structure Analysis
- Suspicious Keyword Detection
- Subdomain Analysis
- TLD Reputation Analysis

---

## 📊 Risk Scoring Engine

Each scan generates:

- Probability Score
- Risk Score (0–100)
- Risk Level

| Score Range | Risk Level |
|------------|------------|
| 0–25 | Low |
| 26–50 | Medium |
| 51–75 | High |
| 76–100 | Critical |

---

## 🕒 Scan History

Store and track:

- Scan Type
- Input Data
- Classification Result
- Risk Score
- Timestamp

---

## 📈 Analytics Dashboard

View:

- Total Scans
- Scam Detections
- Legitimate Detections
- Phishing URLs
- Malware URLs
- Risk Distribution
- Recent Activity

---

# 🏗️ Project Architecture

```text
CyberSentinel-AI/

frontend/
├── src/
├── components/
├── pages/
├── services/
└── assets/

backend/
├── app/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── database/
│   ├── utils/
│   └── main.py

datasets/
├── text_detection/
├── url_detection/
└── processed/

ml/
├── text_model/
├── url_model/
└── notebooks/

README.md
```

---

# 💻 Technology Stack

## Frontend

- React.js
- Tailwind CSS
- React Router

## Backend

- FastAPI
- Uvicorn
- Pydantic

## Database

- MongoDB

## Machine Learning

- Scikit-learn
- Pandas
- NumPy
- Joblib

## Data Visualization

- Matplotlib
- Seaborn

---

# 🤖 Machine Learning Pipeline

## Text Classification

### Datasets

- SMS Spam Collection Dataset
- Phishing Email Dataset
- Fraudulent Email Corpus

### Algorithms

- Logistic Regression
- Random Forest
- Naive Bayes

### Feature Engineering

- TF-IDF Vectorization
- Text Cleaning
- Stopword Removal
- Tokenization

### Evaluation Metrics

- Accuracy
- Precision
- Recall
- F1 Score
- Confusion Matrix

---

## URL Classification

### Datasets

- Malicious URLs Dataset
- Phishing Websites Dataset

### Algorithms

- Random Forest
- Gradient Boosting
- XGBoost (Optional)

### Feature Extraction

- URL Length
- Domain Length
- HTTPS Presence
- Number of Dots
- Number of Digits
- Number of Hyphens
- Suspicious Keywords
- Suspicious TLDs
- Subdomain Count

### Evaluation Metrics

- Accuracy
- Precision
- Recall
- F1 Score
- Feature Importance

---

# 🔌 API Endpoints

## Analyze Text

### POST `/api/analyze/text`

Request:

```json
{
  "text": "Your bank account has been suspended. Click here to verify."
}
```

Response:

```json
{
  "classification": "Scam",
  "risk_score": 92,
  "confidence": "High",
  "category": "Banking Scam",
  "reasons": [
    "Urgent language detected",
    "Suspicious banking request"
  ]
}
```

---

## Analyze URL

### POST `/api/analyze/url`

Request:

```json
{
  "url": "https://paypa1-security-login.xyz"
}
```

Response:

```json
{
  "classification": "Phishing",
  "risk_score": 89,
  "confidence": "High",
  "reasons": [
    "Suspicious domain pattern",
    "Brand impersonation detected"
  ]
}
```

---

## Dashboard Statistics

### GET `/api/dashboard/stats`

---

## Scan History

### GET `/api/history`

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/CyberSentinel-AI.git
cd CyberSentinel-AI
```

## Create Virtual Environment

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Configure Environment Variables

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
DATABASE_NAME=cybersentinel
```

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

Swagger Docs:

```text
http://localhost:8000/docs
```

## Run Frontend

```bash
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🎯 Future Enhancements

### Threat Intelligence

- VirusTotal Integration
- AbuseIPDB Integration
- Domain Reputation Analysis

### Advanced Cybersecurity Features

- WHOIS Lookup
- DNS Analysis
- Email Header Analysis
- Browser Extension

### Authentication

- JWT Authentication
- User Accounts
- Scan Management

### Reporting

- PDF Security Reports
- Threat Intelligence Reports
- Export Scan History

---

# 🎯 Project Objectives

CyberSentinel AI aims to:

- Detect online scams and phishing attempts
- Improve cyber awareness
- Assist users in identifying malicious content
- Provide explainable threat analysis
- Demonstrate practical Machine Learning and Cybersecurity concepts



This project is licensed under the MIT License.
