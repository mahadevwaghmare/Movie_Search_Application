import styled from "styled-components";
import MovieInfoComponent from "./MovieInfoComponent";


const MovieListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 280px;
    box-shadow: 0 3px 10px 0 #aaa;
    cursor: pointer; 
`
const CoverImage = styled.img`
    object-fit:cover;
    height: 362px;
`
const MovieName = styled.span`
    font-size: 18px;
    font-weight: 600;
    color: black;
    margin: 15px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const InfoColumn = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
`

const MovieInfo = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: black;
    text-transform: capitalize;
`

const MovieComponent = (props) => {

    const { Title, Year, imdbID, Type, Poster } = props.movie;
    
    return (
        <div>
            <MovieListContainer
                onClick={() => {
                    props.onMovieSelect(imdbID);
                }}>
                <CoverImage src={Poster} />
                <MovieName>{Title}</MovieName>
                <InfoColumn>
                    <MovieInfo>Year: {Year}</MovieInfo>
                    <MovieInfo>Type: {Type}</MovieInfo>
                </InfoColumn>
            </MovieListContainer>
        </div>
    )
}

export default MovieComponent;