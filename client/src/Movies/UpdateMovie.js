import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export default function UpdateMovie(props) {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then((res) => {
        setMovie(res.data)
    });
  }, [id]);

  const onChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };


  const changeMovie = (e) => {
    e.preventDefault();
    axios
    .put(`http://localhost:5000/api/movies/${id}`,movie)
    .then((res)=>{
        setMovie(movie)
    })
    .catch((err)=>console.log(err))
    history.push('/')
  };


  return (
    <div className="movie-card">
      <form onSubmit={changeMovie}>
        <input
          type="text"
          name="title"
          onChange={onChange}
          value={movie.title}
          placeholder="title"
        />
        <input className="movie-director"
          type="text"
          name="director"
          onChange={onChange}
          value={movie.director}
          placeholder="director"
        />
        <input className="movie-metascore"
          type="text"
          name="metascore"
          onChange={onChange}
          value={movie.metascore}
          placeholder="metascore"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
