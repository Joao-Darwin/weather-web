import { Container } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { CustomThemeProvider } from './contexts/ThemeContext'
import About from './pages/About'
import Home from './pages/Home/Home'

function App() {
  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Container maxWidth="md">
          <NavBar />
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/about' Component={About} />
          </Routes>
        </Container>
      </BrowserRouter>
    </CustomThemeProvider>
  )
}

export default App
