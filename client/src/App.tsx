import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/Toolbar/Toolbar.tsx';
import Artists from './features/artists/containers/Artists.tsx';
import { Route, Routes } from 'react-router-dom';
import Albums from './features/albums/containers/Albums.tsx';
import Tracks from './features/tracks/containers/Tracks.tsx';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';

const App = () => {
  return <>
    <CssBaseline />
    <header>
      <AppToolbar />
    </header>
    <main>
      <Container>
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/artist/:artistId/albums" element={<Albums />} />
          <Route path="/albums/:albumId/tracks" element={<Tracks />} />
          <Route path="*" element={<h1 style={{textAlign: "center"}}>404_Not found</h1>}/>
        </Routes>
      </Container>
    </main>
  </>;
};

export default App;
