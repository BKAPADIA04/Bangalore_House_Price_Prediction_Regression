from flask import Flask, request, jsonify
import joblib,json

app = Flask(__name__)
# lr = joblib.load('../final/codes/hp_model.joblib')
lr = joblib.load('./hp_model.joblib')

@app.route('/',methods = ['GET'])
def index():
    return 'Hello From Flask!'


@app.route('/predict', methods=['POST'])
def predict():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
        input_data = request.json['data']
        prediction = lr.predict([input_data])[0]
        return jsonify({'prediction': prediction}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
