import { Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const Home = (): React.JSX.Element => {
  return (
    <Stack direction="column" alignItems={"center"} spacing={3}>
      <Typography variant='h3' textAlign={'left'} fontWeight={600}>Previsão do Tempo</Typography>
      <TextField type='search' placeholder='Insira aqui o nome da cidade' style={{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5
      }} />
    </Stack>
  )
}

export default Home