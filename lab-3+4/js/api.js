axios.defaults.baseURL = "http://localhost:3000/api/v1/movies"
axios.defaults.headers.put['Accept'] = "'content-Type': 'multipart/form-data;  boundary=----abcdefg'"  
axios.defaults.headers.post['Accept'] = "'content-Type': 'multipart/form-data;  boundary=----abcdefg' "

export const getData = () => {
  axios
  .get()
  .then(response => {
    if (allMovies){
      allMovies.length = 0;
      allMovies.push(response.data, onEditMovie, onRemoveMovie);
    }
    else {allMovies.push(response.data);}
    renderMoviesList(response.data, onEditMovie, onRemoveMovie)
  })
  .catch(err => {
    console.log(err, err.response);})
  
  return allMovies;
};


export const sendData = () => {
  axios
    .post('', getBody())
    .then( () => {
      refetchAllMovies(allMovies);
      clearInputs();
    })
    .catch(err => {
      console.log(err, err.response);
    });
};

export const deleteData = (MovieId) => {
axios
.delete(`/${MovieId}`)
  .then( () => { refetchAllMovies(allMovies) })
  .catch(err => {
    console.log(err, err.response);
  });
};

export const editData = (MovieId) =>{
  axios
    .put(`/${MovieId}`, getBody())
    .then( () => { 
      refetchAllMovies(allMovies);
      clearInputs();
    })
    .catch( err => { 
      console.log(err, err.response) 
    });
  };

  import {
    allMovies, 
    getBody,
    onEditMovie, 
    onRemoveMovie, 
    clearInputs,
    refetchAllMovies,
  } from "./index.js"
  
  import {
    renderMoviesList
  } from "./templates.js"
  