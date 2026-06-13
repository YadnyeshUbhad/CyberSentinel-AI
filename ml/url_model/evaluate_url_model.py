import os
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
from url_features import get_feature_names

def main():
    model_path = "ml/url_model/saved_models/url_classifier.pkl"
    dataset_path = "datasets/processed/cleaned_url_dataset.csv"
    
    clf = joblib.load(model_path)
    df = pd.read_csv(dataset_path)
    
    feature_cols = get_feature_names()
    X = df[feature_cols]
    y = df["label"]
    
    _, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    y_pred = clf.predict(X_test)
    
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    cm = confusion_matrix(y_test, y_pred, labels=clf.classes_)
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=clf.classes_, yticklabels=clf.classes_)
    plt.title("URL Classifier Confusion Matrix")
    plt.ylabel("Actual Label")
    plt.xlabel("Predicted Label")
    plt.tight_layout()
    plt.savefig("ml/url_model/saved_models/confusion_matrix.png", dpi=150)
    plt.close()
    
    if hasattr(clf, 'feature_importances_'):
        importances = clf.feature_importances_
        indices = np.argsort(importances)
        plt.figure(figsize=(10, 6))
        plt.title("URL Classifier - Feature Importances")
        plt.barh(range(len(indices)), importances[indices], color="teal", align="center")
        plt.yticks(range(len(indices)), [feature_cols[i] for i in indices])
        plt.xlabel("Relative Importance")
        plt.tight_layout()
        plt.savefig("ml/url_model/saved_models/feature_importance.png", dpi=150)
        plt.close()
        
    print("Evaluation charts saved.")

if __name__ == "__main__":
    main()
