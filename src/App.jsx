import useCityName from "./useCityName";
import useWeather from "./useWeather";
import logo from "./assets/logo.svg";

function App() {
  const [city] = useCityName();
  const [
    tempMax,
    tempMin,
    humidity,
    cloudiness,
    windSpeed,
    temp,
    date,
    status,
  ] = useWeather(city);

  if (status === "unloaded") {
    return (
      <div className="unloaded">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <p>Looking for your city, please wait...</p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="loading">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <p>Loading...</p>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="error">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <p>
          We&lsquo;re sorry! Something went wrong while searching for your city.
          Please try refreshing the page
        </p>
      </div>
    );
  }

  return (
    <div className="main">
      {/* Main Card */}
      <div className="main-card">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="weather-details">
          <span className="temp">{temp}&deg;</span>
          <div>
            <span className="location">{city}</span>
            <span className="date">{date}</span>
          </div>
        </div>
      </div>
      {/* Forcast Card */}
      <div className="forcast-card">
        <p className="forcast-card-title">Weather Details...</p>
        <div className="weather-details-card">
          <div className="weather-detail">
            <span>Temp Max </span>
            <span>{tempMax}&deg;</span>
          </div>
          <div className="weather-detail">
            <span>Min Max </span>
            <span>{tempMin}&deg;</span>
          </div>
          <div className="weather-detail">
            <span>Humadity </span>
            <span>{humidity}&deg;</span>
          </div>
          <div className="weather-detail">
            <span>Cloudy </span>
            <span>{cloudiness}&deg;</span>
          </div>
          <div className="weather-detail">
            <span>Wind </span>
            <span>{windSpeed}km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
