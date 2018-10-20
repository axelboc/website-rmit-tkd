import React from 'react'

import PageMeta from '../components/PageMeta'
import Banner from '../components/Banner'
import Section from '../components/Section'
import RelatedLinks from '../components/RelatedLinks'

import styles from '../styles/pages/tkd.module.css'

export default function TkdPage(props) {
  const { data, location: { pathname } } = props

  const { frontmatter, html } = data.page.edges[0].node
  const { metaDescription, video, relatedLinks } = frontmatter

  // Hide related videos and YouTube branding
  const videoSrc = `${video.split('?')[0]}?rel=0&modestbranding=1`

  return (
    <div>
      <PageMeta
        title="What is Taekwon-Do?"
        description={metaDescription}
        path={pathname}
      />
      <Banner
        heading="What is Taekwon-Do?"
        intro={html}
        variant="tkd"
      />
      <Section useDiv spaced bg="alt">
        <div className={styles.embed}>
          <iframe className={styles.iframe} src={videoSrc} allowFullScreen></iframe>
        </div>
      </Section>
      <Section useDiv spaced>
        <RelatedLinks items={relatedLinks} />
      </Section>
    </div>
  )
}

export const query = graphql`
  query TkdQuery {
    page: allMarkdownRemark (filter: {fileAbsolutePath: {regex: "/tkd\\.md$/"}}) {
      edges {
        node {
          frontmatter {
            metaDescription
            video
            relatedLinks {
              title
              path
              img {
                childImageSharp {
                  sizes(maxWidth: 338) {
                    src
                  }
                }
              }
            }
          }
          html
        }
      }
    }
  }
`
