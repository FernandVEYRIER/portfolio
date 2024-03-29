'use client'

import React from 'react'
import { Grid, styled, Typography } from '@mui/material'
import { BsGithub, BsLinkedin, BsStackOverflow } from 'react-icons/bs'
import MuiLink from '@mui/material/Link'
import { AiFillRocket } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { cardVariant, container } from 'components/animations/cardsReveal'
import { useTranslation } from 'components/i18n/client'

const Link = styled(MuiLink)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  row-gap: ${theme.spacing(1)};
  flex-direction: column;
`,
)

const styles = {
  centered: {
    display: 'flex',
    justifyContent: 'center',
  },
}

export interface ContactSectionProps {
  lang: string
}

const ContactSection = ({ lang }: ContactSectionProps) => {
  const { t } = useTranslation(lang, 'common')

  return (
    <div>
      <Typography variant={'h2'} align={'center'}>
        {t('find me')}
      </Typography>
      <Grid
        container
        justifyContent={'center'}
        spacing={4}
        component={motion.div}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Grid item sm={2} xs={6} sx={styles.centered} component={motion.div} layout variants={cardVariant}>
          <Link
            target={'_blank'}
            rel={'noreferrer'}
            color={'inherit'}
            href={'https://stackoverflow.com/users/10346405/mentlegen'}
            underline={'hover'}
          >
            <BsStackOverflow size={25} />
            <Typography align={'center'}>Stack Overflow</Typography>
          </Link>
        </Grid>
        <Grid item sm={2} xs={6} sx={styles.centered} component={motion.div} layout variants={cardVariant}>
          <Link
            target={'_blank'}
            rel={'noreferrer'}
            color={'inherit'}
            href={'https://github.com/FernandVEYRIER'}
            underline={'hover'}
          >
            <BsGithub size={25} />
            <Typography align={'center'}>Github</Typography>
          </Link>
        </Grid>
        <Grid item sm={2} xs={6} sx={styles.centered} component={motion.div} layout variants={cardVariant}>
          <Link
            target={'_blank'}
            rel={'noreferrer'}
            color={'inherit'}
            href={'https://www.linkedin.com/in/fernand-veyrier/'}
            underline={'hover'}
          >
            <BsLinkedin size={25} />
            <Typography align={'center'}>LinkedIn</Typography>
          </Link>
        </Grid>
        <Grid item sm={2} xs={6} sx={styles.centered} component={motion.div} layout variants={cardVariant}>
          <Link
            target={'_blank'}
            rel={'noreferrer'}
            color={'inherit'}
            href={'https://www.rocketpunch.com/@fernandveyrier96'}
            underline={'hover'}
          >
            <AiFillRocket size={25} />
            <Typography align={'center'}>Rocket Punch</Typography>
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

export default ContactSection
