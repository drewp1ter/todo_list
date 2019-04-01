import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import styles from './header.module.scss'

const Header = ({ title, className }) => {
  const hdrClass = classNames(styles.header, className)

  return (
    <div className={hdrClass}>
      <h5>{title}</h5>
    </div>
  )
}

Header.propTypes = {
  title: T.string.isRequired,
  className: T.string,
}

export default Header
