import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

function Button({ content, className, onClick }) {
  return (
    <button type="button" className={`${styles.button} ${className}`} onClick={onClick}>
      {content}
    </button>
  )
}

export default Button

Button.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  className: '',
  onClick: null,
}
