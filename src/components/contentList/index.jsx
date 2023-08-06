import React from "react";
import Content from "../contentCard";
import Grid from "@mui/material/Grid";

const ContentList = ( {content, action }) => {
  let contentCards = content.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={2} xl={1}>
      <Content key={m.id} content={m} action={action} />
    </Grid>
  ));
  return contentCards;
};

export default ContentList;