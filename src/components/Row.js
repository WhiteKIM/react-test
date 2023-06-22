import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import "./Row.css";
import MovieModal from './MovieModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Row({title, fetchURL, isLargeRow, id}) {
  const [movies, setMovies] = useState([])
  const [modal, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelection] = useState({});
  
  useEffect(() =>{
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchURL);
    setMovies(request.data.results);
  }

  const handleCilck = (movie) => {
    setModalOpen(true);
    setMovieSelection(movie);
  }

  return (
    <div>
      <section>
        <h2>{title}</h2>
        {/* <div className='slider'>
          <div className='slider_arrow-left'>
            <span 
              className='arrow'
              onClick={()=>{
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
            >
              {"<"}
            </span>
          </div> */}
          <Swiper 
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            loop = {true}
            pagination={{ clickable: true }}
            breakpoints={{
              1378:{
                slidesPerView : 6,
                slidesPerGroup : 6,
              },
              998 : {
                slidesPerView : 5,
                slidesPerGroup : 5,
              },
              625 : {
                slidesPerView : 4,
                slidesPerGroup : 4,
              },
              0 : {
                slidesPerView : 3,
                slidesPerGroup : 3,
              }
            }}
          >
          <div id={id} className='row_posters'>
            {movies.map((movie) =>(
              <SwiperSlide>
                <img 
                  key={movie.id}
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  loading='lazy'
                  alt={movie.name}
                  onClick={() => handleCilck(movie)}
                />
              </SwiperSlide>
            ))}
          </div>
          </Swiper>
          {/* <div className='slider_arrow-right'>
            <span className='arrow'
              onClick={()=>{
                document.getElementById(id).scrollLeft += window.innerWidth + 80;
              }}
            >
              {">"}
            </span>
          </div>
        </div> */}

              {modal && (<MovieModal {...movieSelected} setModalOpen ={setModalOpen} />)}
      </section>
    </div>
  )
}
