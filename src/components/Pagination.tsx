import { useGlobalContext } from '../../context'

const Pagination = () => {

    const { results, setCurrentPage, currentPage } = useGlobalContext()

    let numPages = Math.ceil(results.length / 5)
    let pages = []

    for (let i = 1; i <= numPages; i++) {
        pages.push(i)
    }

    return (
        <div>
            <h3>Results: {results?.length}</h3>
            <li>    
                {pages && pages.map((page, index) => 
                    (<button 
                        key={index} 
                        onClick={() => setCurrentPage(page)} 
                        className={page === currentPage ? 'current' : ''}>{page}
                    </button>)
                )}
            </li>
        </div>
    )
}

export default Pagination