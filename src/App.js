import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './redux/slides/counterSlide'
import styled from 'styled-components'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()


  const Button = styled.button({
    background: 'blue',
  });

  return (
    <div>
      <div>
        <Button
          aria-label="Increment value sss"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span>{count}</span>
        <Button
          aria-label="Decrement value sss"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
    </div>
  )
}

export default App;
