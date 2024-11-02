import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import CapitalClimates from '../../components/CapitalClimates/CapitalClimates';
import CompleteWeather from '../../interfaces/CompleteWeather';
import RequestApi from '../../services/RequestApi';
import "./Home.css";
import { Close } from '@mui/icons-material';

const Home = (): React.JSX.Element => {
  const [weatherCity, setWeatherCity] = useState<CompleteWeather | null>(null);
  const [cityName, setCityName] = useState<string>('');

  const handleCityName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCityName(event.target.value);
  }

  const handleRequest = async () => {
    const response: CompleteWeather = await RequestApi.getCurrentWeatherWithForecats(cityName);
    setWeatherCity(response);
  }

  return (
    <>
      <Stack direction="column" alignItems={"center"} spacing={6}>
        {weatherCity &&
          <Paper sx={{
            width: {
              xs: "100%",
              sm: "70%",
              md: "60%",
              lg: "60%",
              xl: "70%"
            },
            height: "400px",
            padding: {
              xs: "10px",
              xl: "2%"
            },
            paddingLeft: {
              sm: "8%",
              xl: "8%"
            }
          }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={"space-between"}>
              <Typography fontWeight={600}>{weatherCity.location.name}, {weatherCity.location.region} - {weatherCity.location.country}</Typography>
              <IconButton onClick={() => setWeatherCity(null)}>
                <Close color='secondary' />
              </IconButton>
            </Stack>
          </Paper>
        }
        <Box display={"flex"} flexDirection={"column"} gap={6}>
          <Typography variant='h3' textAlign={'left'} fontWeight={600}>Weather Web</Typography>
          <TextField
            type='text'
            placeholder='Enter city name here'
            className='textField'
            value={cityName}
            onChange={handleCityName}
            style={{
              border: "1px solid"
            }}
            slotProps={{
              input: {
                endAdornment: <InputAdornment
                  position="end"
                  onClick={handleRequest}
                  className='inputAdornment'
                >
                  <SearchIcon color="secondary" />
                </InputAdornment>
              }
            }}
          />
        </Box>
        <CapitalClimates />
      </Stack>
    </>
  )
}

export default Home