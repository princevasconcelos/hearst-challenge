import { useParams } from 'react-router-dom';

function App() {
    const { detailsId } = useParams();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Details page</h1>
        <h2>{detailsId}</h2>
      </header>
    </div>
  );
}

export default App;
