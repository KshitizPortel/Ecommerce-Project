import {BrowserRouter,Routes,Route} from 'react-router-dom'
import store from './store/store.ts'
import {Provider} from 'react-redux'
import Register from './pages/auth/register/Register.tsx'
import Login from './pages/auth/login/Login.tsx'
import Home from './pages/home/Home.tsx'
import Singleproduct from './pages/singlepage/Singleproduct.tsx'
import Cart from './pages/singlepage/Cart.tsx'
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
          <Route path='/products/:id' element={<Singleproduct/>}></Route>
          <Route path='/cart/' element={<Cart/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App