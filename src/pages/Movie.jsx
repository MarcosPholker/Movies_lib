import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {BsGraphUp, BsWallet2, 
    BsHourglassSplit, 
    BsFillFileEarmarkTextFill,
} from "react-icons/bs"

import MovieCard from "../Componentes/MovieCard"

import "./Movie.css"

const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

export default function Movie(){

    const formatCurrency = (number) => {
        return number.toLocaleString("en-us", {style: "currency", currency: "USD"})
    }


    const {id} = useParams()
    const [movie, setMovie] = useState(null)

    const getMovie = async (url) =>{
        const res = await fetch(url)
        const data = await res.json();
        setMovie(data)
    }

    useEffect(()=>{
        const movieUrl = `${moviesUrl}${id}?${apiKey}`
        getMovie(movieUrl)
    },[])

    return(
        <div className="moviePage">
            {movie && 
            <>

            <MovieCard movie={movie} showLink={false}/>
            <p className="tagLine">{movie.tagline}</p>

            <div className="info">
                <h3>
                    <BsWallet2/> Orçamento:
                </h3>
                <p>{formatCurrency(movie.budget)}</p>
            </div>
            <div className="info">
                <h3>
                    <BsGraphUp/> Receita:
                </h3>
                <p>{formatCurrency(movie.revenue)}</p>
            </div>
            <div className="info">
                <h3>
                    <BsHourglassSplit/> Duração:
                </h3>

                <p>minutos: {movie.runtime}</p>
            </div>
            <div className="info">
                <h3>
                    <BsFillFileEarmarkTextFill/> Descrição:
                </h3>
                <p>{movie.overview}</p>
            </div>
            </>}
        </div>
    )
}