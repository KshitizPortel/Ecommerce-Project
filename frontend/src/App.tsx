import {BrowserRouter,Routes,Route} from 'react-router-dom'
import store from './store/store.ts'
import {Provider} from 'react-redux'
import Register from './pages/auth/register/Register.tsx'
import Login from './pages/auth/login/Login.tsx'
import Home from './pages/home/Home.tsx'
function App()
{
  return(
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App