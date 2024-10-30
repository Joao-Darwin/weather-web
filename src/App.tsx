import { Container, Divider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { CustomThemeProvider } from './contexts/ThemeContext'
import useCustomTheme from './hooks/useCustomTheme'
import About from './pages/About'
import Home from './pages/Home/Home'

function App() {
  const theme = useCustomTheme();

  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Container maxWidth="md" style={{ backgroundColor: "transparent" }}>
          <NavBar />
          <Divider
            color={theme.palette.secondary.main}
            variant='fullWidth'
            style={{ marginBottom: 20, height: 4 }}
          />
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
