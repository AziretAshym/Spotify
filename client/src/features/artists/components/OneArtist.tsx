import * as React from 'react';
import Grid from '@mui/material/Grid2';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { apiUrl } from '../../../globalConstants.ts';
import NoPictureImage from '../../../assets/NoPictureImage.jpeg';

interface Props {
  _id: string;
  name: string;
  image?: string | null;
  info?: string | null;
}

const OneArtist: React.FC<Props> = ({ _id, name, image, info }) => {
  const artistImage = image ? `${apiUrl}/${image}` : NoPictureImage;

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Card
        sx={{
          width: 350,
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
        }}
        key={_id}
      >
        <CardMedia
          component="img"
          image={artistImage}
          title={name}
          sx={{
            height: 200,
            borderRadius: "16px 16px 0 0"
          }}
        />
        <CardHeader
          title={
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontWeight: 600
              }}
            >
              {name}
            </Typography>
          }
        />
        <CardContent
          sx={{
            flexGrow: 1,
            padding: "16px",
            overflow: "hidden",
          }}
        >
          <Typography color="text.secondary">
            {info || "No info."}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "flex-end",
            padding: "8px 16px"
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "primary.main",
              color: "#fff",
            }}
          >
            <ArrowForward />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default OneArtist;
