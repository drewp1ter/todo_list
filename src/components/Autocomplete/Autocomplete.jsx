import React from 'react'
import classNames from 'classnames'
import T from 'prop-types'
import Select from 'react-select'

import styles from './autocomplete.module.scss'
import components from './selectComponents'

const Autocomplete = ({ suggestions, value, onChange, placeholder, className }) => {

  const rootClass = classNames(styles.root, className)

  return (
    <div className={rootClass}>
      <Select
        classes={styles}
        options={suggestions}
        components={components}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isClearable
      />
    </div>
  )
}

Autocomplete.propTypes = {
  suggestions: T.array,
  value: T.shape({
    value: T.string,
    label: T.string
  }),
  onChange: T.func,
  className: T.string,
  placeholder: T.string,
}

export default Autocomplete
