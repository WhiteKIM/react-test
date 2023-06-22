import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import "./SearchPage.css";
import useDebounce from '../../hooks/useDebounce';

export default function SearchPage() {
  const [searchResult, setSearchResult] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  const navigate = useNavigate();

  let query = useQuery();
  // const searchTerm = query.get("q");
  const searchTerm = useDebounce(query.get("q"), 500);

  useEffect(() =>{
    if(searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(request);
      setSearchResult(request.data.results);
    }catch (error) {
      console.log(error);
    }
  }

  const navigator = (movieId) => {

  }

  const rendenSearchResult = () => {
    return searchResult.length > 0 ? (
      <section className='search-container'>
        {searchResult.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageURL = "https://image.tmdb.org/t/p/w500"+movie.backdrop_path;
            return (
              <div className='movie'>
                <div
                  className='movie_column-poster'
                  onClick={() => navigate(`/${movie.id}`)}
                >
                  <img 
                    src={movieImageURL} 
                    alt='movie image' 
                    className='movie_poster'
                  >
                  </img>
                </div>
              </div>
            )
          }
        })}
      </section>
    ) : <section className='no-results'>
          <div className='no-result_text'>
            <p>찾고자 하는 검색어"{searchTerm}"에 맞는 영화가 없습니다.</p>
          </div>
        </section>
  }

  return rendenSearchResult();
}
