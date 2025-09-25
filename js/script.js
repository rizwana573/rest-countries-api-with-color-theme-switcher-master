document.addEventListener("DOMContentLoaded", function () {
    showAllCountries();
    document.getElementById("regionSelect")?.addEventListener("change", filterCountries);
     document.getElementById("searchBox")?.addEventListener("keydown", debounce(searchCountry, 500));

});

async function showAllCountries() {
    const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
    );
    const countryData = await response.json();

    makeCards(countryData);
}

function makeCards(data) {
    const cardsContainer = document.querySelector(".cardsContainer");
     
    data.forEach((country) => {
        const countryCard = document.createElement("div");
        countryCard.setAttribute("data-country", country.name.common.toLowerCase());
        countryCard.classList.add(
            "cardWrapper",
            "bg-white",
            "rounded-md",
            "shadow-md",
            "cursor-pointer"
        );
        countryCard.innerHTML = `<img src="${country.flags.png
            }" alt="flag" class="w-full h-40 object-cover rounded-t-md"/>
        <div class="countryInfo p-6">
            <h3 class="font-bold text-lg mb-4">${country.name.common}</h3>
            <p class="mb-2"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p class="mb-2"><strong>Region:</strong> ${country.region}</p>
            <p class="mb-2"><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"
            }</p>           
        </div>`;
        cardsContainer?.appendChild(countryCard);
        countryCard.addEventListener("click", ()=> {
            console.log(`country name: ${countryCard.getAttribute("data-country")}`);
            location.href =encodeURI(`/countryDetail/index.html?country=${countryCard.getAttribute("data-country")}`);
        })
    });
}
async function filterCountries() {
    const regionSelect = document.getElementById("regionSelect").value;
    if (regionSelect === "") {
       // console.log("all");
        showAllCountries();
        return;
    }
    const cardsContainer = document.querySelector(".cardsContainer");
    cardsContainer.innerHTML = "";
    const shimmerContainer = document.querySelector(".shimmerContainer");

    // Show shimmer card
    shimmerContainer.classList.remove("hidden");
    shimmerContainer.classList.add("grid");

    const response = await fetch(
        `https://restcountries.com/v3.1/region/${regionSelect}?fields=name,flags,population,region,capital`
    );
    const data = await response.json();
        shimmerContainer.classList.add("hidden");
        shimmerContainer.classList.remove("grid");
        makeCards(data);
}
async function searchCountry() {
  const searchQuery = document.getElementById("searchBox").value;
  if (searchQuery.trim() === "") {
    showAllCountries();
    return;
  }
//  console.log(searchQuery);
    const cardsContainer = document.querySelector(".cardsContainer");
    cardsContainer.innerHTML = "";
    const shimmerContainer = document.querySelector(".shimmerContainer");

     // Show shimmer card
    shimmerContainer.classList.remove("hidden");
    shimmerContainer.classList.add("grid");

    const response = await fetch(`https://restcountries.com/v3.1/name/${searchQuery}`);
    if(response.status===404) {
        cardsContainer.innerHTML= (`No countries found with searched query: ${searchQuery}` );
        shimmerContainer.classList.add("hidden");
    shimmerContainer.classList.remove("grid");
         return;
        }
    const data = await response.json();

    shimmerContainer.classList.add("hidden");
    shimmerContainer.classList.remove("grid");
    makeCards(data);
}
function debounce(cb, delay){
    let timeOut;
    return function(...args){
        clearTimeout(timeOut);
        timeOut = setTimeout(()=> {
           cb.apply(this, args);
        }, delay)
    }
}


