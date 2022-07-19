import React, { useState, useEffect } from "react";
import Jumbotron from "../components/jumbotron";
import Navbar from "../components/navbar";
import axios from "axios";
import Card from "../components/card";


const Homepage = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("This is the homepage");
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [information, setInformation] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (page) => {
        setLoading(true);
        await axios
            .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=4e9db22c13a77b3b2d0ba12ec184de7c&language=en-US&page=${page}`)
            .then((response) => {
                const {results} = response.data;
                if (results) {
                    setMovies(results);
                    setPage(2)
                }
            })
            .catch((error) => {
                alert(error.toString());
            })
            .finally(() => setLoading(false));
    }

    const handleScroll = (e) => {
        let element = e.target;
        const bottom =
          element.scrollHeight - element.scrollTop === element.clientHeight;
        if (bottom) {
            fetchData(page+1);
        }
    };

    return(
        <>
        <Navbar />
        <Jumbotron />
        <div className="movies" onScroll={handleScroll}>
            <h2>Now Playing</h2>
            <div className="movie-box">
                {movies.map((movie) => (
                    <Card key={movie.id} data={movie} />
                ))}
            </div>
        </div>
        </>
    )
}

export default Homepage