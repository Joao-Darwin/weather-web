import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import "./NavBar.css"

const NavBar = (): React.JSX.Element => {
    return (
        <AppBar position='static' elevation={0}>
            <Toolbar className='toolBar' disableGutters sx={{backgroundColor: "primary.main"}}>
                <Link to={"/"} className='link'>
                    <Typography variant='h5' fontWeight={800}>Início</Typography>
                </Link>
                <Link to={"/about"} className='link'>
                    <Typography variant='h5' fontWeight={800}>Sobre</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar