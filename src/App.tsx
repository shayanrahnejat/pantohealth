import { useState } from 'react'
import Info from './components/Info/Info'
import Map from './components/Map'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Map/>
      <Info/>
    </div>
  )
}

export default App
