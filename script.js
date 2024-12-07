const API_KEY = "993f6a8c"; // Replace with your OMDb API key
const movieSearchInput = document.getElementById("movie-search");
const suggestionsBox = document.getElementById("suggestions");

movieSearchInput.addEventListener("input", () => {
  const query = movieSearchInput.value.trim();
  if (query.length > 2) {
    fetchMovieSuggestions(query);
  } else {
    suggestionsBox.innerHTML = ""; // Clear suggestions if input is too short
  }
});

suggestionsBox.addEventListener("click", (event) => {
  const selectedMovie = event.target.innerText;
  movieSearchInput.value = selectedMovie;
  suggestionsBox.innerHTML = ""; // Clear suggestions
  fetchMovie(selectedMovie); // Fetch movie details for selected title
});

function fetchMovieSuggestions(query) {
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        displaySuggestions(data.Search);
      } else {
        suggestionsBox.innerHTML = "<div>No results found</div>";
      }
    })
    .catch((error) => console.error("Error fetching suggestions:", error));
}

function displaySuggestions(movies) {
  suggestionsBox.innerHTML = movies
    .map((movie) => `<div>${movie.Title}</div>`)
    .join("");
}

document.getElementById("search-button").addEventListener("click", () => {
  const query = movieSearchInput.value.trim();

  if (query === "") {
    alert("Please enter a movie name.");
    return;
  }

  fetchMovie(query);
});

function fetchMovie(query) {
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovie(data);
      } else {
        alert("Movie not found. Please try another title.");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayMovie(movie) {
  const container = document.getElementById("movie-container");
  container.innerHTML = `
    <div class="movie">
      <h3>${movie.Title}</h3>
      <img src="${movie.Poster}" alt="${movie.Title}">
      <p>${movie.Plot}</p>
      <p><strong>Release Year:</strong> ${movie.Year}</p>
    </div>
  `;
}

function displayPreloadedMovies() {
  const container = document.getElementById("preloaded-container");
  const preloadedMovies = [
    {
      title: "Home Alone",
      poster: "https://tse3.mm.bing.net/th?id=OIP.-Yd2U3YGegApZserAsTJ7wHaLH&w=474&h=474&c=7",
    },
    {
      title: "Elf",
       poster: "https://tse4.mm.bing.net/th?id=OIP.uNLAdSGF3PBiqiP1amXPtgHaLH&w=474&h=474&c=7",
      },
    {    title: "Almost chrsitmas",
      poster: "https://tse2.mm.bing.net/th?id=OIP.T2XqW2K_v9EdZddfeeKJ4wHaLH&w=474&h=474&c=7",
      },
    {
     title: "The Grinch",
     poster: "https://tse3.mm.bing.net/th?id=OIP.gqfohCltIRcYO6oXNDUCsAHaLH&w=474&h=474&c=7",
    },    
  ];
  
  preloadedMovies.forEach((movie) => {
    container.innerHTML += `
      <div class="movie">
        <h3>${movie.title}</h3>
        <img src="${movie.poster}" alt="${movie.title}">
      </div>
    `;
  });
}

displayPreloadedMovies();
