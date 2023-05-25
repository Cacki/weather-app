class Forecast {
  constructor() {
    (this.key = "sqI7nYfJ2VGc4GTTaMKUDv23JFEU5LkY"),
      (this.locationURL =
        "https://dataservice.accuweather.com/locations/v1/cities/search"),
      (this.conditionURL =
        "https://dataservice.accuweather.com/currentconditions/v1/");
  }

  async updateCity(name) {
    const city = await this.getCity(name);
    const weather = await this.getWeather(city);

    return { city, weather };
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.locationURL + query);
    const data = await response.json();
    if (data === null || data.length < 1) {
      throw new Error("No such city");
    }
    return data[0];
  }

  async getWeather(city) {
    const query = `${city.Key}?apikey=${this.key}`;
    const response = await fetch(this.conditionURL + query);
    const data = await response.json();

    return data[0];
  }
}
