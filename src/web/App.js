import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Home from "./routes/Home";
import Upi from "./routes/Upi";
import BhQr from "./routes/BHQr";
import { AppBar, Container, Tab, Tabs } from "@material-ui/core";

const App = () => {
  const [value, setValue] = useState(1);

  const handleTabChange = (event, newValues) => {
    setValue(newValues);
  };
  return (
    <Router>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Tabs value={value} onChange={handleTabChange} centered={true}>
            <Tab label="Home" value={1} to="/" component={Link} />
            <Tab label="Upi QR" value={2} to="upi" component={Link} />
            <Tab label="Bharat QR" value={3} to="bqr" component={Link} />
          </Tabs>
        </AppBar>
        <Switch>
          <Route path="/bqr">
            <BhQr />
          </Route>
          <Route path="/upi">
            <Upi />
          </Route>
          <Route path="/">
            <BhQr />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
