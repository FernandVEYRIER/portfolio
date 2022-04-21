import React from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { Skill } from 'lib/models/Skill'
import Image from 'next/image'

interface SkillContainerProps {
  skills: Skill[]
}

const SkillContainer = (props: SkillContainerProps): JSX.Element => {
  const { skills } = props
  return (
    <Box>
      <Typography variant={'h2'} align={'center'} gutterBottom>
        My skills
      </Typography>
      <Grid container spacing={2} justifyContent={'center'}>
        {skills.map((o) => (
          <Grid key={o.id} item xs={6} sm={4} md={2}>
            <Stack position={'relative'} alignItems={'center'}>
              <div>{o.image && <Image src={o.image} alt={o.name} width={70} height={50} objectFit={'contain'} />}</div>
              <Typography>{o.name}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SkillContainer