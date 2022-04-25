import axios from 'axios';
// als hij niet werkt, probeer: npm install axios
//npm run start


// Stap 1: schrijf een asynchrone functie die data ophaalt
//1. declareer de asynchrone functie met een goede naam: fetchCountriesDetails
//2. declareer het try catch blok
//3. in het try blok: haal data op middels de countries API
//4. in het try blok: plaats de data in de innerHTML, met aansluitende values.
//5. Catch blok: console loggen de error
//6. catch blok: gebruikersfeedback geven: error message als het land niet bestaat.

// Stap2: schrijf een functie die zoekt binnen de data
//1. declareer synchrone functie met goede naam (intentie!)
//2. Zorg ervoor dat de pagina niet refresht
//3. een referentie opslaan naar het inputveld (DOM!)
//4. we spreken de async functie aan en geven hier een parameter mee
//5. het invoerveld wordt geleegd
const searchform = document.getElementById('search-form')
searchform.addEventListener("submit",searchCountry);
const countryInfoBox = document.getElementById('search-result');
const countryErrorBox = document.getElementById('error-message')


function searchCountry(e){
    e.preventDefault();
    const queryfield = document.getElementById('query-field');
    getCountry(queryfield.value);
}

async function getCountry (name){
countryInfoBox.innerHTML = '';
    try {
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const country = result.data[0]
        console.log(country);

        const currency = country.currencies[0]
        console.log(currency);

        const language = country.languages[0]
        console.log(language)


        countryInfoBox.innerHTML = `
<li>
        <h3> ${country.name}</h3> <img src="${country.flag}" id="image1" alt="country flag">
        <div> ${country.name} is situated in ${country.subregion}. 
        It has a population of ${country.population} people.</div>
        <div> The capital is ${country.capital} and you can pay with ${currency.name}'s  </div>
        <div> they speak ${language.name}</div>
        
        </li>
        `
        if (country.currencies > 0) {
            countryInfoBox.innerHTML = `
            <div> The capital is ${country.capital}
            and you can pay with ${currency.name}'s and ${currency.name}'s
            </div>
             `
    }else if (country.currencies <= 0) {
            countryInfoBox.innerHTML = `
            <div> The capital is ${country.capital} and you can pay with ${currency.name}'s
            </div>
             `
        }

    }
    catch (e) {
        countryInfoBox.innerHTML = `
        <li>
        <h3>Error, country does not exist. </h3>
        <p>(check your spelling)</p>
        </li>
        `
        console.error(e)
    }
}





// async function fetchCountriesDetails(){
//    const countryInfoBox = document.getElementById('search-result');
//     try{
//         const result = await axios.get(`https://restcountries.com/v2/name/${name}`);
//         const country = result.data;
//         console.log(country);
//
//     } catch (e){
//
//     }
// }

// fetchCountriesDetails()
// stap 3: schrijf een functie die data plaatst
