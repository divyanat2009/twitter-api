import React from 'react';
import './App.css';

function App() {
  const [name, setName] = React.useState('BarackObama');
  const [profile, setProfile] = React.useState(null);

  const check = async () => {
    const response = await fetch("https://peerreach.p.rapidapi.com/user/lookup.json?screen_name=" + name, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "peerreach.p.rapidapi.com",
        "x-rapidapi-key": "997b4b4b44mshffb7d7452a7563ap1d23d6jsn758cf6f706f3"
      }
    });
    const body = await response.json();
    console.log(body);
    setProfile(body);
  };

  return (
    <div className="app">

      <section>
        <h2>Username</h2>
        <span>
          @ <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </span>
        <button onClick={check}>Submit</button>
      </section>

      {profile && <>

        <section>
          <h2>Most Popular Topics</h2>
          <ul>
            {profile.profiles?.map(name => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Rating</h2>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Topic</th>
              </tr>
            </thead>
            <tbody>
              {profile.peergroups?.map(group => (
                <tr key={group.topic}>
                  <td>#{group.rank}</td>
                  <td>{group.topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Topics</h2>
          <table>
            <thead>
              <tr>
                <th>Topic</th>                
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {profile.subjects?.map(subject => (
                <tr key={subject.name}>
                  <td>{subject.name}</td>                  
                  <td>{subject.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </>}
    </div>
  );
}

export default App;