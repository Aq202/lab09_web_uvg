import React from 'react'
import {
  render, screen, fireEvent,
} from '@testing-library/react'

import Calculator from './Calculator'

describe('Componente calculadora', () => {
  it('Evita colocar el cero a la izquierda', () => {
    render(<Calculator />)

    const { getByTestId, getByText } = screen

    // Simular el clic en el botón '1'
    fireEvent.click(getByText('1'))

    // Verificar que el número '1' se muestre en el display y no 01
    expect(getByTestId('display')).toHaveTextContent('1')
  })

  it('Bloquear poner dos puntos en el display.', () => {
    render(<Calculator />)

    const { getByTestId, getByText } = screen

    // Simular el clic en el botón '1'
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('.'))
    fireEvent.click(getByText('2'))
    fireEvent.click(getByText('.'))

    // Verificar que el número '1' se muestre en el display y no 01
    expect(getByTestId('display')).toHaveTextContent('1.2')
  })

  it('Maximo numero de decimales con division irracional.', () => {
    render(<Calculator />)

    const { getByTestId, getByText } = screen

    // obtener elementos ux
    const button2 = getByText('2')
    const button7 = getByText('7')
    const divisionButton = getByText('÷')
    const equalButton = getByText('=')

    // simular acciones
    fireEvent.click(button2)
    fireEvent.click(button2)
    fireEvent.click(divisionButton)
    fireEvent.click(button7)
    fireEvent.click(equalButton)

    // Verificar que el número '1' se muestre en el display y no 01
    expect(getByTestId('display')).toHaveTextContent('3.1428571')
  })

  it('Verificar operación de multiplicacion', () => {
    render(<Calculator />)

    const { getByTestId, getByText } = screen

    // obtener elementos ux
    const button2 = getByText('2')
    const button3 = getByText('3')
    const button6 = getByText('6')
    const button8 = getByText('8')
    const multButton = getByText('x')
    const equalButton = getByText('=')
    const display = getByTestId('display')

    // simular acciones
    fireEvent.click(button8)
    fireEvent.click(button6)
    fireEvent.click(multButton)

    fireEvent.click(button3)
    fireEvent.click(multButton)

    expect(display).toHaveTextContent('258')

    fireEvent.click(button2)
    fireEvent.click(equalButton)

    expect(display).toHaveTextContent('516')
  })

  it('Evitar resultados negativos.', () => {
    render(<Calculator />)

    const { getByTestId, getByText } = screen

    // obtener elementos ux
    const button2 = getByText('2')
    const button3 = getByText('3')
    const minusButton = getByText('-')
    const equalButton = getByText('=')
    const display = getByTestId('display')

    // simular acciones
    fireEvent.click(button2)
    fireEvent.click(minusButton)
    fireEvent.click(button3)

    fireEvent.click(equalButton)

    expect(display).toHaveTextContent('ERROR')
  })

  it('Cambiar signo.', () => {
    render(<Calculator />)

    const { getByTestId, getByText } = screen

    // obtener elementos ux
    const functionButton = getByText('+/-')
    const button3 = getByText('3')
    const display = getByTestId('display')

    // simular acciones
    fireEvent.click(button3)
    expect(display).toHaveTextContent('3')

    fireEvent.click(functionButton)

    expect(display).toHaveTextContent('-3')
  })

  it('Limpiar calculadora.', () => {
    render(<Calculator />)

    const { getByTestId, getByText } = screen

    // obtener elementos ux
    const button3 = getByText('3')
    const clearButton = getByText('AC')
    const display = getByTestId('display')

    // simular acciones
    fireEvent.click(button3)
    fireEvent.click(button3)
    fireEvent.click(button3)
    expect(display).toHaveTextContent('333')

    fireEvent.click(clearButton)

    expect(display).toHaveTextContent('0')
  })
})
