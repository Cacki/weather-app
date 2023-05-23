const key = "sqI7nYfJ2VGc4GTTaMKUDv23JFEU5LkY";

const getCity = async (city) => {
  const locationURL =
    "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;
  const response = await fetch(locationURL + query);
  const data = await response.json();
  if (data === null || data.length < 1) {
    throw new Error("No such city");
  }
  
  return data[0];
};

const getWeather = async (city) => {
  const conditionURL =
    "https://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${city.Key}?apikey=${key}`;
  const response = await fetch(conditionURL + query);
  const data = await response.json();

  return data[0];
};
