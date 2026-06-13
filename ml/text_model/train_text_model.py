import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score, f1_score

def load_and_preprocess_text_data():
    print("Loading raw text datasets...")
    file1 = "datasets/text_detection/sms_spam_collection.csv"
    file2 = "datasets/text_detection/phishing_emails.csv"
    file3 = "datasets/text_detection/fraudulent_email_corpus.csv"
    
    df1 = pd.read_csv(file1)
    df2 = pd.read_csv(file2)
    df3 = pd.read_csv(file3)
    
    merged_df = pd.concat([df1, df2, df3], ignore_index=True)
    merged_df = merged_df.dropna(subset=["text", "label"])
    merged_df = merged_df.drop_duplicates(subset=["text"])
    
    label_map = {
        "spam": "Scam",
        "phishing": "Scam",
        "fraud": "Scam",
        "ham": "Legitimate",
        "legitimate": "Legitimate",
        "safe": "Legitimate",
        "Scam": "Scam",
        "Legitimate": "Legitimate"
    }
    
    merged_df["label"] = merged_df["label"].map(label_map)
    merged_df = merged_df.dropna(subset=["label"])
    
    print(f"Merged Text dataset shape: {merged_df.shape}")
    cleaned_path = "datasets/processed/cleaned_text_dataset.csv"
    merged_df.to_csv(cleaned_path, index=False)
    print(f"Cleaned Text dataset saved to {cleaned_path}")
    return merged_df

def main():
    df = load_and_preprocess_text_data()
    X = df["text"]
    y = df["label"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    print("Vectorizing text data using TF-IDF...")
    vectorizer = TfidfVectorizer(stop_words='english', max_features=5000, ngram_range=(1, 2))
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)
    
    models = {
        "Multinomial Naive Bayes": MultinomialNB(),
        "Logistic Regression": LogisticRegression(random_state=42),
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42)
    }
    
    best_model_name = None
    best_model = None
    best_f1 = -1
    evaluation_reports = {}
    
    for name, clf in models.items():
        print(f"\nTraining {name}...")
        clf.fit(X_train_vec, y_train)
        y_pred = clf.predict(X_test_vec)
        
        acc = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred, pos_label="Scam")
        print(f"{name} Results - Accuracy: {acc:.4f}, Scam F1-Score: {f1:.4f}")
        
        report = classification_report(y_test, y_pred)
        evaluation_reports[name] = report
        print(report)
        
        if f1 > best_f1:
            best_f1 = f1
            best_model_name = name
            best_model = clf
            
    print(f"\nSelecting best model: {best_model_name}")
    os.makedirs("ml/text_model/saved_models", exist_ok=True)
    model_path = "ml/text_model/saved_models/text_classifier.pkl"
    vec_path = "ml/text_model/saved_models/tfidf_vectorizer.pkl"
    
    joblib.dump(best_model, model_path)
    joblib.dump(vectorizer, vec_path)
    print(f"Saved best model to {model_path}")
    print(f"Saved vectorizer to {vec_path}")
    
    with open("ml/text_model/saved_models/evaluation_report.txt", "w") as f:
        f.write(f"Best Model Selected: {best_model_name}\n")
        f.write(f"Best Scam F1 Score: {best_f1:.4f}\n\n")
        for name, report in evaluation_reports.items():
            f.write(f"================== {name} ==================\n")
            f.write(report)
            f.write("\n")
            
    print("Training process finished.")

if __name__ == "__main__":
    main()
