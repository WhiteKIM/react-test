import React from 'react';
import Banner from '../../components/Banner';
import Row from '../../components/Row';
import request from '../../api/request';

export default function MainPage() {
  return (
    <div>
      <Banner />
      <Row 
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchURL = {request.fetchNetflixOriginals}
        isLargeRow
      />
      <Row 
        title="Trending Now"
        id="TN"
        fetchURL = {request.fetchTrending}
      />
      <Row 
        title="Top Rated"
        id="TR"
        fetchURL = {request.fetchTopRated}
      />
      <Row 
        title="Action Movies"
        id="AM"
        fetchURL = {request.fetchActionMovies}
      />
      <Row 
        title="Comedy Movies"
        id="CM"
        fetchURL = {request.fetchComedyMovies}
      />
    </div>
  )
}
