import {BrowserRouter,Routes,Route} from 'react-router-dom'
import store from './store/store.ts'
import {Provider} from 'react-redux'
function App()
{
  return(
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>This is home page</h1>}></Route>
          <Route path='/register' element={<h1>This is register page</h1>}></Route>
          <Route path='/login' element={<h1>This is login page</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App