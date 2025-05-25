import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFav } from "../redux/actions/favActions";
import { Link } from "react-router-dom";

function Fav() {
  const favs = useSelector((state) => state.fav.favs);
  const dispatch = useDispatch();

  if (favs.length === 0) {
    return (
      <div className="movie-app-bg d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <div className="text-center">
          <i className="bi bi-heart text-danger" style={{ fontSize: "3rem" }}></i>
          <h2 className="text-white mt-3">No favorites yet</h2>
          <p className="text-light">Add movies to your favorites by clicking the heart icon</p>
          <Link to="/home" className="btn btn-primary mt-3">
            Browse Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-app-bg py-5">
      <div className="container">
        <h1 className="text-white mb-4">Your Favorites</h1>
        <div className="row g-4">
          {favs.map((m) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={m.id}>
              <div className="card h-100">
                <Link to={`/movie/${m.id}`}>
                  <img 
                    src={m.poster_path ? `https://image.tmdb.org/t/p/w500/${m.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'} 
                    className="card-img-top" 
                    alt={m.title} 
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{m.title}</h5>
                  <p>{m.release_date}</p>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(removeFromFav(m.id));
                    }}
                    className="btn btn-outline-danger mt-auto"
                  >
                    <i className="bi bi-heart-fill text-danger"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Fav;