import { Link } from "react-router-dom";
import "./movie-styles.css";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function MyCard({ img, title, release_date, page }) {
  return (
    <div className="card h-100">
      <div className="card-img-wrapper">
        <img
          src={img ? IMG_BASE + img : 'https://via.placeholder.com/500x750?text=No+Poster'}
          className="card-img-top"
          alt={title}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-white">{title}</h5>
        <p className="card-text text-muted">
          <i className="bi bi-calendar3 me-2"></i>
          {new Date(release_date).toLocaleDateString()}
        </p>
        {page && (
          <Link 
            to={page} 
            className="mt-auto btn btn-details rounded-pill py-2"
          >
            View Details <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        )}
      </div>
    </div>
  );
}

export default MyCard;