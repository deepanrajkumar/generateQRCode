import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { parseTags, prettyPrint, sampleQR } from "../../helper";

const BhQr = () => {
  const phraseQR = (data, parent) => {
    return parseTags(data, parent);
  };

  const tagData = () => {
    const data = phraseQR(sampleQR);
    // prettyPrint(data);
    return data;
  };
  return (
    <Container>
      <Typography>Bharat Qr</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <pre>
            <code>{JSON.stringify(tagData(), null, 2)}</code>
          </pre>
        </Grid>
        <Grid item xs={6}>
          <Typography>New data</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BhQr;
