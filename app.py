from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
app = Flask(__name__)
CORS(app)  

@app.route('/predict', methods=['POST','GET'])
def predict():
    try:
        data = request.json  # Receive JSON data
        print("Received Data:", data)  # Debugging

        # Extract values from JSON
        temperature = float(data.get('temperature', 0))
        pH = float(data.get('pH', 0))
        turbidity = float(data.get('turbidity', 0))
        dissolved_oxygen = float(data.get('dissolvedOxygen', 0))
        salinity = float(data.get('salinity', 0))
        ammonia = float(data.get('ammonia', 0))
        nitrates = float(data.get('nitrates', 0))
        model=pickle.load(open("D:/final project/project/model.pkl","rb"))
        a=np.array([[temperature,pH,turbidity,dissolved_oxygen,salinity,ammonia,nitrates]])
        op=model.predict(a).tolist()
   
        prediction =str(op)
        
        print(op)

        return jsonify({'prediction': prediction})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
