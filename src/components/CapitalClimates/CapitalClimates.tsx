import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CloudIcon from '@mui/icons-material/Cloud';
import { Divider, Grid2, Stack, Tooltip, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
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
    const [weatherData, setWeatherData] = useState<Record<string, Weather | null>>({});

    useLayoutEffect(() => {
        const fetchWeatherData = async () => {
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
        };

        fetchWeatherData();
    }, []);

    return (
        <Stack spacing={2}>
            <Divider color={theme.palette.text.primary} variant='fullWidth' />
            <Typography variant='h4' textAlign={'left'} fontWeight={600}>Brazil Capitals</Typography>
            <Grid2 container>
                <GridIcons />
                <GridIcons disappearOnMobile />
            </Grid2>
            {weatherData && <Grid2 container>
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
            </Grid2>}
        </Stack>
    );
}

export default CapitalClimates;