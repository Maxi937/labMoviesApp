import React, { useContext } from "react";
import { Box } from "@mui/material";
import ActorCardOverlay from "./actorCardOverlay";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useImage from "../../hooks/useImage";
import Typography from "@mui/material/Typography";

const styles = {
  card: {
    maxWidth: 300,
  },
  media: {
    marginTop: 2,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 50,
    width: 150,
    height: 150,
  },
  box: (backgroundImage) => {
    const image = useImage(backgroundImage);

    return image
      ? {
          borderRadius: 5,
          boxShadow: 5,
          overflow: "hidden",
          zIndex: 1,
          display: "flex",
          position: "relative",
          width: 150,
          height: 200,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          "&::before": {
            animation: "blur 1s",
            "@keyframes blur": {
              "0%": { filter: "blur(8px)" },
              "100%": { filter: "blur(0px)" },
            },
            content: `""`,
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            transition: "filter 0.3s ease 0s",
          },
          "&:hover:before": {
            filter: "brightness(75%)",
          },
        }
      : {
          borderRadius: 5,
          boxShadow: 5,
          overflow: "hidden",
          zIndex: 1,
          display: "flex",
          position: "relative",
          width: 150,
          height: 200,
          backgroundColor: "white",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          animation: "blur 3s",
          "@keyframes blur": {
            "100%": { filter: "blur(8px)" },
            "0%": { filter: "blur(3px)" },
          },
        };
  },
  overlay: {
    display: "flex",
    flexDirection: "column",
    zIndex: 5,
    flex: 1,
    "&:hover": {
      cursor: "pointer",
    },
  },
};

export default function ActorCard({ actor, action, overrideClick}) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  function handleMouseOver() {
    setActive(true);
  }

  function handleMouseOut() {
    setActive(false);
  }

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if(overrideClick) {
      return overrideClick(actor)
    }
    return navigate(`/actor/${actor.id}`);
  }

  return (
    <>
      <Box onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} sx={styles.box(`https://image.tmdb.org/t/p/w500/${actor.profile_path}`)}>
        <Fade timeout={{ enter: 150, exit: 300 }} in={active}>
          <Box sx={styles.overlay}>
            <ActorCardOverlay actor={actor} action={action} />
          </Box>
        </Fade>
      </Box>
      <Typography variant="h6" component="p">
         {actor.character}
    </Typography>
    </>
  );
}
