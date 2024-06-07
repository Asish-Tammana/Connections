import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingScreen from './components/screens/LandingScreen';
import ChatScreen from './components/screens/ChatsScreen';

const App = () => {
  return (
    <Routes>
      <Route path="/" exact Component={LandingScreen} />
      <Route path="/chats" exact Component={ChatScreen} />
    </Routes>
  );
}

export default App;