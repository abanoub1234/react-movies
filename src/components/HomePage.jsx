import React, { useEffect, useState } from "react";
import axios from "axios";
import MyCard from "./MyCard";
import { useSelector } from "react-redux";

const TMDB_POPULAR_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=29cf44b93ca83bf48d9356395476f7ad";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const favs = useSelector((state) => state.fav.favs);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${TMDB_POPULAR_URL}&page=${currentPage}`);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages > 500 ? 500 : response.data.total_pages);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Trending Movies</h1>
        <p>Discover the hottest movies right now</p>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading movies...</p>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {movies.map((m) => {
              const isFav = favs.some((fav) => fav.id === m.id);
              return (
                <MyCard
                  key={m.id}
                  id={m.id}
                  img={m.poster_path}
                  title={m.title}
                  release_date={m.release_date}
                  page={`/movie/${m.id}`}
                  isFav={isFav}
                />
              );
            })}
          </div>

          {/* Basic pagination */}
          {totalPages > 1 && (
            <div style={{ marginTop: "30px", textAlign: "center" }}>
              <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                First
              </button>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>

              <span style={{ margin: "0 10px" }}>
                Page {currentPage} of {totalPages}
              </span>

              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
              <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                Last
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
