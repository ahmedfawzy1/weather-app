async function getDegree(dataInfo) {
  var response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=b21c7bbd22f64a6392180654240201&q=${dataInfo}&days=3`
  );
  if (response.ok && response.status != 400) {
    let result = await response.json();
    displayCurrent(result.location, result.current);
    displayAll(result.forecast.forecastday);
  }
}
document.getElementById("search").addEventListener("keyup", (res) => {
  getDegree(res.target.value);
});

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function displayCurrent(location, current) {
  if (current != null) {
    var data = new Date(current.last_updated.replace(" ", "T"));
    let cart = `
    <div class="col-md-4 p-0">
                            <div class="card " id="card">
                            <div class="card-header d-flex justify-content-between" id="today">
                                <span class="day">${days[data.getDay()]}</span>
                                <span class="date">${
                                  monthNames[data.getMonth()]
                                }</span>
                            </div>
                            <div class="card-content" id="current">
                                <p class="location">${location.name}</p>
                                <div class="degree">
                                    <h3 class="num">${
                                      current.temp_c
                                    }<sup>o</sup>C</h3>
                                    <div class="degree-image">
                                        <img src="${
                                          current.condition.icon
                                        }" width="90" alt="image">
                                    </div>
                                </div>
                                <div class="status">${
                                  current.condition.text
                                }</div>
                                <div class="info">
                                    <span>
                                        <img src="images/icon-umberella.png" alt="umberella">
                                        20%
                                    </span>
                                    <span>
                                        <img src="images/icon-wind.png" alt="wind">
                                        18km/h
                                    </span>
                                    <span>
                                        <img src="images/icon-compass.png" alt="compass">
                                        East
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    document.querySelector(".cards .row").innerHTML = cart;
  }
}
function displayAll(castday) {
  let container = "";
  for (let i = 1; i < castday.length; i++) {
    container += `
    <div class="col-md-4 p-0">
    <div class="card text-center" id="card">
        <div class="card-header d-flex justify-content-center" id="today">
            <span class="day">${
              days[new Date(castday[i].date.replace(" ", "T")).getDate()]
            }</span>
        </div>
        <div class="card-content" id="current">
            <div class="card-image">
                <img src=${
                  castday[i].day.condition.icon
                } width="48" alt="image">
            </div>
            <h4 class="degree text-white">
            ${castday[i].day.maxtemp_c}
            </h4>
            <span>${castday[i].day.mintemp_c}</span>
            <div class="status">${castday[i].day.condition.text}</div>
        </div>
    </div>
</div>
    `;
  }
  document.querySelector(".cards .row").innerHTML += container;
}

getDegree("cairo");
