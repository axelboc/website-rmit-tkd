import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faAngleDoubleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight'

import styles from '../styles/components/related-links.module.css'

function RelatedLinks(props) {
  const { items } = props;

  return (
    <ul className={styles.list}>
      {items.map(item => {
        const { title, path, img } = item

        return (
          <li key={title} className={styles.item}>
            <Link
              className={styles.link}
              to={path}
              style={{ backgroundImage: `url('${img}')` }}
            >
              <span className={styles.label}>
                {title}
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faAngleDoubleRight}
                  width="18"
                  height="18"
                />
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

RelatedLinks.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    img: PropTypes.string,
  })),
}

export default RelatedLinks
