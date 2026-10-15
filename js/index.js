const API_KEY = "899b432e";
const BASE_URL = "https://www.omdbapi.com/";
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const loadingState = document.querySelector("#loading-state");
const emptyState = document.querySelector("#empty-state");
const errorState = document.querySelector("#error-state");
const resultsGrid = document.querySelector("#results");


/*--------------------------------------------------------------*/ 

async function getDetails(imdbID) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: imdbID
  });

  const res = await fetch(`${BASE_URL}?${params}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}
/*---------------------------------------------------------------*/ 






async function searchMovies (query) {
try { 
  resultsGrid.innerHTML = "";
  emptyState.style.display = "none";
  errorState.style.display = "none";
  loadingState.style.display = "block";

   const params = new URLSearchParams({
   apikey: API_KEY,
   s: query
   });

const url = `${BASE_URL}?${params}`;

const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  console.log(data);

    if (data.Response === "False") {
      if (data.Error === "Movie not found!") {
        emptyState.style.display = "block";
      }
      else {
        throw new Error(data.Error);
      }
        return;
    }

    /*------------------------------------------------------ */
    const details = await Promise.all(
      data.Search.map(function (movie) {
    return getDetails(movie.imdbID);
      })
    );

    render(details);
    /*------------------------------------------------------ */

    }
     catch (err) {
    console.log(err);
    errorState.style.display = "block";
  }

   finally {
     loadingState.style.display = "none";
  }

  
}


searchBtn.addEventListener ("click" , function() {
searchMovies(searchInput.value);

})

/*----------------------------------------------- */
function render(movies) {
  movies.forEach(function (movie) {
    const poster = movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

    const rating = movie.imdbRating !== "N/A" ? movie.imdbRating : "-";

    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${poster}" alt="${movie.Title}" class="movie-poster">
      <p class="movie-title">${movie.Title}</p>
      <div class="movie-meta">
        <span class="movie-rating">⭐ ${rating}</span>
        <span class="movie-year">${movie.Year}</span>
      </div>
    `;

    resultsGrid.appendChild(card);
  });
}
/*----------------------------------------------- */
