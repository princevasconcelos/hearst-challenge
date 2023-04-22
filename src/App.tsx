import { useEffect, useState } from 'react';
import { Counter } from './features/counter/Counter';
// import { getCatList } from './services/thecatapi'
import './App.css';
// import CatList from './components/CatList';
import Card from './components/Card'
import MOCK from './MOCK_BREEDS.json'

function App() {
  const [catList, setCatList] = useState([])

  // const getData = async () => {
  //   const { data } = await getCatList()

  //   console.log('prince', data)
  // }


  // useEffect(() => {
  //   getData()
  // }, [])
  return (
    <main>
      {MOCK.map(cat => <Card {...cat} isSimple={true} />)}
    </main>
  );
}

export default App;
