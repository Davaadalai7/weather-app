export const dayAndNightForecast = (weatherData) => {
    const { location, forecast } = weatherData ?? {};
    const [forecastDay] = forecast?.forecastDay || [];

    const dayProps = {
        city: location?.name,
        temprature: forecastDay?.day?.maxtemp_c,
        condition: forecastDay?.day?.condition.text,
    };

    const nightProps = {
        ...dayProps,
        temprature: forecastDay?.mintemp_c,
    };

    return { dayProps, nightProps };
};
