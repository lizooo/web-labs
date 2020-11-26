const getItemMovieId = (MovieId) => `item-${MovieId}`;

export const EDIT_BUTTON_PREFIX = 'edit-button-';
export const DELETE_BUTTON_PREFIX = "delete-button-";


const movieTemplate = ({ MovieId, Name, DurationMins, IMDBReviews }) => `
<li MovieId="${getItemMovieId(MovieId)}" class="card mb-4 item-card">
  <img
  src="https://deadline.com/wp-content/uploads/2019/04/netflix-logo-print_cmyk-e1559068171400.jpg?w=731"
  class="item-container__image card-img-top" alt="card">
  <div class="card-body">
    <h4 class="card-Name">${Name}</h4>
    <p class="card-text">Duration of the movie : ${DurationMins} minutes</p>
    <p class="card-text">Amount of IMDB reviews: ${IMDBReviews}</p>
    <span>
    <button id="${EDIT_BUTTON_PREFIX}${MovieId}" type="button" class="btn btn-outline-dark mt-4">
    Edit
    </button>
  </span>
  <span>
    <button id="${DELETE_BUTTON_PREFIX}${MovieId}" type="button" class="btn btn-dark mt-4">
      Delete
    </button>
  </span>
  </div>
</li>`;

export const addMovieToPage = ({ MovieId, Name, DurationMins, IMDBReviews }, onEditMovie, onRemoveMovie ) => {
  moviesContainer.insertAdjacentHTML(
    "afterbegin",
    movieTemplate({ MovieId, Name, DurationMins, IMDBReviews })
  );

  const deleteButton = document.getElementById(`${DELETE_BUTTON_PREFIX}${MovieId}`);
  deleteButton.addEventListener("click", onRemoveMovie);

  const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${MovieId}`);
  editButton.addEventListener("click", onEditMovie);
};

export const renderMoviesList = (movies, onEditMovie, onRemoveMovie,) => {
  moviesContainer.innerHTML = "";

  for (const movie of movies) {
    addMovieToPage(movie, onEditMovie, onRemoveMovie);
  }
};

