import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Divider, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Weather from "../../interfaces/Weather";
import RequestApi from '../../services/RequestApi';

const capitals = [
    "Aracaju", "Belém", "Belo Horizonte", "Boa Vista", "Brasília", "Cuiabá", "Curitiba",
    "Florianópolis", "Fortaleza", "João Pessoa", "Manaus", "Natal", "Porto Alegre", "Recife", "Rio de Janeiro", "Salvador",
    "São Luís", "São Paulo", "Teresina", "Vitória"
]

const CapitalClimates = (): React.JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [weatherData, setWeatherData] = useState<Record<string, Weather | null>>({});

    useEffect(() => {
        const fetchWeatherData = async () => {
            setIsLoading(true);
            const data: Record<string, Weather | null> = {};

            for (const capital of capitals) {
                try {
                    const weather = await RequestApi.getCurrentWeather(capital);
                    data[capital] = weather;
                } catch (error) {
                    data[capital] = null;
                }
            }

            setWeatherData(data);
            setIsLoading(false);
        };

        fetchWeatherData();
    }, []);

    return (
        <Stack spacing={2} width={"100%"} >
            <Divider variant='fullWidth' />
            <Typography variant='h4' textAlign={'left'} fontWeight={600}>Brazil Capitals</Typography>
            {isLoading ? (
                <Paper style={{ padding: '5px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {
                        capitals.map((_value, index) => (
                            <Skeleton key={index} variant='rounded' sx={{
                                width: {
                                    xs: "100%"
                                },
                                height: "52px"
                            }} />
                        ))
                    }
                </Paper>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>
                                    <Tooltip title="City">
                                        <LocationCityIcon />
                                    </Tooltip>
                                </TableCell>
                                <TableCell align='center'>
                                    <Tooltip title="Temperature">
                                        <ThermostatIcon />
                                    </Tooltip>
                                </TableCell>
                                <TableCell align='center'>
                                    <Tooltip title="Wind">
                                        <AirIcon />
                                    </Tooltip>
                                </TableCell>
                                <TableCell align='center'>
                                    <Tooltip title="Climate">
                                        <CloudIcon />
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                weatherData && (
                                    capitals.map((capital, index) => (
                                        weatherData[capital] && (
                                            <TableRow key={index}>
                                                <TableCell align='center'>
                                                    <Typography variant='body2' fontWeight={600}>{capital}</Typography>
                                                </TableCell>
                                                <TableCell align='center'>{weatherData[capital].temperature}</TableCell>
                                                <TableCell align='center'>{weatherData[capital].wind}</TableCell>
                                                <TableCell align='center'>{weatherData[capital].description}</TableCell>
                                            </TableRow>
                                        )
                                    ))
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Stack>
    );
}

export default CapitalClimates;