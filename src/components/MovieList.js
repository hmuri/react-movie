import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  console.log(`Bearer ${process.env.ACCESS_KEY}`);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_KEY}`,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <MovieContainer>
      {movies.map((movie) => (
        <MovieCard key={movie.id}>
          <MovieImage
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieInfo>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieOverview>{movie.overview}</MovieOverview>
            <MovieDetails>
              <div>Release Date: {movie.release_date}</div>
              <div>Rating: {movie.vote_average}/10</div>
            </MovieDetails>
          </MovieInfo>
        </MovieCard>
      ))}
    </MovieContainer>
  );
};

export default MovieList;
const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const MovieCard = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MovieImage = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  padding: 10px;
`;

const MovieTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const MovieOverview = styled.p`
  font-size: 14px;
  color: #666;
`;

const MovieDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 12px;
  color: #333;
`;
