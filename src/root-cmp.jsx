import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../src/assets/style/main.css'

import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store'
import { AppHeader } from './cmps/AppHeader.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

export function App() {

  return (
    <section className="app">
      <AppHeader />
      <main className='main-layout'>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<ToyIndex />} path="/toy" />
          <Route element={<ToyEdit />} path="/toy/edit/" />
          <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
          <Route element={<ToyDetails />} path="/toy/:toyId" />
          {/* <Route element={<AboutUs />} path="/about" /> */}
          {/* <Route element={<UserDetails />} path="/user/:userId" /> */}
        </Routes>
      </main>
      {/* <AppFooter /> */}
      <UserMsg />
    </section>
  )
}

