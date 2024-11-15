import Brightness4Icon from '@mui/icons-material/Brightness4';
import { AppBar, Divider, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";
import useCustomTheme from '../../hooks/useCustomTheme';

const NavBar = (): React.JSX.Element => {
    const { theme, toggleTheme } = useCustomTheme();
    
    return (
        <AppBar position='static' elevation={0}>
            <Toolbar className='toolBar' disableGutters >
                <Stack direction={"row"} spacing={4}>
                    <Link to={"/"} className='link'>
                        <Typography variant='h5' fontWeight={800} color='text.primary'>Home</Typography>
                    </Link>
                    <Link to={"/about"} className='link'>
                        <Typography variant='h5' fontWeight={800} color='text.primary'>About</Typography>
                    </Link>
                </Stack>
                <Tooltip title="Change theme">
                    <Brightness4Icon onClick={toggleTheme} style={{ cursor: "pointer" }} />
                </Tooltip>
            </Toolbar>
            <Divider color={theme.palette.text.primary} variant='fullWidth' style={{marginBottom: 40, height: 2}} />
        </AppBar>
    )
}

export default NavBar