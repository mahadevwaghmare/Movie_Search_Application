import styled from 'styled-components'
import MovieComponent from './componenets/MovieComponent';
import { useState } from 'react'
import axios from 'axios'
import MovieInfoComponent from './componenets/MovieInfoComponent';

const API_KEY = process.env.REACT_APP_API_KEY;

const container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  align-items: center;
  justify-content: space-between;

`
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items:center;
`

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {

  const [timeoutId, updateTimeoutId] = useState();
  const [searchQuery, updateSearchQuery] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
      
      if (response.data.Response) {
        updateMovieList(response.data.Search); 
      } else {
        alert("No movies found for the given search query.");
        updateMovieList([]);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error.message);
      alert("An error occurred while fetching movie data. Please try again later.");
      updateMovieList([]); 
    }
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  }

  return (
    <div >
      <Header>
        <AppName>
          <MovieImage src="/movie-icon.svg" />
          React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src='/search-icon.svg' />
          <SearchInput placeholder='Seach Movie Name' value={searchQuery} onChange={onTextChange} />
        </SearchBox>
      </Header>

      {
        selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />
      }

      <MovieListContainer>
        {
          movieList?.length ?
            (movieList.map((movie, index) => <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect} />))
            : (<Placeholder src="/movie-icon.svg" />)
        }
      </MovieListContainer>
    </div>
  );
}

export default App;
