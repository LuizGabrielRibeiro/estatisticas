//imports react
import React, { useState } from 'react';

//imports components
import NavbarPET from './components/NavbarPET'
import MenuBar from './components/MenuBar';
import Card from './components/Card/index'
import SubjectChart from './components/SubjectChart'


function App() {
  const [selectedSubjectCode, setSelectedSubjectCode] = useState()
  const [selectedSubject, setSelectedSubject] = useState()

  const handleSelectSubject = (subject, code) => {
    setSelectedSubject(subject)
    setSelectedSubjectCode(code)
  }
  
  return (
    <div>
      <NavbarPET />
      <MenuBar />
      <div className="container-fluid">
        <div className="row py-5">
          <div className="col-lg-5">
          <Card selectSubject={handleSelectSubject}/>
          </div>

          <div className="col-lg-7">
            <SubjectChart selectedSubject={selectedSubject} selectedSubjectCode={selectedSubjectCode}/>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default App;