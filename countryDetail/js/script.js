document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const country = params.get("country");
    if (country) countryDetails(country);
    document.querySelector(".backToHome").addEventListener("click", () => {
        location.href = "../index.html";
    })

})
async function countryDetails(country) {
    let url;
    if (country.length === 3) {
        url = `https://restcountries.com/v3.1/alpha/${country}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`;
    }
    else {
        url = `https://restcountries.com/v3.1/name/${country}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`;
    }
    // Show shimmer card
    const shimmerContainer = document.querySelector(".shimmerContainer");
    shimmerContainer.classList.remove("hidden");
    shimmerContainer.classList.add("grid");

    const response = await fetch(url);
    const data = await response.json();


    shimmerContainer.classList.remove("grid");
    shimmerContainer.classList.add("hidden");
    makeDetailCard(Array.isArray(data) ? data[0] : data);

}


function makeDetailCard(country) {
    const cardsContainer = document.querySelector(".countryDetailsContainer");
    const countryCard = document.createElement("div");
    const currency = Object.values(country.currencies)[0].name;
    const nativeName = Object.values(country.name.nativeName)[0].official;
    const languages = Object.values(country.languages);

    countryCard.classList.add(
        "cardWrapper",
        "flex",
        "flex-row",
        "md:flex-row",       // side by side only on medium+ screens
        "gap-2",
        "items-start"
    );

    countryCard.innerHTML = `<img src="${country.flags.png
        }" alt="flag" class="w-full md:w-1/2 object-cover rounded-md shadow-md"/>
            
        <div class="countryInfo p-6 w-full flex flex-col gap-8 md:w-1/2">
         <h3 class="font-bold text-3xl mb-4">${country.name.common}</h3>
         <div class="details grid grid-cols-1 sm:grid-cols-2 gap-4">
<div class="col1 flex flex-col gap-2">
         <p class="mb-2"><strong>Native Name:</strong> ${nativeName}</p>
            <p class="mb-2"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p class="mb-2"><strong>Region:</strong> ${country.region}</p>
             <p class="mb-2"><strong>Sub Region:</strong> ${country.subregion}</p>
            <p class="mb-2"><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"
        }</p>           
         </div>
         <div class="col2 flex flex-col">
<p class="mb-2"><strong>Top Level Domain:</strong> ${country.tld}</p>
            <p class="mb-2"><strong>Currencies:</strong> ${currency} </p>
            <p class="mb-2"><strong>Languages:</strong> ${languages.join(", ")}</p>    
         </div>
         </div>
         
     <div class="borderCountries  flex flex-wrap gap-2"><strong>Border Countries:</strong>${country.borders
            ? country.borders.map(b => `<span class="cursor-pointer px-3 py-1 bg-gray-200 rounded-md shadow-sm hover:opacity-70 text-black" data-cc=${b}>${b}</span>`).join("")
            : "None"}
          </div>
        </div>`;
    cardsContainer?.appendChild(countryCard);
    document.querySelectorAll(".borderCountries span").forEach(span => {
        span.addEventListener("click", () => {
            //console.log(span.getAttribute("data-cc"));
            window.location.href = `?country=${span.getAttribute("data-cc")}`;
        })
    });
}

