import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

import styles from './styles/location.module.css'

const GMAPS_API_URL = 'https://maps.googleapis.com/maps/api/staticmap'

 // https://snazzymaps.com/style/8083/mymap
const MAP_PARAMS = [
  `key=${process.env.GMAPS_API_KEY}`,
  'size=304x304',
  `visible=${encodeURIComponent('Melbourne VIC 3000, Australia')}`,
  ...[
    'element:labels.text.fill|color:0xffffff',
    'element:labels.text.stroke|color:0x000000|lightness:13',
    'feature:administrative|element:geometry.fill|color:0x000000',
    'feature:administrative|element:geometry.stroke|color:0x144b53|lightness:14|weight:1.4',
    'feature:administrative.locality|visibility:on',
    'feature:administrative.locality|element:labels.icon|visibility:on',
    'feature:landscape|color:0x08304b',
    'feature:poi|visibility:off',
    'feature:road|element:labels|visibility:off',
    'feature:road.arterial|element:geometry.fill|color:0x000000',
    'feature:road.arterial|element:geometry.stroke|color:0x0b3d51|lightness:16',
    'feature:road.highway|element:geometry.fill|color:0x000000',
    'feature:road.highway|element:geometry.stroke|color:0x0b434f|lightness:25',
    'feature:road.local|element:geometry|color:0x000000',
    'feature:transit|visibility:off',
    'feature:water|color:0x021019',
  ].map(str => `style=${encodeURIComponent(str)}`),
].join('&')

function Location(props) {
  const { suburb, location, address, times } = props
  const mapParams = `markers=${address}&${MAP_PARAMS}`

  return (
    <div className={styles.location}>
      <div
        className={styles.map}
        style={{ backgroundImage: `url('${GMAPS_API_URL}?${mapParams}')` }}
      />
      <div className={styles.content}>
        <h2>{suburb}</h2>
        <p>{location}</p>
        <dl>
          {times.map((entry) => {
            const { days, from, to } = entry
            return [
              <dt key={0}>{days}</dt>,
              <dd key={1}>{from} &ndash; {to}</dd>
            ]
          })}
        </dl>
        <Button to={`https://www.google.com.au/maps/dir//${address}`}>
          Getting there
        </Button>
      </div>
    </div>
  )
}

Location.propTypes = {
  suburb: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  address: PropTypes.string,
  times: PropTypes.arrayOf(PropTypes.shape({
    days: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  })).isRequired,
}

export default Location
