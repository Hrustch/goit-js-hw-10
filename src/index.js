import Notiflix from "notiflix";
import debounce from "lodash.debounce";
import "./css/styles.css"
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const countriesList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
let countryName;
input.addEventListener("input", debounce(onInputChange, DEBOUNCE_DELAY));


function onInputChange(){
    countryName = input.value.trim();
    if(countryName===""){
        clearContent();
        return;
    }
    fetchCountries(countryName)
    .then(countriesArr => {
        console.log("Зпрацював Then")
        if (countriesArr.length === 1){
            createCountryCard(countriesArr)
            Notiflix.Notify.success("Here you are.")
            return;
        }
        if (countriesArr.length < 10 && countriesArr.length > 1){
            createCountriesList(countriesArr)
            Notiflix.Notify.success("Here you are.")
            return;
        }
        clearContent()
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    })
    .catch(err => {
        console.log("Зпрацював Catch")
        clearContent();
        Notiflix.Notify.failure("Oops, there is no country with that name");
    })    
}


function createCountriesList(country){
    clearContent();
    const list = country.map(c => 
        `<li class="country-list-item">
            <img src="${c.flags.svg}" alt="Country flag" width="40" height="30">
            <span class="country-name">${c.name.official}</span>
        </li>`
    ).join("");
    countriesList.insertAdjacentHTML("beforeend", list);
}


function createCountryCard(country){
    clearContent();
    const c = country[0];
    const card = `<div class="country-card">
    <div class="country-card-header">
        <img src="${c.flags.svg}" alt="Country flag" width="55", height="35">
        <h2 class="country-card-name"> ${c.name.official}</h2>
    </div>
        <p class="country-card-field">Capital: <span class="country-value">${c.capital}</span></p>
        <p class="country-card-field">Population: <span class="country-value">${c.population}</span></p>
        <p class="country-card-field">Languages: <span class="country-value">${Object.values(c.languages).join(',')}</span></p>
</div>`
countryInfo.innerHTML = card;
}


function clearContent(){
    countriesList.innerHTML = "";
    countryInfo.innerHTML = "";
}
