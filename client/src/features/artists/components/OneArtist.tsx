import * as React from 'react';
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { apiUrl } from '../../../globalConstants.ts';
import NoPictureImage from '../../../assets/NoPictureImage.jpeg'
import { Link } from 'react-router-dom';

interface Props {
  _id: string;
  name: string;
  image?: string | null;
  info?: string | null;
}
const OneArtist: React.FC<Props> = ({_id, name, image, info}) => {
  let artistImage = NoPictureImage;

  if (image) {
    artistImage = apiUrl + "/" + image;
  }



  return (
    <>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
        <Card>
          <CardHeader title={name} />
          <CardMedia
            style={{ width: "100%" }}
            component="img"
            image={artistImage}
            title={name}
          />

          <CardContent>
            <p>{info}</p>
          </CardContent>
          <CardActions>
            <IconButton component={Link} to={"/artist/" + _id}>
              <ArrowForward />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default OneArtist;