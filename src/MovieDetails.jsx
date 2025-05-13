import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import "./movie-styles.css";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=29cf44b93ca83bf48d9356395476f7ad`
        );
        setMovie(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (isLoading) return (
    <div className="movie-app-bg d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center">
        <div className="spinner-border loading-spinner text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 fs-5 text-white">Loading movie details...</p>
      </div>
    </div>
  );

  return (
    <div className="movie-app-bg">
      <div className="container py-5">
        <button
          className="btn btn-outline-light mb-4 rounded-pill px-4 py-2"
          onClick={() => history.goBack()}
        >
          <i className="bi bi-arrow-left me-2"></i> Back to Movies
        </button>
        
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="movie-poster">
              <img
                src={movie.poster_path ? IMG_BASE + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Poster'}
                alt={movie.title}
                className="img-fluid w-100"
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="bg-dark p-4 p-lg-5 rounded-3 shadow-lg" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <h1 className="display-3 fw-bold mb-4 text-white">{movie.title}</h1>
              
              <div className="d-flex flex-wrap gap-3 mb-4">
                <span className="badge-gradient">
                  <i className="bi bi-star-fill me-2"></i>
                  {movie.vote_average.toFixed(1)}/10
                </span>
                <span className="badge-gradient" style={{ background: 'linear-gradient(45deg, #00c6ff, #0072ff)' }}>
                  <i className="bi bi-clock me-2"></i>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
                <span className="badge-gradient" style={{ background: 'linear-gradient(45deg, #56ab2f, #a8e063)' }}>
                  <i className="bi bi-calendar3 me-2"></i>
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
              
              <div className="mb-4">
                <h3 className="fw-bold mb-3 text-white">Overview</h3>
                <p className="lead text-light">{movie.overview || "No overview available."}</p>
              </div>
              
              {movie.genres?.length > 0 && (
                <div className="mb-4">
                  <h3 className="fw-bold mb-3 text-white">Genres</h3>
                  <div className="d-flex flex-wrap gap-2">
                    {movie.genres.map((g) => (
                      <span key={g.id} className="badge-gradient" style={{ background: 'linear-gradient(45deg, #6a11cb, #2575fc)' }}>
                        {g.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="d-flex flex-wrap gap-3 mt-5">
                <button className="btn btn-danger rounded-pill px-4 py-2">
                  <i className="bi bi-heart-fill me-2"></i> Add to Favorites
                </button>
                <button className="btn btn-primary rounded-pill px-4 py-2">
                  <i className="bi bi-play-fill me-2"></i> Watch Trailer
                </button>
                <button className="btn btn-outline-light rounded-pill px-4 py-2">
                  <i className="bi bi-share me-2"></i> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;