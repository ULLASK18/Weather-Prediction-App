import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, Snackbar } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fade } from "react-awesome-reveal"; 

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); 

  const fetchWeather = async () => {
    if (!location.trim()) { 
      setErrorMessage("Please enter a location");
      setOpenSnackbar(true); 
      return; 
    }

    setErrorMessage(""); 

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        location,
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const clearFields = () => {
    setLocation(""); 
    setWeatherData(null); 
    setErrorMessage(""); 
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container className="mt-5">
      <Fade top duration={1000}> {/* Add animation to title */}
        <Typography variant="h4" className="mb-4 text-center text-primary">
          Weather Prediction App 🌤️
        </Typography>
      </Fade>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <TextField
          label="Enter Location"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mb-3 mb-sm-0"
        />
        <Button
          variant="contained"
          onClick={fetchWeather}
          className="m-3 btn btn-primary"
        >
          Get Weather Prediction
        </Button>
        <Button
        variant="contained"
          onClick={clearFields}
          className="ml-sm-3 btn btn-primary"
        >
          Clear
        </Button>
      </div>

      {/* Display error message if the location is empty */}
      {errorMessage && (
        <Fade bottom duration={500}>
          <Typography color="error" className="mt-2 text-center">
            {errorMessage}
          </Typography>
        </Fade>
      )}

      {/* Display weather data */}
      {weatherData && (
        <div className="mt-4">
          <Typography variant="h6" className="text-center mb-4">
            Weather Predictions for {location}:
          </Typography>
          <List>
            {weatherData.dates.map((date, index) => (
              <ListItem key={index} className="d-flex justify-content-between">
                <ListItemText primary={`Date: ${date}`} />
                <Typography variant="body1">
                  {weatherData.temperatures[index].toFixed(1)}°C
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      )}

      {/* Snackbar to display error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </Container>
  );
}

export default App;
