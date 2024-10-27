import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import About from './pages/About'
import NavBar from './components/NavBar/NavBar'
import { Container, Divider } from '@mui/material'

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <NavBar />
        <Divider color='white' variant='middle' style={{marginBottom: 20}} />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/about' Component={About} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
