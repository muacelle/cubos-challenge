import React, { useState } from 'react'
import { useGlobalContext } from '../../context'

const Search = () => {

    const { fetchResults, setCurrentPage } = useGlobalContext()

    const [text, setText] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetchResults!(text)
            setCurrentPage!(1)
        }
    }

    return (
        <header className='search-container'>
            <h1 className='title'>Movies</h1>
            <form className='form'>
                <input
                type='text'
                className='form-input' 
                placeholder='Search for movies by title or genre...'
                value={text}
                onChange={handleChange}
                onKeyDown={handleKey}
                />
            </form>
        </header>
    )
}

export default Search