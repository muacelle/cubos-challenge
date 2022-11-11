import { useState } from 'react'
import { useGlobalContext } from '../../context'
import genres from '../genres'

const Results = () => {

    const { results, selectMovie, selectedMovie, currentPage } = useGlobalContext()

    const baseUrl = 'https://image.tmdb.org/t/p/w200'

    const postsPerPage = 5
    let lastPostIndex = currentPage * postsPerPage
    let firstPostIndex = lastPostIndex - postsPerPage
    let currentPosts = results?.slice(firstPostIndex, lastPostIndex)

    return (
        <section>
            <ul>
                {currentPosts && currentPosts.map(re => {
                    return (
                        <li key={re.id}>
                            <img src={baseUrl+re.poster_path} onClick={() => selectMovie!(re.id)}/>
                            <h3>{re.title}</h3>
                            <p>{re.vote_average * 10}%</p>
                            <p>{re.release_date}</p>
                            <p>Overview: {re.overview}</p>
                            {genres.map(obj => {
                                if (re.genre_ids.includes(obj.id)) return <span>{obj.name} - </span>
                            })}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Results