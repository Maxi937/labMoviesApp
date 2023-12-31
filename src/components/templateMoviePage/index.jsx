import React, { useContext } from "react";
import ContentHeader from "../headerContent";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { getMoviePostersQuery } from "../../hooks/useMovieQueries";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: "100vh",
  },
};

const TemplateMoviePage = ({ movie, children, userMovie = false }) => {
  if (!userMovie) {
    const { data, error, isLoading, isError } = useQuery(["images", movie.id], async () => await getMovieImages(movie.id));

    if (isLoading) {
      return <Spinner />;
    }

    if (isError) {
      return <h1>{error.message}</h1>;
    }
    const images = data.posters;

    return (
      <>
        <ContentHeader content={movie} />
        <Grid container spacing={5} style={{ padding: "15px" }}>
          <Grid item xs={3}>
            <div sx={styles.gridListRoot}>
              <ImageList cols={1}>
                {images.map((image, index) => {
                  if (index > 8) {
                    return;
                  }
                  return (
                    <ImageListItem key={image.file_path} sx={styles.gridListTile} cols={1}>
                      <img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt={image.poster_path} />
                    </ImageListItem>
                  );
                })}
              </ImageList>
            </div>
          </Grid>

          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>
      </>
    );
  }

  const { data, error, isLoading, isError } = getMoviePostersQuery(movie.id);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data;

  return (
    <>
      <ContentHeader content={movie} />
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div sx={styles.gridListRoot}>
            <ImageList cols={1}>
              {images.map((image) => (
                <ImageListItem key={image} sx={styles.gridListTile} cols={1}>
                  <img src={image} alt={image} />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
