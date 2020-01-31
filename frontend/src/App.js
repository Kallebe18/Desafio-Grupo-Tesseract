import React, { useState, useEffect } from 'react';
import api from './services/api';
import './globals.css';

const Members = ({listOfMembers}) => {
  return (
    <ul>
      {listOfMembers.map((member, index) => {
        console.log(member);
        return (
          <li key={index}>{member.login}</li>
        );
      })}
    </ul>
  );
}

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const res = await api.get('orgs/grupotesseract/public_members');
      setMembers(res.data);
    }
    getUsers();
  }, []);

  return (
    <div className="App">
      <h1>Listagem de Membros do Grupo Tesseract</h1>
      <Members listOfMembers={members}/>
    </div>
  );
}

export default App;
