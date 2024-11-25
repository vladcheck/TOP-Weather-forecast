const KEY = "7WXTBFTZTF9VAREWDMKZ8VDSF";

async function getData(location = "Vatican") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${KEY}&contentType=json`,
      {
        mode: "cors",
      }
    );
    const json = await response.json();
    console.log(json);
  } catch (msg) {
    throw Error(msg);
  }
}

const retreiveDataBtn = document.getElementById("retreiveDataBtn");
retreiveDataBtn.addEventListener("click", () => {
  getData();
});
