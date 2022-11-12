import { useEffect } from 'react'
import { useGlobalContext } from '../../context'
import axios from 'axios'

const Modal = () => {
    const { selectedMovie, showModal, setShowModal } = useGlobalContext()

    const baseUrl = 'https://image.tmdb.org/t/p/w300'

    return (
        <section className='modal-overlay' onClick={() => setShowModal!(false)}>

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
                            <p>{selectedMovie?.overview}</p>
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
                                    <p>{selectedMovie?.original_language}</p>
                                </section>
                                <section className='card'>
                                    <h3>Runtime</h3>
                                    <p>{selectedMovie?.runtime} min</p>
                                </section>
                                <section className='card'>
                                    <h3>Budget</h3>
                                    <p>${selectedMovie?.budget}</p>
                                </section>
                                <section className='card'>
                                    <h3>Revenue</h3> 
                                    <p>${selectedMovie?.revenue}</p>
                                </section>
                                <section className='card'>
                                    <h3>Profit</h3>
                                    <p>${selectedMovie?.revenue - selectedMovie?.budget}</p>
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
                        <img src={baseUrl+selectedMovie?.poster_path}/>
                    </section>

                </section>

                <section className='modal-video'>
                    <iframe width="560" height="315" src={selectedMovie?.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </section>

            </section>

        </section>
    )
}

export default Modal