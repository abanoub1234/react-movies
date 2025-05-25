import React from "react";
import { useDispatch } from "react-redux";
import { addToFav, removeFromFav } from "../redux/actions/favActions";
import { Link } from "react-router-dom";
import "./Card.css";

function MyCard({ img, title, release_date, page, id, isFav }) {
  const dispatch = useDispatch();

  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      dispatch(removeFromFav(id));
    } else {
      dispatch(addToFav({ id, title, poster_path: img, release_date }));
    }
  };

  return (
    <div className="movie-card">
      <Link to={page} className="card-link">
        <div className="card-image-container">
          <img 
            src={img ? `https://image.tmdb.org/t/p/w500/${img}` : 'https://via.placeholder.com/500x750?text=No+Poster'} 
            alt={title}
            className="card-image"
          />
          <button 
            onClick={toggleFav}
            className="heart-button"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <svg viewBox="0 0 24 24" className={`heart-icon ${isFav ? "filled" : ""}`}>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
        </div>
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-year">
            {release_date ? new Date(release_date).getFullYear() : "Year unknown"}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default MyCard;