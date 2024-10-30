import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
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
            gap={5}
        >
            <Tooltip title="Temperature">
                <ThermostatIcon />
            </Tooltip>
            <Tooltip title="Wind">
                <AirIcon />
            </Tooltip>
        </Grid2>
    )
}

const CapitalClimates = (): React.JSX.Element => {
    const theme = useCustomTheme();
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
        <Stack marginTop={8} spacing={2}>
            <Divider color={theme.palette.secondary.main} variant='fullWidth' />
            <Typography variant='h4' textAlign={'left'} fontWeight={600}>Brazil Capitals</Typography>
            <Grid2 container>
                <GridIcons />
                <GridIcons disappearOnMobile />
            </Grid2>
            {weatherData && <Grid2 container>
                {
                    weatherData ? (
                        capitals.map((capital, index) => (
                            <Grid2 key={index} size={{ xs: 12, sm: 6 }} display={"flex"}>
                                {weatherData[capital] && (
                                    <Typography variant="h6" gutterBottom>
                                        {weatherData[capital].temperature} ºC {weatherData[capital].wind} km/h {capital}
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