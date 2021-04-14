import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import ItemsList from "./components/items-list.component";
import EditItem from "./components/edit-items.component";
import CreateItem from "./components/create-items.component";
import CreateUser from "./components/create-user.component";

// change folder structure to Backend and Frontend

function App() {
  return (
    <Router>

      <Navbar />
      <br/>
      <Route path="/" exact component={ItemsList} />
      <Route path="/edit/:id" component={EditItem} />
      <Route path="/create" component={CreateItem} />
      <Route path="/user" component={CreateUser} />

    </Router>
  );
}

export default App;