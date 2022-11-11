import React, { useState } from 'react'
import { useGlobalContext } from '../../context'
import genres from '../genres'

const Search = () => {

    const { fetchResults } = useGlobalContext()

    const [text, setText] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetchResults!(text)
        }
    }

    return (
        <header className='search-container'>
            <h1>Melhores Filmes</h1>
            <form>
                <input
                type='text'
                className='form-input' 
                placeholder='Busque pelo nome, ano ou gênero'
                value={text}
                onChange={handleChange}
                onKeyDown={handleKey}
                />
            </form>
        </header>
    )
}

export default Search