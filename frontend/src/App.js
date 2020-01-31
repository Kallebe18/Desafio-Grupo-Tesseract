import React, { useState, useEffect } from 'react';
import api from './services/api';
import './globals.css';
import './App.css';

const Members = ({listOfMembers}) => {
  return (
    <ul id="membersContainer">
      {listOfMembers.map((member, index) => {
        return (
          <li key={index} className="memberContainer">
            <h2 className="memberListTitle">{member.login}</h2>
            <img
              className="memberListImage"
              src={member.avatar_url} 
              alt={`${member.login} profile`}
            />
          </li>
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
