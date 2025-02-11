let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");

let searchInputVal = "";
let countriesList = [];

function createAndAppendResult(country) {

    let columnEl = document.createElement("div");
    columnEl.classList.add("col-12", "col-md-6");
    resultCountriesEl.appendChild(columnEl);

    let countryCardEl = document.createElement("div");
    countryCardEl.classList.add("country-card", "d-flex", "flex-row");
    columnEl.appendChild(countryCardEl);

    countryFlagEl = document.createElement("img");
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add("country-flag");
    countryCardEl.appendChild(countryFlagEl);

    flexContainerEl = document.createElement("div");
    flexContainerEl.classList.add("ml-3");
    countryCardEl.appendChild(flexContainerEl);

    let countryNameEl = document.createElement("h1");
    countryNameEl.classList.add("country-name");
    countryNameEl.textContent = country.name;
    flexContainerEl.appendChild(countryNameEl);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.classList.add("country-population");
    countryPopulationEl.textContent = country.population;
    flexContainerEl.appendChild(countryPopulationEl);
}

function displayResults() {
    for (let country of countriesList) {
        let countryName = country.name;

        if (countryName.toLowerCase().includes(searchInputVal)) {
            createAndAppendResult(country);
        }

    }
}

function makeHttpRequest() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };

    resultCountriesEl.textContent = "";

    spinnerEl.classList.remove("d-none");
    resultCountriesEl.classList.add("d-none");

    fetch(url, options)

        .then(function(response) {
            return response.json()
        })
        .then(function(jsonData) {
            resultCountriesEl.classList.remove("d-none");
            spinnerEl.classList.add("d-none");
            console.log(jsonData);
            countriesList = jsonData;
            displayResults();
        });
}

function getSearchInputVal(event) {
    searchInputVal = event.target.value;
    makeHttpRequest();
}
makeHttpRequest();
searchInputEl.addEventListener("keyup", getSearchInputVal);