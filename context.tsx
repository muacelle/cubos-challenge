import React, { useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import axios from 'axios'
import genres from './src/modules/genres'

type ResultList = {
    id: number
    title: string
    overview: string
    vote_average: number
    release_date: string
    genre_ids: number[]
    poster_path: string
}

type MovieInfo = {
    budget: number
    genres: []
    id: number
    title: string
    overview: string
    poster_path: string
    release_date: string
    revenue: number
    runtime: number
    status: string
    video: boolean
    original_language: string
    vote_average: number
    trailer?: string
}

type ContextType = {
    fetchResults: ((term: string) => void) | null
    results: ResultList[] | null
    selectMovie: ((id: number) => void) | null
    selectedMovie: MovieInfo | null
    showModal: boolean
    setShowModal: ((arg: boolean) => void) | null
    setCurrentPage: ((page: number) => void) | null
    currentPage: number
}

type Trailer = {
    site: string
    type: string
    key: string
}

const AppContext = React.createContext<ContextType>({ fetchResults: null, results: null, selectMovie: null, 
    selectedMovie: null, showModal: false, setShowModal: null, setCurrentPage: null, currentPage: 1 })

const API_KEY = import.meta.env.VITE_API_KEY

export const AppProvider = ({ children }: { children: ReactNode }) => {

    const [results, setResults] = useState<ResultList[]>([])
    const [showModal, setShowModal] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState<MovieInfo | null>(null)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchResults = async (term: string) => {

        let url
        const capTerm = term[0].toUpperCase() + term.slice(1)
        const isGenre = genres.find(({ name }) => name === capTerm)
        
        isGenre ? 
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${isGenre.id}`
        : url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${term}&page=1&include_adult=false`

        try {
            const data = await axios(url)
            const movies = await data.data.results
            setResults(movies)
        }
        catch (e) {
            console.log(e) // tratar erros
        }
    }

    const selectMovie = async (id: number) => {
        try {
            const data = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
            const movieInfo: MovieInfo = await data.data
            const trailerUrl = await getTrailer(id)
            if (trailerUrl) {
                movieInfo.trailer = trailerUrl
            }
            setSelectedMovie(movieInfo)
            setShowModal(true)
        }
        catch (e) {
            console.log(e) // tratar erros
        }
    }

    const getTrailer = async (id: number) => {
        try {
            const data = await axios(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
            const results: Trailer[] = await data.data.results
            const trailer = results.find(obj => obj.type == 'Trailer')
            if (trailer) {
                const key = trailer.key
                const url = `https://www.youtube.com/embed/${key}`
                return url
            }
        }
        catch (e) {
            console.log(e) // tratar erros
        }
    }

    return (
        <AppContext.Provider value={{ fetchResults, results, selectMovie, selectedMovie, showModal, setShowModal, setCurrentPage, currentPage }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}