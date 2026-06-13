import os
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import classification_report, accuracy_score, f1_score
from url_features import extract_url_features, get_feature_names

def load_and_preprocess_url_data():
    print("Loading raw URL datasets...")
    file1 = "datasets/url_detection/malicious_urls.csv"
    file2 = "datasets/url_detection/phishing_websites.csv"
    
    df1 = pd.read_csv(file1)
    df2 = pd.read_csv(file2)
    
    df1 = df1.rename(columns={"type": "label"})
    merged_df = pd.concat([df1, df2], ignore_index=True)
    merged_df = merged_df.dropna(subset=["url", "label"])
    merged_df = merged_df.drop_duplicates(subset=["url"])
    
    label_map = {
        "benign": "Legitimate",
        "phishing": "Phishing",
        "malware": "Malware",
        "defacement": "Defacement",
        "Legitimate": "Legitimate",
        "Phishing": "Phishing",
        "Malware": "Malware",
        "Defacement": "Defacement"
    }
    
    merged_df["label"] = merged_df["label"].map(label_map)
    merged_df = merged_df.dropna(subset=["label"])
    
    print(f"Merged URL dataset shape: {merged_df.shape}")
    
    features_list = []
    for idx, row in merged_df.iterrows():
        feats = extract_url_features(row["url"])
        feats["label"] = row["label"]
        feats["url"] = row["url"]
        features_list.append(feats)
        
    processed_df = pd.DataFrame(features_list)
    processed_path = "datasets/processed/cleaned_url_dataset.csv"
    processed_df.to_csv(processed_path, index=False)
    print(f"Processed URL dataset saved to {processed_path}")
    return processed_df

def main():
    df = load_and_preprocess_url_data()
    feature_cols = get_feature_names()
    X = df[feature_cols]
    y = df["label"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    models = {
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
        "Gradient Boosting": GradientBoostingClassifier(n_estimators=100, random_state=42)
    }
    
    best_model_name = None
    best_model = None
    best_f1 = -1
    evaluation_reports = {}
    
    for name, clf in models.items():
        print(f"\nTraining {name} Classifier...")
        clf.fit(X_train, y_train)
        y_pred = clf.predict(X_test)
        
        acc = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred, average="weighted")
        print(f"{name} Results - Accuracy: {acc:.4f}, Weighted F1: {f1:.4f}")
        
        report = classification_report(y_test, y_pred)
        evaluation_reports[name] = report
        print(report)
        
        if f1 > best_f1:
            best_f1 = f1
            best_model_name = name
            best_model = clf
            
    print(f"\nSelecting best model: {best_model_name}")
    os.makedirs("ml/url_model/saved_models", exist_ok=True)
    model_path = "ml/url_model/saved_models/url_classifier.pkl"
    joblib.dump(best_model, model_path)
    print(f"Saved best model to {model_path}")
    
    with open("ml/url_model/saved_models/evaluation_report.txt", "w") as f:
        f.write(f"Best Model Selected: {best_model_name}\n")
        f.write(f"Best Weighted F1 Score: {best_f1:.4f}\n\n")
        for name, report in evaluation_reports.items():
            f.write(f"================== {name} ==================\n")
            f.write(report)
            f.write("\n")
            
    print("Training process finished.")

if __name__ == "__main__":
    main()
