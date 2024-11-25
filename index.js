const KEY = "7WXTBFTZTF9VAREWDMKZ8VDSF";

// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

Object.defineProperty(String.prototype, "separateWords", {
  value: function () {
    const words = [];

    for (let char of this) {
      if (char === char.toUpperCase()) {
        words.push(char);
      } else {
        words[words.length - 1] += char;
      }
    }

    let result = "";
    for (let word of words) {
      result += (word === words[0] ? word : word.toLowerCase()) + " ";
    }

    return result;
  },
  enumerable: false,
});

async function getData(location, unitGroup = "metric") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&include=current&key=${KEY}&contentType=json`,
      {
        mode: "cors",
      }
    );
    const json = await response.json();
    const dataObj = {};

    dataObj.address = json.address;
    dataObj.conditions = json.currentConditions.conditions;
    dataObj.feelsLike = json.currentConditions.feelslike;
    dataObj.temp = json.currentConditions.temp;
    dataObj.visibility = json.currentConditions.visibility;
    dataObj.windSpeed = json.currentConditions.windspeed;
    dataObj.pressure = json.currentConditions.pressure;

    return dataObj;
  } catch (msg) {
    alert(msg);
    throw Error(msg);
  }
}

const forecastSection = document.getElementById("forecast");
const locationInput = document.getElementById("locationInput");
const retreiveDataBtn = document.getElementById("retreiveDataBtn");
retreiveDataBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  forecastSection.textContent = "";

  const dataObj = await getData(locationInput.value);

  for (let [key, value] of Object.entries(dataObj)) {
    const p = document.createElement("p");
    p.textContent = `${key.capitalize().separateWords()}: ${value}`;
    forecastSection.append(p);
  }

  console.log(dataObj);
});
