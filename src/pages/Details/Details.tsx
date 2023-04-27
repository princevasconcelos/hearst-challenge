import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Card from '../../components/Card'
import Container from '@mui/material/Container';
import { useAppSelector } from '../../app/hooks';
import { selectBreeds, selectFavourites, Cat } from '../../features/cat/catSlice'

function App() {
    const { id } = useParams();
    const breeds = useAppSelector(selectBreeds)
    const favourites = useAppSelector(selectFavourites)
    const selected = breeds.find(breed => breed.id === id) as Cat
    const isFavourite = favourites.find(fav => fav.image_id === selected.image?.id)

    useEffect(() => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])
  
  return (
    <Container fixed>
        <Card {...selected} expanded={true} isFavourite={Boolean(isFavourite)} />
      </Container>
  );
}

export default App;
