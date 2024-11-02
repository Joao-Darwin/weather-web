import { Stack, Typography } from "@mui/material";
import React from "react";

interface Props {
    date: string,
    mintemp: string,
    maxtemp: string
}

const SimpleForecast = ({ date, mintemp, maxtemp }: Props):React.JSX.Element => {
    return (
        <Stack spacing={1}>
            <Typography fontWeight={600}>{date}</Typography>
            <Stack direction={"row"} spacing={1}>
                <Typography fontWeight={600}>{mintemp}º</Typography>
                <Typography fontWeight={600}>{maxtemp}º</Typography>
            </Stack>
        </Stack>
    )
}

export default SimpleForecast;