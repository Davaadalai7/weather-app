import React, { useState, useEffect } from "react";
import getAllCities from "./utils/get-all-cities";
import { dayAndNightForecast } from "./utils/get-day-and-night-forecast";
// import './index.css'

function App() {
    const [searchValue, setSearchValue] = useState("");
    const [allCities, setAllCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("Ulaanbaatar, Mongolia");
    const [filteredData, setFilteredData] = useState([]);
    const [weatherData, setWeatherData] = useState({});
    const [loading, setLoading] = useState(false);

    const getCountries = async () => {
        try {
            const response = await fetch(
                "https://countriesnow.space/api/v0.1/countries"
            );
            const result = await response.json();
            const countries = result.data;
            const cities = getAllCities(countries);
            setAllCities(cities);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchWeather = async (city) => {
        setLoading(true);
        try {
            const apiKey = "e3652fdae24c42c18a673337251601";
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`
            );
            const data = await response.json();
            console.log("this is data", data);
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    };

    const onChange = (event) => {
        setSearchValue(event.target.value);
        const filtered = allCities
            .filter((el) =>
                el.toLowerCase().startsWith(event.target.value.toLowerCase())
            )
            .slice(0, 5);
        setFilteredData(filtered);
    };

    const onSelectCity = (city) => {
        setSelectedCity(city);
        setSearchValue(city);
        setFilteredData([]);
    };

    useEffect(() => {
        fetchWeather(selectedCity);
    }, [selectedCity]);

    useEffect(() => {
        getCountries();
    }, []);

    console.log(weatherData);

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Search for a city"
                value={searchValue}
                onChange={onChange}
            />
            {filteredData.length > 0 && (
                <div className="search-results">
                    {filteredData.map((city) => (
                        <p key={city} onClick={() => onSelectCity(city)}>
                            {city}
                        </p>
                    ))}
                </div>
            )}

<div className="weather-info">
    <h2>Weather for {selectedCity}</h2>
    {loading ? (
        <p>Loading...</p>
    ) : weatherData ? (
        <div>
            <p>Temperature: {weatherData.current?.temp_c}°C</p>
            <p>{weatherData.forecast?.forecastday[0]?.day?.condition?.text}</p>
            <p>Humidity: {weatherData.current?.humidity}%</p>
            <p>Wind: {weatherData.current?.wind_mph} mph</p> 
        </div>
    ) : (
        <p>No weather data available</p>
    )}
</div>

        </div>
    );
}

export default App;
