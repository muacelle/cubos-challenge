import { useGlobalContext } from '../../context'

const Pagination = () => {

    const { results, setCurrentPage, currentPage } = useGlobalContext()

    let numPages = Math.ceil(results.length / 5)
    let pages = []

    for (let i = 1; i <= numPages; i++) {
        pages.push(i)
    }

    return (
        <footer>
            <li className='pagination'>    
                {pages && pages.map((page, index) => 
                    (<button 
                        key={index} 
                        onClick={() => setCurrentPage(page)} 
                        className={page === currentPage ? 'current-btn' : 'btn'}>{page}
                    </button>)
                )}
            </li>
        </footer>
    )
}

export default Pagination