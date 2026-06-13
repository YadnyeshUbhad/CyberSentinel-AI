import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

def main():
    model_path = "ml/text_model/saved_models/text_classifier.pkl"
    vec_path = "ml/text_model/saved_models/tfidf_vectorizer.pkl"
    dataset_path = "datasets/processed/cleaned_text_dataset.csv"
    
    clf = joblib.load(model_path)
    vectorizer = joblib.load(vec_path)
    df = pd.read_csv(dataset_path)
    
    X = df["text"]
    y = df["label"]
    
    _, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    X_test_vec = vectorizer.transform(X_test)
    y_pred = clf.predict(X_test_vec)
    
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    cm = confusion_matrix(y_test, y_pred, labels=clf.classes_)
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Greens", xticklabels=clf.classes_, yticklabels=clf.classes_)
    plt.title("Text Classifier Confusion Matrix")
    plt.ylabel("Actual Label")
    plt.xlabel("Predicted Label")
    plt.tight_layout()
    plt.savefig("ml/text_model/saved_models/confusion_matrix.png", dpi=150)
    plt.close()
    print("Evaluation charts saved.")

if __name__ == "__main__":
    main()
