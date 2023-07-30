//select the whole body

const body = document.body;

//main Container

const containerDiv = document.createElement("div");
containerDiv.classList.add("container");
body.append(containerDiv);

//title

const h1 = document.createElement("H1");
h1.setAttribute("id", "title");
h1.classList.add("text-center");
h1.textContent = "Rest Countries & Weather Data ";
containerDiv.append(h1);

//main Container Row
const rowDiv = document.createElement("div");
rowDiv.classList.add("row");
containerDiv.append(rowDiv);

// url used

let url = "https://restcountries.com/v3.1/all";

let api_Key = "1552ee1e018e7a3ec9bc4672835175ca";

// function to get the rest countries data

async function getData() {
  let tests;
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    tests = data.json();
    // console.log(tests)
  } catch (error) {
    console.log(error);
  }
  return tests;
}

// function to display the data

async function displayCountriesData() {
  let test_data = await getData();
  // console.log(test_data);

  //   foreach loop to display the data using card.

  for (countries of test_data) {
    // col row

    colDiv = document.createElement("div");
    colDiv.classList.add("col", "col-sm-6", "col-md-4", "col-lg-4", "col-xl-4");
    rowDiv.append(colDiv);

    // card

    cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "h-100", "mb-3", "flip-card");
    colDiv.append(cardDiv);

    innerDiv = document.createElement("div");
    innerDiv.classList.add("flip-card-inner");
    cardDiv.append(innerDiv);
    // cardHeader

    titleDiv = document.createElement("div");
    titleDiv.classList.add("card-header", "text-center");
    cardDiv.append(titleDiv);
    const h5Elem = document.createElement("h5");

    // countryName

    // h5Elem.innerText = 'region';
    h5Elem.textContent = `${countries?.name?.common}`;
    titleDiv.append(h5Elem);

    //cardImage

    const img = document.createElement("img");
    img.classList.add("card-img-top", "flag", "mt-3");
    img.setAttribute(
      "src",
      `${countries?.flags?.png ? countries?.flags?.png : countries?.flags?.svg}`
      // the ?. is called optional chaining
    );
    cardDiv.append(img);

    //cardBody

    bodyDiv = document.createElement("div");
    bodyDiv.classList.add("card-body");
    cardDiv.append(bodyDiv);

    //capital

    capitalDiv = document.createElement("div");
    capitalDiv.classList.add("card-text", "capital");
    bodyDiv.append(capitalDiv);
    capitalDiv.innerHTML = `Capital: <span>${countries?.capital}</span>`;

    //region

    regionDiv = document.createElement("div");
    regionDiv.classList.add("card-text", "region");
    bodyDiv.append(regionDiv);
    regionDiv.innerHTML = `Region: <span>${countries?.region}</span>`;
    countryCodeDiv = document.createElement("div");

    //latitude and Longitude

    latlngDiv = document.createElement("div");
    latlngDiv.classList.add("latlng");
    bodyDiv.append(latlngDiv);
    // console.log(countries.latlng[0])
    latlngDiv.innerHTML = `LatLng : <span>${countries?.latlng[0]}, ${countries?.latlng[1]}</span>`;

    //countryCode

    countryCodeDiv.classList.add("card-text", "country-code");
    bodyDiv.append(countryCodeDiv);
    countryCodeDiv.innerHTML = `countryCode: <span>${countries?.fifa}</span>`;

    //button

    button = document.createElement("button");
    button.classList.add("btn", "btn-outline-secondary");
    bodyDiv.append(button);
    button.textContent = "Click for weather";

    // onclick weather data is fetched

    const res2 = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${countries?.latlng[0]}&lon=${countries?.latlng[1]}&appid=1552ee1e018e7a3ec9bc4672835175ca&units=metric`
    );
    const data2 = await res2.json();
    button.addEventListener("click", getWeatherData);
    function getWeatherData() {
      let a = h5Elem.textContent; // getting the title
      let b = img.getAttribute("src");
      
      //adding hidden to modify display onclick

      rowDiv.classList.add("hidden");
       
      //container

      const containerDiv2 = document.createElement("div");
      containerDiv2.classList.add("container");
      body.append(containerDiv2);
      
      //row

      const rowDiv2 = document.createElement("div");
      rowDiv2.classList.add("row", "country_row");
      containerDiv2.append(rowDiv2);
      
      //card
      
      const cardDiv2 = document.createElement("div");
      cardDiv2.classList.add(
        "card",
        "col-lg-4",
        "col-sm-12",
        "text-center",
        "weather-data"
      );
      rowDiv2.append(cardDiv2);

      //card Header

      const cardHeaderDiv2 = document.createElement("div");
      cardHeaderDiv2.classList.add("card-header", "text-center", "name");
      cardHeaderDiv2.textContent = `${a}`;
      cardDiv2.append(cardHeaderDiv2);

      //image

      const img2 = document.createElement("img");
      img2.classList.add("card-img-top", "flag", "mt-3");
      img2.setAttribute("src", `${b}`);
      cardDiv2.append(img2);

      //card-body

      bodyDiv2 = document.createElement("div");
      bodyDiv2.classList.add("card-body");
      cardDiv2.append(bodyDiv2);

      //weather 
      
      weatherDiv = document.createElement("div");
      weatherDiv.append("weather");
      weatherDiv.innerHTML = `Weather: <span>${data2?.weather[0].description}</span>`;

      //temperature

      tempDiv = document.createElement("div");
      tempDiv.classList.add("temp");
      tempDiv.innerHTML = `Temp: <span>${data2?.main.temp}c</span>`;

      // wind Speed

      windSpeedDiv = document.createElement("div");
      windSpeedDiv.classList.add("windSpeed");
      tempDiv.innerHTML = `wind Speed: <span>${data2?.wind.speed}m/sec</span>`;

      //Button

      button2 = document.createElement("button");
      button2.classList.add("btn", "btn-success");
      button2.textContent = "Click for return";
      bodyDiv2.append(weatherDiv, tempDiv, windSpeedDiv, button2);
      button2.addEventListener("click", () => {
        location.reload();
      });
    }
  }
}
displayCountriesData();
