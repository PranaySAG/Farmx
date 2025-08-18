import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaWind } from "react-icons/fa";
import { RiWaterPercentFill } from "react-icons/ri";
import weatherNews from "../assets/weather-news.png";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const searchWeather = async (cityName) => {
    if (!cityName) return;
    try {
      const api = `https://api.weatherapi.com/v1/current.json?key=${
        import.meta.env.VITE_API_KEY
      }&q=${cityName}&aqi=no`;
      const { data } = await axios.get(api);

      setWeatherData({
        name: data.location.name,
        temp: Math.floor(data.current.temp_c),
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        icon: data.current.condition.icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#799eff]">
      <div className="flex flex-col w-[350px] h-[450px] bg-white text-black rounded-2xl shadow-2xl pt-6 px-6 pb-4">
        <div className="flex items-center w-full bg-gray-200 px-3 rounded-3xl overflow-hidden mb-4">
          <input
            className="bg-transparent w-full h-10 border-none outline-none pl-2 text-black placeholder-gray-500"
            placeholder="Search weather for a city... (e.g., Mumbai)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchWeather(city)}
          />
          <FaSearch
            className="text-gray-600 cursor-pointer text-xl hover:text-black transition"
            onClick={() => searchWeather(city)}
          />
        </div>

        <div className="flex-1 flex justify-center items-center">
          <img
            src={weatherData ? `https:${weatherData.icon}` : weatherNews}
            alt="Weather Icon"
            className="w-40 h-40 object-contain"
          />
        </div>

        <div className="flex flex-col items-center mb-4">
          <p className="text-5xl font-bold text-gray-800">
            {weatherData ? `${weatherData.temp}°C` : "16°C"}
          </p>
          <p className="text-3xl text-gray-700">
            {weatherData ? weatherData.name : "Mumbai"}
          </p>
        </div>

        <div className="flex items-center justify-between text-gray-700">
          <div className="flex items-center gap-4">
            <RiWaterPercentFill size={33} className="text-blue-500" />
            <div className="flex flex-col">
              <span className="font-semibold">
                {weatherData ? `${weatherData.humidity}%` : "80%"}
              </span>
              <span className="text-sm text-gray-500">Humidity</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaWind size={33} className="text-green-500" />
            <div className="flex flex-col">
              <span className="font-semibold">
                {weatherData ? `${weatherData.wind} kph` : "5 kph"}
              </span>
              <span className="text-sm text-gray-500">Wind</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
