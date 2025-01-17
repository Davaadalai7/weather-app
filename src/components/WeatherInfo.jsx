import React from "react";

const WeatherInfo = ({ selectedCity, weatherData, loading }) => {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-semibold">Weather for {selectedCity}</h2>
            {loading ? (
                <p className="mt-4 text-xl">Loading...</p>
            ) : weatherData?.current ? (
                <div className="mt-4 space-y-2">
                    <p className="text-lg">Temperature: {weatherData.current.temp_c}°C</p>
                    <p className="text-lg">
                        Condition: {weatherData.forecast?.forecastday[0]?.day?.condition?.text}
                    </p>
                    <p className="text-lg">Humidity: {weatherData.current.humidity}%</p>
                    <p className="text-lg">Wind: {weatherData.current.wind_mph} mph</p>
                </div>
            ) : (
                <p className="mt-4 text-xl">No weather data available</p>
            )}
        </div>
    );
};

export default WeatherInfo;
