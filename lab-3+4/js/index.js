import {
  addMovieToPage,
  renderMoviesList, 
  DELETE_BUTTON_PREFIX,
    EDIT_BUTTON_PREFIX
} from "./templates.js";

import {
  getData, 
  sendData, 
  editData, 
  deleteData
} from "./api.js"

import {
  submitinModal,
  editedModal, 
  deletedModal
} from "./modal.js"


const nameInput = document.getElementById("name_input");
const durationInput = document.getElementById("duration_input");
const rewievsInput = document.getElementById("rewievs_input");
const submitInputs = document.getElementById("submit_button");
var inputs = document.querySelectorAll('input');
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const sortButton = document.getElementById("sort_button");
const countButton = document.getElementById("count_button");
const error_message = document.getElementById("message");

export let allMovies = [];


function someFunn() {
  var a = 10;

  return () => {
    var b = 20;
    return a + b;
  }


}


export const getBody = () => {
  var myForm = document.getElementById('add_form');
  var body = new FormData(myForm);
  return body
}

export const onRemoveMovie =  (event) => {
  const MovieId = event.target.id.replace(DELETE_BUTTON_PREFIX, "")
  deleteData(MovieId);
  deletedModal();
}

export const onEditMovie =  (event) => {
  const MovieId = event.target.id.replace(EDIT_BUTTON_PREFIX, "");
  if (validate()) { editData(MovieId), editedModal() };
  refetchAllMovies();
}

export const refetchAllMovies = () => {
  const movies =  getData();
  renderMoviesList(movies, onEditMovie, onRemoveMovie);
};

const countMins = (movies) =>{
  if (movies[0].length > 0) {
    return allMovies[0].reduce((sth, movie) => (sth + movie.DurationMins), 0)
  }
};
const sortMovies = (movies) => {
  const sortedMovies = movies[0].sort((a,b) => a.IMDBReviews - b.IMDBReviews); 
  return sortedMovies;
};

const findMovies = (movies) => {
  const foundMovies = movies[0].filter((movie) => movie.Name.search(findInput.value) !== -1);
  return foundMovies;
};

export const clearInputs = () => {
  inputs.forEach(input =>  input.value = ''); 
};

cancelFindButton.addEventListener("click", () => {
  refetchAllMovies(allMovies);
  clearInputs();
})

submitInputs.addEventListener('click', (event) => {
  event.preventDefault();
  if (validate()) { sendData(), submitinModal() };
  clearInputs();
});

sortButton.addEventListener('click', (event) => {
  event.preventDefault(); 
  renderMoviesList(sortMovies(allMovies));
});

findButton.addEventListener("click", () => {
  renderMoviesList(findMovies(allMovies));
  clearInputs();
});

countButton.addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById("counter").innerHTML = countMins(allMovies);
  console.log(countMins(allMovies));
});

const validate = () => {
  error_message.style.padding = "10px";
  var text;
  if(nameInput.value.length < 3){
    text = "Please Enter valid Name";
    error_message.innerHTML = text;
    return false;
  }
  else if(durationInput.value.length == 0){
    text = "Please Enter valid Duration";
    error_message.innerHTML = text;
    return false;
  }
  else if(rewievsInput.value.length == 0 ){
    text = "Please Enter valid Amount of Reviews";
    error_message.innerHTML = text;
    return false;
  }
  else{
    error_message.style.display = "none";
    return true;
  }
}

window.onload = () => {
  renderMoviesList(getData());
}
