let getData = async (city) => {
  try {
    let response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c828a8b16757cc4dbcbfc7b8e6c007a5&lang=vi`
    );
    console.log(response);
    setData(response);
  } catch (error) {
    console.log(error);
    setDefault();
  }
};

let setData = (response) => {
  let data = response.data;

  let temp = data.main.temp - 273.15;
  temp = temp.toFixed(1);

  let timezone = data.timezone;
  let date = new Date(new Date().getTime() + timezone * 1000)
    .toUTCString()
    .replace(/ GMT$/, "");

  let description = data.weather[0].description;

  let icon = data.weather[0].icon;

  let overview = `Feels like ${(data.main.feels_like- 273.15).toFixed(1)} celsius. Humidity ${
    data.main.humidity
  }%. Win speed ${data.wind.speed} m/s`;
  document.querySelector("#temp").textContent = temp;
  document.querySelector("#city").textContent = response.data.name;
  document.querySelector("#date").textContent = date;
  document.querySelector("#description").textContent = description;
  document.querySelector("img").src = `./icons/${icon}.png`;
  document.querySelector("#overview").textContent = overview;
};

let setDefault = () => {
  document.querySelector("#temp").textContent = "";
  document.querySelector("#city").textContent = "";
  document.querySelector("#date").textContent = "";
  document.querySelector("#description").textContent = "";
  document.querySelector("img").src = `./icons/unknown.png`;
  document.querySelector("#overview").textContent = "";
};

let form = document.querySelector("#form");
form.onsubmit = (event) => {
  event.preventDefault();
  let city = form.city.value;
  getData(city);
  form.city.value = "";
};
