import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/Toolbar/Toolbar.tsx';
import Artists from './features/artists/containers/Artists.tsx';

const App = () => {
  return <>
    <CssBaseline />
    <header>
      <AppToolbar />
    </header>
    <main>
      <Container>
        <Artists />
      </Container>
    </main>
  </>;
};

export default App;
