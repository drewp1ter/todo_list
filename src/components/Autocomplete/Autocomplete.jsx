import React, { useState } from 'react'
import classNames from 'classnames'
import T from 'prop-types'
import Select from 'react-select'

import styles from './autocomplete.module.scss'
import components from './selectComponents'

const Autocomplete = ({ value, suggestions, onChange, placeholder, className }) => {
  const [val, setValue] = useState({ value, label: value })
  const rootClass = classNames(styles.root, className)
  const handleChange = value => {
    setValue(value)
    value && onChange(value.label)
  }

  suggestions = suggestions.map(suggestion => ({
    value: suggestion,
    label: suggestion,
  }))

  return (
    <div className={rootClass}>
      <Select
        classes={styles}
        options={suggestions}
        components={components}
        value={val}
        onChange={handleChange}
        placeholder={placeholder}
        isClearable
      />
    </div>
  )
}

Autocomplete.propTypes = {
  suggestions: T.array,
  value: T.string,
  onChange: T.func,
  className: T.string,
  placeholder: T.string,
}

export default Autocomplete
