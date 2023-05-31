/* eslint-disable no-debugger */
import React, { useState } from 'react'
// import PropTypes from 'prop-types';
import styles from './Calculator.module.css'
import Button from '../Button/Button'
import maxNumbers from '../utils/maxNumbers'

function Calculator() {
  const [displayNumber, setDisplayNumber] = useState(null)
  const [partialResult, setPartialResult] = useState(null)
  const [operation, setOperation] = useState(null)
  const [error, setError] = useState(false)

  const parseDecimalNumber = (number) => {
    const numberSplit = `${number}`.split('.')
    const integerPart = numberSplit[0]
    const decimalPart = numberSplit[1]

    if (integerPart.length > maxNumbers) return setError(true)
    if (integerPart.length === maxNumbers) return parseInt(number, 10)
    if (integerPart.length + decimalPart.length < maxNumbers) return number

    return parseFloat(number.toFixed(maxNumbers - 1 - integerPart.length))
  }

  const calculateResult = (prevNumber, currentNumber, sign) => {
    let result
    debugger
    if (Number.isNaN(currentNumber)) result = prevNumber
    else if (sign === null || prevNumber === null) result = currentNumber
    else if (sign === '+') result = prevNumber + currentNumber
    else if (sign === '-') result = prevNumber - currentNumber
    else if (sign === 'x') result = prevNumber * currentNumber
    else if (sign === '/') result = prevNumber / currentNumber
    else if (sign === '%') result = prevNumber % currentNumber

    debugger
    if (Number.isNaN(result)) return setError(true)

    // determinar cantidad de decimales
    if (`${result}`.includes('.')) result = parseDecimalNumber(result)

    // Si el numero negativo no es la primera entrada y es negativo
    if (prevNumber !== null && result < 0) setError(true)
    else if (`${result}`?.length > maxNumbers) setError(true) // mayor al limite de chars
    return result
  }

  const handleNumberClick = (number) => {
    if (error) setError(false)
    if (displayNumber?.length >= maxNumbers) return // evitar sobrepasar max chars

    // limpiar calculadora cuando no hay operacion
    if (partialResult !== null && !operation) setPartialResult(null)

    if (number === '.' && displayNumber?.includes('.')) return
    if ((displayNumber === null || displayNumber === '0') && number === '.') setDisplayNumber('0.')
    else if (displayNumber === null || displayNumber === '0') setDisplayNumber(`${number}`)
    else setDisplayNumber(`${displayNumber}${number}`)
  }

  const clearCalculator = () => {
    setDisplayNumber(null)
    setPartialResult(null)
    setOperation(null)
  }

  const handleClearButton = () => {
    clearCalculator()
    setError(false)
  }

  const handleOperation = (sign) => {
    // bloquear si hay error
    if (error || (displayNumber === null && partialResult === null)) return

    if (displayNumber !== null) {
      setPartialResult((val) => calculateResult(val, parseFloat(displayNumber), sign))
    }

    setOperation(sign)
    setDisplayNumber(null)
  }

  const handleEqual = () => {
    // bloquear si hay error
    if (error) return
    setPartialResult(calculateResult(partialResult, parseFloat(displayNumber), operation))
    setOperation(null)
    setDisplayNumber(null)
  }

  const handleChangeSign = () => {
    if (displayNumber !== null && displayNumber !== '0') {
      setDisplayNumber((displayValue) => parseFloat(`${-parseFloat(displayValue)}`))
    } else if (!operation && partialResult !== null && partialResult !== '0') {
    // cambiar signo de memoria secundaria solo si no se ha elegido nueva operacion
      setPartialResult((displayValue) => parseFloat(`${-parseFloat(displayValue)}`))
    }
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.displayContainer}>
        <div className={styles.history}>
          {error ? '\u00A0' : `${partialResult ?? '\u00A0'} ${operation ?? ''}`}
        </div>
        <div className={styles.display} data-testid="display">
          {error ? 'ERROR' : displayNumber ?? partialResult ?? 0}
        </div>
      </div>
      <hr />
      <div className={styles.buttonsContainer}>
        <Button content="AC" className={styles.topOperation} onClick={handleClearButton} />
        <Button content="+/-" className={styles.topOperation} onClick={handleChangeSign} />
        <Button content="%" className={styles.topOperation} onClick={() => handleOperation('%')} />
        <Button
          content="÷"
          className={styles.rightOperation}
          onClick={() => handleOperation('/')}
        />
        <Button content="7" onClick={() => handleNumberClick(7)} />
        <Button content="8" onClick={() => handleNumberClick(8)} />
        <Button content="9" onClick={() => handleNumberClick(9)} />

        <Button
          content="x"
          className={styles.rightOperation}
          onClick={() => handleOperation('x')}
        />
        <Button content="4" onClick={() => handleNumberClick(4)} />
        <Button content="5" onClick={() => handleNumberClick(5)} />
        <Button content="6" onClick={() => handleNumberClick(6)} />

        <Button
          content="-"
          className={styles.rightOperation}
          onClick={() => handleOperation('-')}
        />

        <Button content="1" onClick={() => handleNumberClick(1)} />
        <Button content="2" onClick={() => handleNumberClick(2)} />
        <Button content="3" onClick={() => handleNumberClick(3)} />
        <Button
          content="+"
          className={styles.rightOperation}
          onClick={() => handleOperation('+')}
        />
        <Button content="0" className={styles.ceroButton} onClick={() => handleNumberClick(0)} />
        <Button content="." onClick={() => handleNumberClick('.')} />

        <Button content="=" className={styles.rightOperation} onClick={handleEqual} />
      </div>
    </div>
  )
}

export default Calculator

Calculator.propTypes = {}

Calculator.defaultProps = {}
