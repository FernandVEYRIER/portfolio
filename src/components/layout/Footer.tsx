import React from 'react'
import { Paper, Typography } from '@mui/material'
import theme from 'theme'

const Footer = (): JSX.Element => {
  return (
    <Paper
      square
      elevation={0}
      sx={{
        padding: theme.spacing(2),
        position: 'relative',
      }}
    >
      <Typography variant={'caption'} align={'center'} component={'p'}>
        Games are love, games are life | Copyright Fernand Veyrier, {new Date().getFullYear()}
      </Typography>
    </Paper>
  )
}

export default Footer
