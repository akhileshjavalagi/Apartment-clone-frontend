import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Routers} from "./components/Routers/Routers"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routers />
    </div>
  )
}

export default App
