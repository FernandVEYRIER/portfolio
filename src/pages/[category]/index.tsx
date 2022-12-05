import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import MainLayout from 'components/layout/MainLayout'
import { Box, Container, Typography } from '@mui/material'
import { Category, Project, QueryProjectsArgs } from 'generated/graphql'
import apolloClient from 'apolloClient'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { gql } from '@apollo/client'
import ProjectContainer from 'components/project/ProjectContainer'

const QUERY_PROJECTS = gql`
  query Project($where: ProjectWhereInput!) {
    projects(where: $where, first: 100) {
      id
      title
      slug
      categories
      blur
      image {
        id
        url
      }
    }
  }
`

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1)
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: Object.values(Category).map((o) => `/${o.toLocaleLowerCase()}`),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<{ projects: Project[]; title: string }> = async ({ params, locale }) => {
  const { data } = await apolloClient.query<{ projects: Project[] }, QueryProjectsArgs>({
    query: QUERY_PROJECTS,
    variables: {
      where: {
        categories_contains_some: (Array.isArray(params.category) ? params.category : [params.category]).map((o) =>
          capitalizeFirstLetter(o),
        ) as Category[],
      },
    },
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      projects: data.projects.filter((o) => o.id !== params.id),
      title: Array.isArray(params.category) ? params.category[0] : params.category,
    },
  }
}

const CategoryPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ projects, title }) => {
  return (
    <MainLayout>
      <Container maxWidth={'lg'} sx={{ py: { xs: 4, sm: 10 } }}>
        <Typography variant={'h2'} component={'h1'} align={'center'}>
          All my{' '}
          <Box component={'span'} sx={{ color: 'link.main' }}>
            {title}
          </Box>
        </Typography>
        <ProjectContainer projects={projects} sx={{ pt: { xs: 0, sm: 8 } }} />
      </Container>
    </MainLayout>
  )
}

export default CategoryPage