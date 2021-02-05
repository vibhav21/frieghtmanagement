import React,{ useState , useEffect} from 'react';  
import Addtruck from './components/Addtruck'
import './App.css';
//import Chart from './components/Chart';
import Calling from './components/Calling';
import Login from './components/Login';

function App() {
  /*const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);
*/
  return (
    <div className="App">
      
      {/*<Addtruck/>*/}
      <Login/>
      {/* <Calling/> */}
    </div>
  );
}

export default App;
