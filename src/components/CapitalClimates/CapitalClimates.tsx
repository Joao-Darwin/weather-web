import { Divider, Grid2, Stack, Typography } from "@mui/material";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import React from "react";
import useCustomTheme from "../../hooks/useCustomTheme";

const CapitalClimates = (): React.JSX.Element => {
    const theme = useCustomTheme();

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
        </Stack>
    )
}

export default CapitalClimates;