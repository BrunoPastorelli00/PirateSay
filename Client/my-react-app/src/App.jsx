import './App.css';
import Logo from './Components/Logo';
import AddSongForm from './Components/AddSongForm';
import SearchBar from './Components/SearchBar';
import SongList from './Components/SongList';


function App() {
  return (
    <div style={{overflow:"hidden"}}>
    <Logo />
    <AddSongForm /> 
    <SearchBar />
    <div style={{overflow:"auto", position:"absolute", top: 0, left:0, right:0, bottom:0}}>
      <SongList />
    </div>
    </div>
  )
}

export default App;
