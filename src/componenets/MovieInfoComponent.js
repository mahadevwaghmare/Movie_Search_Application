import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";


const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 30px;
    justify-content: center;
    border-bottom: 1px solid lightgray;
    gap:20px;
`
const CoverImage = styled.img`
    object-fit: cover;
    width: 260px;
    height: 362px;
    padding: 10px;
    box-shadow: 0 3px 10px 0 #aaa;
    margin-left:100px;
`

const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    margin-right:100px;
`

const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;

const MovieInfoComponent = (props) => {

  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  useEffect(() => {
    const response = axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=e58255a0`)
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);

  return (
    <Container>
      {movieInfo? 
      <>
        <CoverImage src={movieInfo?.Poster} />
      <InfoColumn>
        <MovieName>
          {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
        </MovieName>
        <MovieInfo>
          IMDB Rating: <span>{movieInfo?.imdbRating}</span>
        </MovieInfo>
        <MovieInfo>
          Release Year: <span>{movieInfo?.Year}</span>
        </MovieInfo>
        <MovieInfo>
          Language: <span>{movieInfo?.Language}</span>
        </MovieInfo>
        <MovieInfo>
          Rated: <span>{movieInfo?.Rated}</span>
        </MovieInfo>
        <MovieInfo>
          Released: <span>{movieInfo?.Released}</span>
        </MovieInfo>
        <MovieInfo>
          Runtime: <span>{movieInfo?.Runtime}</span>
        </MovieInfo>
        <MovieInfo>
          Genre: <span>{movieInfo?.Genre}</span>
        </MovieInfo>
        <MovieInfo>
          Director: <span>{movieInfo?.Director}</span>
        </MovieInfo>
        <MovieInfo>
          Actors: <span>{movieInfo?.Actors}</span>
        </MovieInfo>
        <MovieInfo>
          Plot: <span>{movieInfo?.Plot}</span>
        </MovieInfo>
      </InfoColumn>
      <Close onClick={()=>{props.onMovieSelect()}}>X</Close>
      </>
       : "Loading..."}
    </Container>
  );
}

export default MovieInfoComponent;