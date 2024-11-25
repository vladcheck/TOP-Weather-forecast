const KEY = "7WXTBFTZTF9VAREWDMKZ8VDSF";

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

const locationInput = document.getElementById("locationInput");
const retreiveDataBtn = document.getElementById("retreiveDataBtn");
retreiveDataBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const dataObj = await getData(locationInput.value);
  console.log(dataObj);
});
