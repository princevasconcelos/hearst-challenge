import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './components/Header';

interface AppProps {
  children?: JSX.Element;
}

const App = ({ children }: AppProps) => {
  return (
    <>
      <Header />
      <Container>
        <Box my={8} mt={14}>
          {children}
        </Box>
      </Container>
    </>
  );
};

export default App;
