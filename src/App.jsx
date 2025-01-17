import React, { useState, useEffect } from "react";
import getAllCities from "./utils/get-all-cities";
import { dayAndNightForecast } from "./utils/get-day-and-night-forecast";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";

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
            const cities = getAllCities(result.data);
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
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
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

    return (
        <div className="w-full h-screen bg-sky-400 flex relative justify-center">
            <div className="absolute flex top-[100px]">
                <div className="flex rounded-[50px]">
                    <SearchBar
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        allCities={allCities}
                        filteredData={filteredData}
                        setFilteredData={setFilteredData}
                        onSelectCity={onSelectCity}
                    />
                </div>
                <WeatherInfo
                    selectedCity={selectedCity}
                    weatherData={weatherData}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default App;
