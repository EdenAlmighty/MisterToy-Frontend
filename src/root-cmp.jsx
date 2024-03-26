import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../src/assets/style/main.css'

import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store'
import { AppHeader } from './cmps/AppHeader.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className='main-layout'>
            <Routes>
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit/" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />

              {/* <Route element={<HomePage />} path="/" /> */}
              {/* <Route element={<AboutUs />} path="/about" /> */}
              {/* <Route element={<CarIndex />} path="/car" /> */}
              {/* <Route element={<CarEdit />} path="/car/edit" /> */}
              {/* <Route element={<CarEdit />} path="/car/edit/:carId" /> */}
              {/* <Route element={<CarDetails />} path="/car/:carId" /> */}
              {/* <Route element={<UserDetails />} path="/user/:userId" /> */}
            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}

