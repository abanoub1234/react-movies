import React, { useEffect, useState } from "react";
import axios from "axios";
import MyCard from "./MyCard";
import "./movie-styles.css";
import { useSelector } from "react-redux";

const TMDB_POPULAR_URL = "https://api.themoviedb.org/3/movie/popular?api_key=29cf44b93ca83bf48d9356395476f7ad";

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="movie-app-bg py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-3 fw-bold text-white mb-3">Trending Movies</h1>
          <p className="lead text-light opacity-75">Discover the hottest movies right now</p>
        </div>

        {isLoading ? (
          <div className="text-center py-5 my-5">
            <div className="spinner-border loading-spinner text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 fs-5 text-white">Loading movies...</p>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {movies.map((m) => {
                const isFav = favs.some((fav) => fav.id === m.id);
                return (
                  <div key={m.id} className="col-sm-6 col-md-4 col-lg-3">
                    <MyCard
                      id={m.id}
                      img={m.poster_path}
                      title={m.title}
                      release_date={m.release_date}
                      page={`/movie/${m.id}`}
                      isFav={isFav}
                    />
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <nav className="mt-5 d-flex justify-content-center">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(1)}
                      aria-label="First"
                    >
                      <i className="bi bi-chevron-double-left"></i>
                    </button>
                  </li>
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(currentPage - 1)}
                      aria-label="Previous"
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                  </li>
                  
                  {/* Show first page, current range, and last page */}
                  {currentPage > 3 && (
                    <li className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  )}
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    if (pageNum < 1 || pageNum > totalPages) return null;
                    
                    return (
                      <li 
                        key={pageNum} 
                        className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
                      >
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      </li>
                    );
                  })}
                  
                  {currentPage < totalPages - 2 && (
                    <li className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  )}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(currentPage + 1)}
                      aria-label="Next"
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(totalPages)}
                      aria-label="Last"
                    >
                      <i className="bi bi-chevron-double-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;