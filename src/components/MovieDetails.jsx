import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFav, removeFromFav } from "../redux/actions/favActions";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.fav.favs);
  const isFav = favorites.some((m) => m.id === movie?.id);

  const toggleFavorite = () => {
    if (!movie) return;
    if (isFav) {
      dispatch(removeFromFav(movie.id));
    } else {
      dispatch(addToFav({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      }));
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=29cf44b93ca83bf48d9356395476f7ad`)
      .then(res => setMovie(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading movie details...</div>;

  if (!movie) return <div>Movie not found.</div>;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto", color: "white", backgroundColor: "#333" }}>
      <button onClick={() => history.goBack()} style={{ marginBottom: 20 }}>
        &larr; Back
      </button>

      <h1>{movie.title}</h1>

      <img
        src={movie.poster_path ? IMG_BASE + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Poster"}
        alt={movie.title}
        style={{ width: "100%", borderRadius: 8 }}
      />

      <p>Rating: {movie.vote_average.toFixed(1)} / 10</p>
      <p>Duration: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p>
      <p>Year: {new Date(movie.release_date).getFullYear()}</p>

      <h3>Overview</h3>
      <p>{movie.overview || "No overview available."}</p>

      {movie.genres?.length > 0 && (
        <>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map(g => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>
        </>
      )}

      <button onClick={toggleFavorite} style={{ marginTop: 20, padding: "10px 20px" }}>
        {isFav ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}

export default MovieDetails;
