import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFav } from "../redux/actions/favActions";
import { Link } from "react-router-dom";

function Fav() {
  const favs = useSelector((state) => state.fav.favs);
  const dispatch = useDispatch();

  if (favs.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>No favorites yet</h2>
        <p>Add movies to your favorites by clicking the heart icon</p>
        <Link to="/home">Browse Movies</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Your Favorite Movies
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {favs.map((m) => (
          <div
            key={m.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Link to={`/movie/${m.id}`}>
              <img
                src={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${m.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Poster"
                }
                alt={m.title}
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
            </Link>
            <h3 style={{ fontSize: "16px", margin: "10px 0 5px" }}>{m.title}</h3>
            <p style={{ fontSize: "14px", color: "#555" }}>{m.release_date}</p>
            <button
              onClick={() => dispatch(removeFromFav(m.id))}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#c00",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fav;
