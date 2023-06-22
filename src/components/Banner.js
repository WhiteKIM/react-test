import React, { useEffect, useState } from 'react'
import request from '../api/request'
import axios from '../api/axios';
import styled from "styled-components";
import "./Banner.css";

export default function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetchData();    
    }, []);

    const fetchData = async () => {
        //현재 상영중인 영화 정보 가져오기
        const requests = await axios.get(request.fetchNowPlaying);
        
        const movieId = 
            requests.data.results[
                Math.floor(Math.random() * requests.data.results.length)
            ].id;

        //특정 영화의 정보를 가져오기
        const {data : movieDetail} =  await axios.get(`movie/${movieId}`,
        {
            params : {append_to_response : "videos"},
        });
        console.log(movieDetail);
        setMovie(movieDetail);
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) +"..." : str
    }

    if(!isClicked) {
        return (
            <header
                className='banner'
                style={{
                    backgroundImage : `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition :"top center",
                    backgroundSize : "cover"
                }}
            >
                <div className='banner_contents'>
                    <h1 className='banner_title'>{movie.title || movie.name || movie.original_name}</h1>
                    <div className='banner_buttons'>
                        <button className='banner_button play' onClick={() => setIsClicked(true)}>Play</button>
                        <button className='banner_button info'>More Info</button>
                    </div>
                    <h1 className='banner_description'>{truncate(movie.overview, 100)}</h1>
                    <div className='banner_fadeBottom'></div>
                </div>
            </header>
          )
    } else {
        return (
            <Container>
                <HomeContainer>
                    <Iframe
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
                        ?controls=&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                        width="640"
                        height="360"
                        frameBorder="0"
                        allow="autoplay : fullscreen"
                    ></Iframe>
                </HomeContainer>
            </Container>
        )
    }
}

const Container = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    width : 100%;
    height : 100vh;
`;

const HomeContainer = styled.div`
    width : 100%;
    height : 100%;
`;

const Iframe = styled.iframe`
    width:100%;
    height: 100%;
    z-index : -1;
    opacity : 0.65;
    border : none;

    &::after {
        content : "";
        position : absolutue;
        top : 0;
        left : 0;
        width : 100%;
        height : 100%;
    }
`;