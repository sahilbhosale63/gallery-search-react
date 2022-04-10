import './App.css';
import Search from './components/Search';
import PhotoResponseState from './context/PhotoResponseState';

function App() {
  return (
    <div className="App">
      <PhotoResponseState>
        <Search />
      </PhotoResponseState>
    </div>
  );
}

export default App;
