import React, { useContext, useQuery } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Star } from "@mui/icons-material";

const styles = {
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  bottomBar: {
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
    color: "white",
    padding: 2,
  },
  bottomBarRight: {
    marginLeft: "auto",
  },
  topBar: {
    display: "flex",
  },
  topLeft: {
    padding: 2,
    alignItems: "baseline",
    display: "flex",
  },
  topRight: {
    marginLeft: "auto",
    gap: 2,
    display: "flex",
    textAlign: "center",
  },
  star: {
    color: "yellow",
    fontSize: 15,
  },
};

export default function ActorCardOverlay({ actor, action }) {
  return (
    <>
      <Box sx={styles.topBar}>
        <Box sx={styles.topRight}>
            {action(actor)}
        </Box>
      </Box>
      <Box sx={styles.bottomBar}>
        <Typography variant="h6" component="p">
         {actor.name}
        </Typography>
      </Box>
    </>
  );
}
