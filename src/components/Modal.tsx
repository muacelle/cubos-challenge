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
                <img src={baseUrl+selectedMovie?.poster_path}/>
                <h2>{selectedMovie?.overview}</h2>
                <h4>Status: {selectedMovie?.status}</h4>
                <h4>Language: {selectedMovie?.original_language}</h4>
                <h4>Runtime: {selectedMovie?.runtime} min</h4>
                <h4>Budget: ${selectedMovie?.budget}</h4>
                <h4>Revenue: ${selectedMovie?.revenue}</h4>
                <h4>Profit: ${selectedMovie?.revenue - selectedMovie?.budget}</h4>
                {selectedMovie?.genres?.map(obj => <span>{obj.name} - </span>)}
                <iframe width="560" height="315" src={selectedMovie?.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </section>
        </section>
    )
}

export default Modal