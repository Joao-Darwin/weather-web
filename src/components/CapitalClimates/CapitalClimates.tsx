import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Divider, Grid2, Stack, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import api from "../../api/api";
import useCustomTheme from "../../hooks/useCustomTheme";
import Weather from "../../interfaces/Weather";

const capitals = ["Fortaleza", "Joao Pessoa", "Recife", "Salvador", "Rio de Janeiro", "Minas Gerais", "Natal"]

const CapitalClimates = (): React.JSX.Element => {
    const theme = useCustomTheme();
    const [weatherData, setWeatherData] = useState<Record<string, Weather | null>>({});

    const handleRequest = async (city: string): Promise<Weather> => {
        return (await api.get(`/${city}`)).data;
    }

    useLayoutEffect(() => {
        const fetchWeatherData = async () => {
            const data: Record<string, Weather | null> = {};

            for (const capital of capitals) {
                try {
                    const weather = await handleRequest(capital);
                    data[capital] = weather;
                } catch (error) {
                    data[capital] = null;
                }
            }

            setWeatherData(data);
        };

        fetchWeatherData();
    }, []);

    return (
        <Stack marginTop={8} spacing={2}>
            <Divider color={theme.palette.secondary.main} variant='fullWidth' />
            <Typography variant='h4' textAlign={'left'} fontWeight={600}>Brazil Capitals</Typography>
            <Grid2 container>
                <Grid2 size={{ xs: 12, md: 6, sm: 6 }} display={"flex"}>
                    <ThermostatIcon />
                    <AirIcon />
                </Grid2>
                <Grid2 size={{ md: 6, sm: 6, xs: 0 }} display={{ xs: 'none', sm: 'flex' }}>
                    <ThermostatIcon />
                    <AirIcon />
                </Grid2>
            </Grid2>
            {weatherData && <Grid2 container>
                {
                    weatherData ? (
                        capitals.map((capital, index) => (
                            <Grid2 key={index} size={{ xs: 12, sm: 6 }} display={"flex"}>
                                {weatherData[capital] && (
                                    <Typography variant="h6">
                                        {weatherData[capital].temperature} {weatherData[capital].wind} {capital}
                                    </Typography>
                                )}
                            </Grid2>
                        ))
                    ) : (
                        <Typography variant="body2" color="error">Erro ao carregar dados</Typography>
                    )
                }
            </Grid2>}
        </Stack>
    );
}

export default CapitalClimates;