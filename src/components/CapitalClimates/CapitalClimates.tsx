import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { Divider, Grid2, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useCustomTheme from "../../hooks/useCustomTheme";
import Weather from "../../interfaces/Weather";
import RequestApi from '../../services/RequestApi';

const capitals = [
    "Aracaju", "Belém", "Belo Horizonte", "Boa Vista", "Brasília", "Cuiabá", "Curitiba",
    "Florianópolis", "Fortaleza", "João Pessoa", "Manaus", "Natal", "Porto Alegre", "Recife", "Rio de Janeiro", "Salvador",
    "São Luís", "São Paulo", "Teresina", "Vitória"
]

interface Props {
    disappearOnMobile?: boolean
}

const GridIcons = ({ disappearOnMobile }: Props): React.JSX.Element => {
    return (
        <Grid2
            size={{ xs: 12, md: 6, sm: 6 }}
            display={disappearOnMobile ? { xs: 'none', sm: 'flex' } : "flex"}
            gap={7}
        >
            <Tooltip title="Temperature">
                <ThermostatIcon />
            </Tooltip>
            <Tooltip title="Wind">
                <AirIcon />
            </Tooltip>
            <Tooltip title="Climate">
                <CloudIcon />
            </Tooltip>
        </Grid2>
    )
}

const CapitalClimates = (): React.JSX.Element => {
    const { theme } = useCustomTheme();
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
            <Divider color={theme.palette.text.primary} variant='fullWidth' />
            <Typography variant='h4' textAlign={'left'} fontWeight={600}>Brazil Capitals</Typography>
            {/* <Grid2 container>
                <GridIcons />
                <GridIcons disappearOnMobile />
            </Grid2>
            {isLoading ? (
                capitals.map((_value, index) => (
                    <Skeleton key={index} variant='rounded' sx={{
                        width: {
                            xs: "100%"
                        },
                        height: "24px"
                    }} />
                ))
            ) : (
                <Grid2 container spacing={1}>
                    {
                        weatherData ? (
                            capitals.map((capital, index) => (
                                <Grid2 key={index} size={{ xs: 12, sm: 6 }}>
                                    {weatherData[capital] && (
                                        <Stack direction={'row'} spacing={2}>
                                            <Typography>{weatherData[capital].temperature} ºC</Typography>
                                            <Typography>{weatherData[capital].wind} km/h</Typography>
                                            <Typography>{weatherData[capital].description}</Typography>
                                            <Typography fontWeight={600}>{capital}</Typography>
                                        </Stack>
                                    )}
                                </Grid2>
                            ))
                        ) : (
                            <Typography variant="body2" color="error">Erro ao carregar dados</Typography>
                        )
                    }
                </Grid2>
            )} */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
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
                            <TableCell align='center'>
                                <Tooltip title="City">
                                    <LocationCityIcon />
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
                                            <TableCell align='center'>{weatherData[capital].temperature}</TableCell>
                                            <TableCell align='center'>{weatherData[capital].wind}</TableCell>
                                            <TableCell align='center'>{weatherData[capital].description}</TableCell>
                                            <TableCell align='center'>
                                                <Typography variant='body2' fontWeight={600}>{capital}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}

export default CapitalClimates;