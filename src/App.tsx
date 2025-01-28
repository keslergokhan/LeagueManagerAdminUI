import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { SignInLayer } from './components/signInComponents/signInLayer'

function App() {

  return (
    <>
    
      <BrowserRouter>
        <Routes>
			    <Route path='/login' element={<SignInLayer></SignInLayer>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
