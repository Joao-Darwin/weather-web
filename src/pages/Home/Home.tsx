import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

import "./Home.css";

const Home = (): React.JSX.Element => {

  return (
    <Stack direction="column" alignItems={"center"} spacing={3}>
      <Box display={"flex"} flexDirection={"column"} gap={3}>
        <Typography variant='h3' textAlign={'left'} fontWeight={600}>Previsão do Tempo</Typography>
        <TextField
          type='search'
          placeholder='Insira aqui o nome da cidade'
          className='textField'
          slotProps={{
            input: {
              endAdornment: <InputAdornment
                position="end"
                onClick={() => console.log("send request")}
                className='inputAdornment'
              >
                <SearchIcon />
              </InputAdornment>
            }
          }}
        />
      </Box>
    </Stack>
  )
}

export default Home