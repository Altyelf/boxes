import React, { useState } from 'react';
import './App.css';

type Color = {
  count: number;
  color: string;
}

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [colors, setColors] = useState<Color[]>([])

  const submitHandler = () => {
    const newColors = [...colors]
    if (hasColor(inputValue) === false) {
      setColors([...colors, { count: 1, color: inputValue }])
    }
    else {
      newColors.map((item) => {
        if (item.color === inputValue) {
          return { ...item, count: item.count++ }
        } else {
          return item
        }
      })
      setColors(newColors)
    }

    setInputValue('')
  }

  const hasColor = (inputColor: string) => {
    return colors.some((item) => item.color === inputColor)
  }

  const deleteColor = (color: string) => {
    const newColors = [...colors]
    const index = newColors.findIndex(item => item.color === color)
    newColors.splice(index, 1)
    setColors(newColors)
  }
  

  return (
    <div>
      <input
        type='text'
        placeholder="add color"
        value={inputValue}
        onChange={
          (e) => {
            setInputValue(e.target.value)
          }
        }
      />

      <button onClick={submitHandler}>
        Add
      </button>

      {colors.map((color, i) => {
        return (
          <div
          onClick={() => deleteColor(color.color)}
            className='box'
            key={i}
            style={{
              backgroundColor: color.color
            }}>
            {color.count}
          </div>)
      })}
    </div>
  )
}

export default App;
