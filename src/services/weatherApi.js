import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
// export { getWeatherData, getWeatherForCities,};

export const getWeatherData = async (latitude, longitude) => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}&units=metric`
    );

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;
    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};

export const getWeatherForCities = async (cities) => {
  if (!cities) return [];

  const requests = [];
  cities.forEach((city) => {
    requests.push(
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.latitude}&lon=${city.coordinates.longitude}&appid=${apiKey}&units=metric`
      )
    );
  });

  const weatherData = await Promise.all(requests);

  weatherData.forEach((value, index) => {
    cities[index].weather = value.data;
  });

  return cities;
};

export const removeCity = (cityId) => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => {
    return city.id != cityId;
  });

  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
};

export const addCity = (state, city, country, latitude, longitude) => {
  let savedCities = [];
  if (localStorage.getItem("savedCities")) {
    savedCities = JSON.parse(localStorage.getItem("savedCities"));
  }

  const locationObject = {
    id: randomId(),
    state: state,
    city: city,
    country: country,
    coordinates: {
      latitude: latitude,
      longitude: longitude,
    },
  };

  savedCities.push(locationObject);
  localStorage.setItem("savedCities", JSON.stringify(savedCities));

  return [savedCities, locationObject.id];
};

const randomId = () => {
  return window.crypto.getRandomValues(new Uint32Array(1)).toString();
};
