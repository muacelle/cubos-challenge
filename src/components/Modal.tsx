import { useEffect } from 'react'
import { useGlobalContext } from '../../context'
import axios from 'axios'
import getLang from '../helpers/languages'
import tooBig from '../helpers/synopsis'
import { formatCurrency } from '../helpers/formatter'
import poster from '../images/poster-placeholder.png'

const Modal = () => {
    const { selectedMovie, showModal, setShowModal } = useGlobalContext()

    const baseUrl = 'https://image.tmdb.org/t/p/w300'
    const lang = getLang(selectedMovie?.original_language)
    const [ budget, revenue, profit ] = [formatCurrency(selectedMovie?.budget), formatCurrency(selectedMovie?.revenue),
    formatCurrency(selectedMovie?.revenue - selectedMovie?.budget)]

    return (
        <section className='modal-overlay' onClick={() => {
            setShowModal!(false)
            document.body.style.overflow = 'unset'
        }}>

            <section className='modal-container' onClick={e => e.stopPropagation()}>

                <header className='modal-header'>
                    <h1 className='modal-title'>{selectedMovie?.title}</h1>
                    <h2 className='modal-release'>{selectedMovie?.release_date}</h2>
                </header>

                <section className='modal-movie'>

                    <section className='modal-details'>

                        <section className='modal-overview'>
                            <h2>Synopsis</h2>
                            <hr/>
                            {selectedMovie?.overview.length < 600 ? <p>{selectedMovie?.overview}</p> : <p>{tooBig(selectedMovie?.overview)}</p>}
                        </section>

                        <section className='modal-info'>
                            <h2>Information</h2>
                            <hr/>
                            <section className='info-cards'>
                                <section className='card'>
                                    <h3>Status</h3>
                                    <p>{selectedMovie?.status}</p>
                                </section>
                                <section className='card'>
                                    <h3>Language</h3>
                                    <p>{lang}</p>
                                </section>
                                <section className='card'>
                                    <h3>Runtime</h3>
                                    <p>{selectedMovie?.runtime} min</p>
                                </section>
                                <section className='card'>
                                    <h3>Budget</h3>
                                    <p>{budget}</p>
                                </section>
                                <section className='card'>
                                    <h3>Revenue</h3> 
                                    <p>{revenue}</p>
                                </section>
                                <section className='card'>
                                    <h3>Profit</h3>
                                    <p>{profit}</p>
                                </section>
                            </section>   
                        </section>

                        <section className='modal-genres'>
                            {selectedMovie?.genres?.map(obj => <span>{obj.name}</span>)}
                        </section>

                        <section className='average-section'>
                            <span className='modal-average'>{(selectedMovie?.vote_average * 10).toFixed(0)}%</span>
                        </section>

                    </section>

                    <section className='modal-poster'>
                        {selectedMovie?.poster_path ? <img src={baseUrl+selectedMovie?.poster_path}/> : <img src={poster}/>}
                    </section>

                </section>

                {selectedMovie?.trailer &&
                    <section className='modal-video'>
                        <iframe 
                            className='trailer'
                            src={selectedMovie?.trailer} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allowFullScreen>
                        </iframe>
                    </section>
                }

            </section>

        </section>
    )
}

export default Modal