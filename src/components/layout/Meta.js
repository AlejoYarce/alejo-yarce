import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = () => {
  return (
    <Helmet
      title="Alejo Yarce FullStack JS Dev"
      link={[
        // { href: '//fonts.googleapis.com/css?family=Open+Sans:400,600,700', rel: 'stylesheet' },
        { href: '//fonts.googleapis.com/css?family=Permanent+Marker&display=swap', rel: 'stylesheet' },
        { href: '//fonts.googleapis.com/css?family=Manjari:400,700&display=swap', rel: 'stylesheet' },
      ]}
      meta={[
        {
          name: 'description',
          content: 'Alejo Yarce site',
        },
        {
          property: 'og:title',
          content: 'Alejo Yarce',
        },
        {
          property: 'og:description',
          content: 'Alejo Yarce site',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: 'Alejo Yarce',
        },
        {
          name: 'twitter:title',
          content: 'Alejo Yarce',
        },
        {
          name: 'twitter:description',
          content: 'Alejo Yarce site',
        },
      ]}
    />
  )
}

export default Meta
