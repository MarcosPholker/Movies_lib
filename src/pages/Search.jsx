import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../Componentes/MovieCard";

const searchUrl = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import "./MovieGrid.css"

import React from "react";

export default function Search(){
    const [searchParams] = useSearchParams()

    const [movie, setMovies] = useState([])

    const query = searchParams.get("q")

    const getSearchedMovies = async (url) =>{
        const res = await fetch(url)
        const data = await res.json();
        setMovies(data.results)
    }

    useEffect(()=>{
        const searchWithQueryUrl = `${searchUrl}?${apiKey}&query=${query}`
        getSearchedMovies(searchWithQueryUrl)
    },[query])

    return(
        <div className="container">
            <h2 className="title">
                Resultado para:<span className="query-text">{query}</span>
            </h2>
            <div className="movies-container">
                <span>{movie.length == 0 && <p>Carregando...</p>}</span>
                {movie.length > 0 && movie.map((movie) => <MovieCard movie={movie} key={movie.id}/>)}
            </div>
        </div>
    )
}