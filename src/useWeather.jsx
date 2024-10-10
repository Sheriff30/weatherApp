import { useEffect, useState } from "react";

function useWeather(city) {
  const apiKey = "aeb758d85f0c4a9a839132052240910";
  const [status, setStatus] = useState("unloaded");

  const [tempMax, setTempMax] = useState("");
  const [temp, setTemp] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [humidity, setHumidity] = useState("");
  const [cloudiness, setCloudiness] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!city) {
      setStatus("unloaded");
    } else {
      getWeather();
    }

    async function getWeather() {
      setStatus("loading");
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`,
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await res.json();
        console.log(json);
        setTemp(Math.floor(json.current.temp_c));
        setTempMax(Math.floor(json.forecast.forecastday[0].day.maxtemp_c));
        setTempMin(Math.floor(json.forecast.forecastday[0].day.mintemp_c));
        setHumidity(Math.floor(json.current.humidity));
        setCloudiness(Math.floor(json.current.cloud));
        setWindSpeed(Math.floor(json.current.wind_kph));
        setDate(json.current.last_updated);

        setStatus("loaded");
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setStatus("error");
      }
    }
  }, [city]);

  return [
    tempMax,
    tempMin,
    humidity,
    cloudiness,
    windSpeed,
    temp,
    date,
    status,
  ];
}

export default useWeather;
