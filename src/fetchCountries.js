import Notiflix from "notiflix";
import {countriesList, countryInfo, clearContent} from "./index.js"
let status
export function fetchCountries(name){
    const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
    return fetch(URL)
    .then(response =>{
        if(response.ok){
            return response.json()
        } else{
            reject();
        }   
    })
    .catch(err => {
        throw err
    })
}