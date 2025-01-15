import React, { useState, useEffect } from "react";
import { getAllCities } from "./utils/get-all-cities";

function App() {
    const [searchValue, setSearchValue] = useState("");
    const [allCities, setAllCities] = useState([]);
    const [seletedCity, setSelectedCity] = useState("Ulaanbaatar, Mongolia");
    const [filteredData, setFilteredData] = useState([]);
    const [weatherData, setWeatherData] = useState({});

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
}
