import { useState, useEffect } from 'react';

const Highlight = ({ event, condition = true, timeout = 150 }) => {
  const [highlight, setHighlight] = useState(false)
  useEffect(() => {
    if (condition) {
      setHighlight(true)
      setTimeout(() => {
        setHighlight(false)
      }, timeout)
    }
  }, [event, condition, timeout])
  return (
    highlight
  )
}

export default Highlight;