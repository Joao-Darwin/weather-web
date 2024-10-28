import { Container, Divider } from '@mui/material'
import { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { CustomThemeProvider, ThemeContext } from './contexts/ThemeContext'
import About from './pages/About'
import Home from './pages/Home/Home'

function App() {
  const {theme} = useContext(ThemeContext);

  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Container maxWidth="md" style={{backgroundColor: "transparent"}}>
          <NavBar />
          <Divider color={theme.palette.secondary.main} variant='fullWidth' style={{ marginBottom: 20 }} />
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
