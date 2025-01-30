import * as React from 'react';
import Grid from '@mui/material/Grid2';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { ArrowForward, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../../globalConstants.ts';
import NoPictureImage from '../../../assets/NoPictureImage.jpeg';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteArtist, fetchArtists, publishArtist } from '../artistsThunks';
import { selectUser } from '../../users/usersSlice.ts';
import { selectArtists, selectPublishLoading } from '../artistsSlice.ts';

interface Props {
  _id: string;
  name: string;
  image?: string | null;
  info?: string | null;
  isPublished: boolean;
  onDelete: (artistId: string) => void;
  deleteLoading: boolean;
}

const OneArtist: React.FC<Props> = ({ _id, name, image, info, isPublished, onDelete, deleteLoading }) => {
  const artistImage = image ? `${apiUrl}/${image}` : NoPictureImage;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const publishLoading = useAppSelector(selectPublishLoading);
  const artists = useAppSelector(selectArtists);



  const artist = artists.find((artist) => artist._id === _id);
  const currentIsPublished = (artist && artist.isPublished !== undefined) ? artist.isPublished : isPublished;

  const navigateToAlbums = () => {
    navigate(`/artist/${_id}/albums`);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteArtist(_id)).unwrap();
      onDelete(_id);
      await dispatch(fetchArtists());
    } catch (e) {
      console.error(e);
    }
  };

  const handlePublish = async () => {
    try {
      await dispatch(publishArtist(_id)).unwrap();
      await dispatch(fetchArtists());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: 350,
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
        key={_id}
      >
        <CardMedia
          component="img"
          image={artistImage}
          title={name}
          sx={{
            height: 200,
            borderRadius: "16px 16px 0 0",
          }}
        />
        <CardHeader
          title={
            <Typography variant="h6" sx={{ textAlign: "center", fontWeight: 600 }}>
              {name}
            </Typography>
          }
        />
        <CardContent sx={{ flexGrow: 1, padding: "16px", overflow: "hidden" }}>
          <Typography color="text.secondary">{info || "No info."}</Typography>
          <Typography
            color={currentIsPublished ? "success" : "error"}
          >
            {!currentIsPublished ? "Unpublished" : "Published"}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", padding: "8px 16px" }}>
          {user?.role === "admin" && (
            <>
              <IconButton sx={{ backgroundColor: "error.main", color: "#fff" }} onClick={handleDelete} disabled={deleteLoading}>
                <Delete />
              </IconButton>
              <Button
                variant="contained"
                color={currentIsPublished ? "error" : "success"}
                onClick={handlePublish}
                disabled={publishLoading}
              >
                {currentIsPublished ? "Unpublish" : "Publish"}
              </Button>
            </>
          )}
          <IconButton sx={{ backgroundColor: "primary.main", color: "#fff" }} onClick={navigateToAlbums}>
            <ArrowForward />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};


export default OneArtist;