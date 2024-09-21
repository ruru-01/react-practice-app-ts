import { Routes, Route } from 'react-router-dom'
import React from "react";
import {Header} from "./Pages/Header";
import {Toppage} from "./Pages/Toppage";
import {Detail} from "./Pages/Detail";
import {Contact} from "./Pages/Contact";

const App: React.FC = () => {
  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Toppage />} />
          <Route path='/posts/:id' element={<Detail />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
  )
}

export default App;