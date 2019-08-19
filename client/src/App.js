import React from "react";

import BlogForm from "./Components/BlogForm";
import BlogPosts from "./Components/BlogPosts";
import NavBar from "./Components/NavBar";
import my404 from "./Components/my404";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import TagList from "./Components/TagList";
import BlogPost from "./Components/BlogPost";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/newpost" exact component={BlogForm} />
          <Route path="/blog/:blogID" component={BlogPost} />
          <Route path="/" exact component={BlogPosts} />
          <Route path="/blog" exact component={BlogPosts} />
          <Route path="/tags" exact component={TagList} />
          <Route component={my404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
