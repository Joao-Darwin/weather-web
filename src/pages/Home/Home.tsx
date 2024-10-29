import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import api from '../../api/api';
import CapitalClimates from '../../components/CapitalClimates/CapitalClimates';
import Weather from '../../interfaces/Weather';
import "./Home.css";

const Home = (): React.JSX.Element => {
  const [cityName, setCityName] = useState<string>('');

  const handleCityName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCityName(event.target.value);
  }

  const handleRequest = async () => {
    const response: Weather = await (await api.get(`/${cityName}`)).data
    console.log(response)
  }

  return (
    <>
      <Stack direction="column" alignItems={"center"} spacing={3}>
        <Box display={"flex"} flexDirection={"column"} gap={6}>
          <Typography variant='h3' textAlign={'left'} fontWeight={600}>Weather Web</Typography>
          <TextField
            type='text'
            placeholder='Enter city name here'
            className='textField'
            value={cityName}
            onChange={handleCityName}
            slotProps={{
              input: {
                endAdornment: <InputAdornment
                  position="end"
                  onClick={handleRequest}
                  className='inputAdornment'
                >
                  <SearchIcon />
                </InputAdornment>
              }
            }}
          />
        </Box>
      </Stack>
      <CapitalClimates />
    </>
  )
}

export default Home