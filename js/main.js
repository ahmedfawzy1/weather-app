// Today Variable
let todayName = document.getElementById("today_date_name");
let todayNumber = document.getElementById("today_number");
let todayMonth = document.getElementById("today_month");
let todayCity = document.getElementById("today_date_city");
let todayTemp = document.getElementById("today_date_temp");
let todayCondationImg = document.getElementById("today_date_condation_img");
let todayCondationstatus = document.getElementById(
  "today_date_condation_status"
);
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("windDirection");

// Next Date
let nextDay = document.getElementsByClassName("next_day_name");
let nextCondationImg = document.getElementsByClassName("next_condation_img");
let nextMaxTemp = document.getElementsByClassName("next_max_temp");
let nextMinTemp = document.getElementsByClassName("next_min_temp");
let nextCondationstatus = document.getElementsByClassName(
  "next_condation_status"
);

// Search Input
let searchInput = document.getElementById("search");

let date = new Date();
console.log(date.getDate());
console.log(date.toLocaleDateString("en-us", { weekday: "long" }));
console.log(date.toLocaleDateString("en-us", { month: "long" }));

// Fetch Api Data
async function getWeatherData(cityName) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b21c7bbd22f64a6392180654240201&q=${cityName}&days=3`
  );
  let data = await response.json();
  return data;
}

// display Today Data
function displayTodyData(data) {
  let todayDate = new Date();
  todayName.innerHTML = todayDate.toLocaleDateString("en-us", {
    weekday: "long",
  });
  todayNumber.innerHTML = todayDate.getDate();
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-us", {
    month: "long",
  });

  todayCity.innerHTML = `${data.location.name}`;
  todayTemp.innerHTML = `${data.current.temp_c} <sup>o</sup>C`;
  todayCondationImg.setAttribute("src", data.current.condition.icon);
  todayCondationstatus.setAttribute("src", data.current.condition.text);

  humidity.innerHTML = `${data.current.humidity}%`;
  wind.innerHTML = `${data.current.wind_kph}km/h`;
  windDirection.innerHTML = `${data.current.wind_dir}`;
  console.log(data);
}

// diplay next days data
function displayNextData(data) {
  let forecastData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i + 1].date);
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us", {
      weekday: "long",
    });
    nextCondationImg[i].setAttribute(
      "src",
      forecastData[i + 1].day.condition.icon
    );
    nextMaxTemp[i].innerHTML = `${
      forecastData[i + 1].day.maxtemp_c
    }<sup>o</sup>C`;
    nextMinTemp[i].innerHTML = `${
      forecastData[i + 1].day.mintemp_c
    }<sup>o</sup>C`;
    nextCondationstatus[i].innerHTML = forecastData[i + 1].day.condition.text;
  }
}

// print all data
async function printData(city = "cairo") {
  let weatherData = await getWeatherData(city);
  if (!weatherData.error) {
    displayTodyData(weatherData);
    displayNextData(weatherData);
  }
}
printData();

searchInput.addEventListener("input", function () {
  console.log(searchInput.value);
  printData(searchInput.value);
});
