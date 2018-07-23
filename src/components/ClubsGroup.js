import React from 'react'
import PropTypes from 'prop-types'
import Club from './Club'
import GMap from './GMap'

import styles from '../styles/components/clubs-group.module.css'

function ClubsGroup(props) {
  const { heading, clubs, mapFocus } = props

  return (
    <div className={styles.clubsGroup}>
      <h3 className={styles.heading}>{heading}</h3>
      <div className={styles.map}>
        <GMap
          dimensions={[522, 326]}
          focus={mapFocus}
          addresses={clubs.map(c => c.address)}
        />
      </div>
      <ul className={styles.list}>
        {clubs.map(club => (
          <li className={styles.club} key={club.name}>
            <Club {...club} />
          </li>
        ))}
      </ul>
    </div>
  )
}

ClubsGroup.propTypes = {
  clubs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    state: PropTypes.string,
  })).isRequired,
  mapFocus: PropTypes.string,
}

export default ClubsGroup
