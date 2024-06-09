import warnings
warnings.filterwarnings("ignore")

# print("Hello")

import numpy as np
import pandas as pd

import pickle
import os
import sys

script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, 'model.pkl')

with open(model_path, 'rb') as file:
    lr = pickle.load(file)
    # print("File opened successfully")
    
df = pd.read_csv('../datasets/final_df.csv')
X = df.drop(columns = ['price'])

feature_names = X.columns
def predict_price(location,sqft,bhk,bath):
    try:
        index_location = np.where(X.columns == location)[0][0]
        print(index_location)
    except IndexError:
        raise ValueError(f"Location '{location}' not found in the dataset")
    
    features = np.zeros(len(X.columns))
    features[0] = sqft
    features[1] = bath
    features[2] = bhk
    
    if index_location >= 1 :
        features[index_location] = 1
    
    if len(features) != len(feature_names):
        raise ValueError(f"Feature length mismatch: Expected {len(feature_names)}, got {len(features)}")
    predicted_price = lr.predict([features])[0]
    return predicted_price

if __name__ == "__main__":
    print(f"Arguments received: {sys.argv}")
    location = sys.argv[1]
    sqft = int(sys.argv[2])
    bhk = int(sys.argv[3])
    bath = int(sys.argv[4])
    result = predict_price(location,sqft,bhk,bath)
    print(result)
    sys.stdout.flush()


# print(len(X.columns))
# print(X.columns)


# print(predict_price('Electronic City',1000,4,4))
# print(predict_price('Electronic City',1000,3,3))
# print(predict_price('Electronic City',1000,2,3))
# print(predict_price('Electronic City',800,2,4))