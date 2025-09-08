import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [city, setCity] = useState("Bekasi");
  const [data, setData] = useState([]);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <main className="p-[15px] bg-[#191B1F] w-full h-screen text-white font-[Plus Jakarta Sans] flex items-center justify-center">
      <div className="max-w-[452px] flex flex-col px-[47px] py-10 gap-[49px] bg-[#99999910] border-1 border-white/10 rounded-[28px]">
        <div className="flex gap-2.5 px-5 py-2.5 w-full bg-[#C2D4D3] rounded-[25px]">
          <img src="/search-ic.svg" alt="" />
          <input
            type="text"
            placeholder="Masukkan Kota"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="text-[#7E7C7C] outline-0"
          />
        </div>

        <div className="flex flex-col gap-[49px] justify-center items-center">
          {data.weather && (
            <img
              src={`https://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`}
              alt={data.weather?.[0].description}
              className="w-[316px] h-[316px]"
            />
          )}

          <p className="text-[88px] font-bold leading-[36px]">
            {data.main?.temp}°C
          </p>
          <div className="flex justify-between w-full text-[25px] border-b-[1px] border-[#C2D4D3] ">
            <h2>{data.name}</h2>
            <h2>{data?.sys?.country}</h2>
          </div>
        </div>

        <div className="w-full">
          <p>{data.weather?.[0].main}</p>
          <p>Feels like - {data.main?.feels_like}°C</p>
        </div>
        <div className="w-[341px] flex justify-between border-[1px] border-[#00000010] shadow p-[15px] bg-[#25222265] rounded-[12px]">
          <div className="flex gap-[8px]">
            <img src="/humidity-ic.svg" alt="Icon" className="w-[47px]" />
            <div>
              <p className="text-[24px] font-semibold w-full">
                {data.main?.humidity}%
              </p>
              <p className="leading-5">Humidity</p>
            </div>
          </div>
          <div className="flex gap-[8px]">
            <img src="/wind.svg" alt="Icon" className="w-[47px]" />
            <div>
              <p className="text-[24px] font-semibold w-full]">
                {data.main?.humidity}km/h
              </p>
              <p className="leading-5">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
