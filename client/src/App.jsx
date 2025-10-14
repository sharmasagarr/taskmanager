import './App.css'
import { Route, Routes } from 'react-router-dom'
import TaskForm from './components/TaskForm'
import AuthForm from './components/AuthForm'
import Home from './components/Home'

function App() {
  return (
     <Routes>
       {/* <Route path="/" element={<Home />} />
       <Route path='/login' element={<AuthForm />} />
       <Route path='/tasks/new' element={<TaskForm />}  /> */}
    </Routes>
  )
}

export default App
