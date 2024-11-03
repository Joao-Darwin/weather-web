import SearchIcon from '@mui/icons-material/Search';
import { Alert, Box, Collapse, Divider, IconButton, InputAdornment, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ArrowDownward, ArrowUpward, Close } from '@mui/icons-material';
import CapitalClimates from '../../components/CapitalClimates/CapitalClimates';
import SimpleForecast from '../../components/SimpleForecast/SimpleForecast';
import useCustomTheme from '../../hooks/useCustomTheme';
import CompleteWeather from '../../interfaces/CompleteWeather';
import RequestApi from '../../services/RequestApi';
import "./Home.css";

const Home = (): React.JSX.Element => {
  const { theme } = useCustomTheme();
  const [weatherCity, setWeatherCity] = useState<CompleteWeather | null>(null);
  const [cityName, setCityName] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isLoadingInfo, setIsLoadingInfo] = useState<boolean>(false);

  const handleCityName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCityName(event.target.value);
  }

  const handleRequest = async () => {
    setIsLoadingInfo(true);
    try {
      const weather = await RequestApi.getCurrentWeatherWithForecats(cityName);
      setWeatherCity(weather)
    } catch (error) {
      setShowAlert(true)
    }
    setIsLoadingInfo(false);
  }

  const clearCityNameInput = () => {
    setCityName("")
  }

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      <Stack direction="column" alignItems={"center"} spacing={6}>
        <Typography variant='h3' textAlign={'left'} fontWeight={600}>Weather Web</Typography>
        {isLoadingInfo ? (
          <Skeleton variant='rounded' sx={{
            width: {
              xs: "100%",
              sm: "70%",
              md: "60%",
              lg: "60%",
              xl: "70%"
            },
            height: "390px"
          }} />
        ) : (
          weatherCity &&
            <Paper sx={{
              width: {
                xs: "100%",
                sm: "70%",
                md: "60%",
                lg: "60%",
                xl: "70%"
              },
              height: "390px",
              padding: {
                xs: "10px",
                xl: "2%"
              },
              paddingLeft: {
                xs: "8%",
                sm: "8%",
                xl: "8%"
              },
              paddingRight: {
                xs: "8%",
                sm: "8%",
                xl: "8%"
              }
            }}>
              <Stack spacing={3.5} textAlign={"start"}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={"space-between"}>
                  <Typography fontWeight={600}>{weatherCity.location.name}, {weatherCity.location.region} - {weatherCity.location.country}</Typography>
                  <IconButton onClick={() => {
                    setWeatherCity(null);
                    clearCityNameInput();
                  }}>
                    <Close color='secondary' />
                  </IconButton>
                </Stack>
                <Typography variant='h3' fontWeight={600}>
                  {weatherCity.current.temperature}ºC {weatherCity.current.condition}
                </Typography>
                <Stack direction={"row"} spacing={5}>
                  <Stack direction={"row"} spacing={2}>
                    <Box flexDirection={"row"} display={"flex"}>
                      <ArrowDownward />
                      <Typography fontWeight={600}>{weatherCity.current.mintemp}º</Typography>
                    </Box>
                    <Box flexDirection={"row"} display={"flex"}>
                      <ArrowUpward />
                      <Typography fontWeight={600}>{weatherCity.current.maxtemp}º</Typography>
                    </Box>
                  </Stack>
                  <Stack direction={"row"} spacing={1}>
                    <Typography>
                      Sensation
                    </Typography>
                    <Typography fontWeight={600}>
                      {weatherCity.current.feelslike}º
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={"row"} spacing={10}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography>
                      Wind
                    </Typography>
                    <Typography fontWeight={600}>
                      {weatherCity.current.wind_kph}km/h
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={1}>
                    <Typography>
                      Humidity
                    </Typography>
                    <Typography fontWeight={600}>
                      {weatherCity.current.humidity}º
                    </Typography>
                  </Stack>
                </Stack>
                <Divider color='primary' />
                <Stack direction={"row"} justifyContent={'space-between'}>
                  {weatherCity.forecast.map((forecast, index) => {
                    return (
                      <SimpleForecast
                        key={index}
                        date={forecast.date}
                        mintemp={forecast.mintemp}
                        maxtemp={forecast.maxtemp}
                      />
                    )
                  })}
                </Stack>
              </Stack>
            </Paper>
        )}
        <Box display={"flex"} flexDirection={"column"} gap={6}>
          <TextField
            type='text'
            placeholder='Enter city name here'
            className='textField'
            value={cityName}
            onChange={handleCityName}
            style={{
              border: "1px solid",
              backgroundColor: theme.palette.background.paper
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
        <Collapse in={showAlert}>
          <Alert
            severity='error'
            onClose={() => {
              setShowAlert(false);
              clearCityNameInput();
            }}
            sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.secondary.main }}
          >
            City's name is not valid!
          </Alert>
        </Collapse>
        <CapitalClimates />
      </Stack>
    </>
  )
}

export default Home