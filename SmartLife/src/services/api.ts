import axios from 'axios';
import { storage } from './storage';

const WEATHER_KEY = 'weather:last';

export type WeatherData = {
  city: string;
  temp: number;
  desc: string;
  icon: string;
};

export type NewsItem = { id: number; title: string; body: string };


const OPEN_WEATHER_KEY = '8f6796dd2eccfcb57a2f201ec7768a6b';

export const api = {
  async weatherByCity(city: string): Promise<WeatherData> {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: { q: city, units: 'metric', appid: OPEN_WEATHER_KEY, lang: 'az' },
        }
      );
      const result: WeatherData = {
        city: data.name,
        temp: data.main.temp,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
      };
      await storage.set(WEATHER_KEY, result);
      return result;
    } catch (err) {
      const cached = await storage.get<WeatherData>(WEATHER_KEY);
      if (cached) return cached;
      throw err;
    }
  },
  newsList: async (page = 1, limit = 10): Promise<NewsItem[]> => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: { _page: page, _limit: limit },
    });
    return data;
  },
};