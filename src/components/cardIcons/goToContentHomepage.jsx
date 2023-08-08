import React, { useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";

const GoToContentHomepage = ({ content, fontSize="large" }) => {
  return (
    <a href={content.homepage}>
      <HomeIcon color="primary" fontSize={fontSize} />
    </a>
  );
};

export default GoToContentHomepage;
