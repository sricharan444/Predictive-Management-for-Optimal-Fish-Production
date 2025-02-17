// import React, { useState, useEffect } from "react";
// import "./WaterQualityForm.css"; // Import the CSS file

// const WaterQualityForm = () => {
//   const [formData, setFormData] = useState({
//     temperature: "",
//     pH: "",
//     turbidity: "",
//     dissolvedOxygen: "",
//     salinity: "",
//     ammonia: "",
//     nitrates: "",
//   });

//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setPrediction(null); // Clear prediction when user types new input
//     setError(null); // Clear any previous error
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setPrediction(null);
//     setError(null);

//     // Convert input values to numbers
//     const requestData = Object.fromEntries(
//       Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
//     );

//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestData),
//       });

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.statusText}`);
//       }

//       const data = await response.json();
//       if (data.error) {
//         throw new Error(data.error);
//       }

//       setPrediction(data.prediction);
//     } catch (error) {
//       console.error("Error:", error);
//       setError(error.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <div className="form-box">
//         <h2 className="title">🌊 Water Quality Prediction</h2>
//         <form onSubmit={handleSubmit} className="form">
//           {[
//             { label: "Temperature (°C)", name: "temperature" },
//             { label: "pH", name: "pH" },
//             { label: "Turbidity (NTU)", name: "turbidity" },
//             { label: "Dissolved Oxygen (mg/L)", name: "dissolvedOxygen" },
//             { label: "Salinity (ppt)", name: "salinity" },
//             { label: "Ammonia (%)", name: "ammonia" },
//             { label: "Nitrates (%)", name: "nitrates" },
//           ].map((field) => (
//             <div key={field.name} className="form-group">
//               <label className="form-label">{field.label}</label>
//               <input
//                 type="number"
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 required
//                 className="form-input"
//                 step="any" // Allows decimal values
//               />
//             </div>
//           ))}
//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? "Predicting..." : "Get Prediction"}
//           </button>
//         </form>

//         {error && <div className="error-box">⚠️ {error}</div>}

//         {prediction !== null && (
//           <div className="prediction-box">
//             <strong>Prediction:</strong> {prediction}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WaterQualityForm;





import React, { useState } from "react";
import "./WaterQualityForm.css"; // Import the CSS file

const WaterQualityForm = () => {
  const [formData, setFormData] = useState({
    temperature: "",
    pH: "",
    turbidity: "",
    dissolvedOxygen: "",
    salinity: "",
    ammonia: "",
    nitrates: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPrediction(null); // Clear prediction when user types new input
    setError(null); // Clear any previous error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError(null);

    // Convert input values to numbers
    const requestData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
    );

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="title">🌊 Water Quality Prediction</h2>
        <form onSubmit={handleSubmit} className="form">
          {[
            { label: "Temperature (°C)", name: "temperature" },
            { label: "pH", name: "pH" },
            { label: "Turbidity (NTU)", name: "turbidity" },
            { label: "Dissolved Oxygen (mg/L)", name: "dissolvedOxygen" },
            { label: "Salinity (ppt)", name: "salinity" },
            { label: "Ammonia (%)", name: "ammonia" },
            { label: "Nitrates (%)", name: "nitrates" },
            
          ].map((field) => (
            <div key={field.name} className="form-group">
              <label className="form-label">{field.label}</label>
              <input
                type="number"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="form-input"
                step="any" // Allows decimal values
              />
            </div>
          ))}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Predicting..." : "Get Prediction"}
          </button>
        </form>

        {error && <div className="error-box">⚠️ {error}</div>}

        {prediction !== null && (
          <div className="prediction-box">
            <strong>Prediction:</strong> {prediction}
          </div>
        )}
      </div>
    </div>
  );
};

export default WaterQualityForm;

