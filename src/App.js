import React, { useState, useEffect } from 'react';
import api from './services/api';
import './globals.css';
import './App.css';

const SearchBar = ({checkFocus, search}) => {
  return (
    <input
      id="searchBar"
      placeholder="Pesquisar usuario"
      type="text" name="member" 
      onChange={e => {
        search(e.target.value);
        if(e.target.value.length > 0) checkFocus(1);
        else checkFocus(0)
      }}/>
  );
}

const Members = ({listOfMembers, setSelected}) => {
  return (
    <ul id="membersContainer">
      {listOfMembers.map((member, index) => {
        return (
          <li key={index} className="memberContainer">
            <h2 
              className="memberListTitle"
              onClick={() => {setSelected(member); window.scrollTo(0, 0)}}
            >{member.login}</h2>
            <img
              className="memberListImage"
              src={member.avatar_url}
              alt={`${member.login} profile`}
              onClick={() => {setSelected(member); window.scrollTo(0, 0)}}
            />
          </li>
        );
      })}
    </ul>
  );
}

const SelectedMember = ({member}) => {
  const member_date = new Date(member.updated_at);
  return (
    member !== '' &&
      <div id="selectedMemberContainer">
        <img id="selectedMemberImg" src={member.avatar_url} alt={`${member.login} profile`}/>
        <ul id="selectedMemberInfo">
          <li>{`Nome: ${member.name}`}</li>
          <li>{`Repositórios: ${member.public_repos}`}</li>
          <li>{`Seguidores: ${member.followers}`}</li>
          <li>
            {`Ultima vez logado: ${member_date.getFullYear()}/${member_date.getMonth()+1}/${member_date.getDate()+1}
            ${member_date.getHours()}:${member_date.getMinutes()}:${member_date.getSeconds()}
            `}
          </li>
        </ul>
      </div>
  );
}

function App() {
  const [members, setMembers] = useState([]);
  const [searching, setSearching] = useState(0);
  const [searchList, setMembersSearch] = useState([]);
  const [selected, setSelectedMember] = useState('');

  const getSelectedMemberInfo = async (member) => {
    const res = await api.get(`users/${member.login}`);
    setSelectedMember(res.data);

  }

  useEffect(() => {
    async function getUsers() {
      const res = await api.get('orgs/grupotesseract/public_members');
      setMembers(res.data);
    }
    getUsers();
  }, []);

  return (
    <div className="App">
      <div id="appContainer">
        <h1>Listagem de Membros do Grupo Tesseract</h1>
        <SelectedMember member={selected}/>
        <SearchBar 
          checkFocus={e => setSearching(e)} 
          search={m => {
            setMembersSearch(members.filter(member => {
              if(member.login.toLowerCase().includes(m.toLowerCase())) return member
              return '';
            }));
          }}
        />
        <Members 
          listOfMembers={searching ? searchList : members} 
          setSelected={m => getSelectedMemberInfo(m)}/>
      </div>
    </div>
  );
}

export default App;
