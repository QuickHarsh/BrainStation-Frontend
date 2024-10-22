import { useEffect, useState } from "react";
import axios from "axios";

const PredictModules = () => {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the user ID from the authorization token (assuming you're using JWT)
    const token = localStorage.getItem("token"); // Replace with your method of getting the token

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the JWT to get user data
      const userId = decodedToken.userId; // Assuming `userId` is in the token payload

      // Make the API call
      axios
        .get(`http://localhost:3000/api/progress/predict-all-modules/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Pass the token in the Authorization header
          }
        })
        .then((response) => {
          setPredictions(response.data); // Set the predictions data
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h1>Predicted Scores for All Modules</h1>
      {predictions ? (
        <div>
          {predictions.map((module) => (
            <div key={module.moduleId}>
              <h3>Module: {module.moduleName}</h3>
              <p>Predicted Score: {module.predictedScore}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No predictions available</p>
      )}
    </div>
  );
};

export default PredictModules;
