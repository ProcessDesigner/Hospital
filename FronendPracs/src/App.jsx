
import './App.css'
import {Routes,Route} from 'react-router-dom'
import NotesApp from './Pages/Notes App/NotesApp'
import React from 'react'
import HospitalBedManagement from './Pages/Hospital Management/HospitalBedManagement'
import PatientManagement from './Pages/Hospital Management/PatientManagement'
function App() {

  return (
    <>
      <Routes>
        <Route path='/notes' element= {<NotesApp/>} />
        <Route path = '/hospital' element = {<HospitalBedManagement/>}/>
        <Route path = '/patient' element = {<PatientManagement/>}/>
      </Routes>
    </>

  )
}

export default App
