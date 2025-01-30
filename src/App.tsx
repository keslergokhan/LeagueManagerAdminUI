import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { SignInLayer } from './components/signInComponents/signInLayer'
import { HomePage } from './pages/homePage'
import { BlogPage } from './pages/blogPage'

function App() {

  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInLayer></SignInLayer>}></Route>
			    <Route path='/login' element={<SignInLayer></SignInLayer>}></Route>
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path='/blog' element={<BlogPage></BlogPage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
