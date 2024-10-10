import { useState, useEffect } from "react";

const useCityName = () => {
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCityName = async (lat, lng) => {
      const apiKey = "f87c2b8094f94463a42db23e01abe107";
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const city = data.results[0].components.state;
          return city;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const cityName = await getCityName(latitude, longitude);
            if (cityName) {
              setCity(cityName);
            } else {
              setError("City not found.");
            }
          },
          (error) => {
            console.error("Error getting location:", error);
            setError("Unable to retrieve location.");
          },
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  return [city, error];
};

export default useCityName;
