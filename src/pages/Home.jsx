import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "../Componentes/MovieCard";
import "./MovieGrid.css"

const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

export default function Home(){

    const [topMovies, setTopMovies] = useState([])

    const getTopRateMovies = async (url) =>{
        const res = await fetch(url)
        const data = await res.json();
        setTopMovies(data.results)
    }

    useEffect(()=>{
        const topRateUrl = `${moviesUrl}top_rated?${apiKey}`
        getTopRateMovies(topRateUrl)
    },[])

    return(
        <div className="container">
            <h2 className="title">Melhores Filmes: </h2>
            <div className="movies-container">
                {topMovies.length > 0 && topMovies.map((movie) => <MovieCard movie={movie} key={movie.id}/>)}
            </div>
        </div>
    )
}

