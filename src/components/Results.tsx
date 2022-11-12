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
        <section className='results-section'>
            <ul className='results-list'>
                {currentPosts && currentPosts.map(re => {
                    return (
                        <li key={re.id} className='results-movie'>
                            <section>
                                <img src={baseUrl+re.poster_path} className='poster' onClick={() => selectMovie!(re.id)}/>
                            </section>
                            <section className='results-info'>
                                <header className='header-info'>
                                    <span className='average'>{re.vote_average * 10}%</span>
                                    <h3 className='results-title'>{re.title}</h3>
                                </header>
                                <p className='release'>{re.release_date}</p>
                                <p className='overview'>{re.overview}</p>
                                <section className='genres'>
                                    {genres.map(obj => {
                                        if (re.genre_ids.includes(obj.id)) return <span>{obj.name}</span>
                                    })}
                                </section>
                            </section>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Results