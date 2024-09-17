import { Routes, Route } from 'react-router-dom'
import React from "react";
import {Header} from "./Papes/Header";
import {Toppage} from "./Papes/Toppage";
import {Detail} from "./Papes/Detail";
import {Contact} from "./Papes/Contact";

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