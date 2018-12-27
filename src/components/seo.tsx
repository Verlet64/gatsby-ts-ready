import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

interface IMeta {
  name: string
  content: string
}

interface ISeoProps {
  description?: string
  lang?: string
  meta?: IMeta
  keywords?: string[]
  title: string
}

interface ISeoRenderData {
  site: {
    siteMetadata: {
      description: string,
      title: string,
      author: string
    }
  },
  [key: string]: any
}

function seo({ description, lang, meta, keywords, title }: ISeoProps) {
  const render = (data: ISeoRenderData) => {
    {
      const metaDescription =
        description || data.site.siteMetadata.description
      return (
        <Helmet
          htmlAttributes={{
            lang,
          }}
          title={title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          meta={[
            {
              name: `description`,
              content: metaDescription,
            },
            {
              property: `og:title`,
              content: title,
            },
            {
              property: `og:description`,
              content: metaDescription,
            },
            {
              property: `og:type`,
              content: `website`,
            },
            {
              name: `twitter:card`,
              content: `summary`,
            },
            {
              name: `twitter:creator`,
              content: data.site.siteMetadata.author,
            },
            {
              name: `twitter:title`,
              content: title,
            },
            {
              name: `twitter:description`,
              content: metaDescription,
            },
          ]
            .concat(
              keywords && keywords.length > 0
                ? {
                    name: `keywords`,
                    content: keywords.join(`, `),
                  }
                : []
            )
            .concat(meta || [])}
        />
      )
    }
  }

  return (
    <StaticQuery
      query={detailsQuery}
      render={render}
    />
  )
}

seo.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default seo

const detailsQuery = graphql`
  query DefaultseoQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
