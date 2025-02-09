import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { SignInLayer } from './components/signInComponents/signInLayer'
import { HomePage } from './pages/homePage'
import { BlogPage } from './pages/blogPage'
import { ToastContainer } from 'react-toastify'
import { SeasonPage } from './pages/seasonPage'
import "react-toastify/dist/ReactToastify.css";
import { TeamPage } from './pages/teamPage'
import { PlayerPage } from './pages/playerPage'
import { LeaguePage } from './pages/leaguePage'
import { AppBaseContext } from './contexts/appBaseContext'
import { AppBaseContextPropsService } from './contexts/appBaseContext'
import { useRef } from 'react'
import { BreadCrumbItem } from './models/shareds/breadCrumbItem'


function App() {

  const appBaseContextPropsService = new AppBaseContextPropsService();
  return (
    <>
      <AppBaseContext.Provider value={appBaseContextPropsService}>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<SignInLayer></SignInLayer>}></Route>
              <Route path='/login' element={<SignInLayer></SignInLayer>}></Route>
              <Route path="/home" element={<HomePage></HomePage>}></Route>
              <Route path='/blog' element={<BlogPage></BlogPage>}></Route>
              <Route path='/season/:id' element={<SeasonPage></SeasonPage>}></Route>
              <Route path='/team' element={<TeamPage></TeamPage>}></Route>
              <Route path="/player" element={<PlayerPage></PlayerPage>}></Route>
              <Route path='/league' element={<LeaguePage></LeaguePage>}></Route>
            </Routes>
            <ToastContainer></ToastContainer>
          </BrowserRouter>
      </AppBaseContext.Provider>
    </>
  )
}

export default App
