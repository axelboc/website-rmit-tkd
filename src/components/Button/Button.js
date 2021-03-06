import PropTypes from 'prop-types'
import React from 'react'

import styles from './button.module.css'

function Button(props) {
  const { to, centred, children } = props

  const Anchor = (
    <a className={styles.btn} href={to}>
      {children}
    </a>
  )

  return !centred ? Anchor : <div className={styles.wrapper}>{Anchor}</div>
}

Button.defaultProps = {
  centred: false,
}

Button.propTypes = {
  to: PropTypes.string.isRequired,
  centred: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default Button
