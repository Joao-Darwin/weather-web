import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import "./NavBar.css"

const NavBar = (): React.JSX.Element => {
    return (
        <AppBar position='static' elevation={0}>
            <Toolbar className='toolBar' disableGutters sx={{backgroundColor: "background.default"}}>
                <Link to={"/"} className='link'>
                    <Typography variant='h5' fontWeight={800}>Home</Typography>
                </Link>
                <Link to={"/about"} className='link'>
                    <Typography variant='h5' fontWeight={800}>About</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar