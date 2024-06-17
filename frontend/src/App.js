import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingScreen from './components/screens/LandingScreen';
import ChatScreen from './components/screens/ChatsScreen';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" exact Component={LandingScreen} />
        <Route path="/chats" exact Component={ChatScreen} />
        <Route path="/chats/:id" exact Component={ChatScreen} />
      </Routes>
    </div>
  );
}

export default App;