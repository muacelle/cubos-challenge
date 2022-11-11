import './App.css'
import Search from './components/Search'
import Results from './components/Results'
import { useGlobalContext } from '../context'
import Modal from './components/Modal'
import Pagination from './components/Pagination'

function App() {

  const { showModal } = useGlobalContext()

  return (
    <main>
      <Search />
      <Results />
      {showModal && <Modal/>}
      <Pagination />
    </main>
  )
}

export default App