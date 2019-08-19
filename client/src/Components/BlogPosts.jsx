import React, { Component } from "react";
import BlogSnippet from "./BlogSnippet";
import TagList from "./TagList";
import queryString from "query-string";

class BlogPosts extends Component {
  constructor(props) {
    super(props);
    this.getPosts = this.getPosts.bind(this);
    this.state = {
      posts: [],
      tag: ""
    };
  }

  componentDidMount() {
    const newtag = queryString.parse(this.props.location.search).q;
    if (newtag) {
      console.log(newtag);
      this.setState({ tag: newtag }, this.getPosts);
    } else {
      this.getPosts();
    }
  }

  getPosts() {
    //this is a stupid language
    const self = this;
    const path = `http://localhost:5002/blog?q=${self.state.tag}`;

    fetch(path, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({ posts: data.posts });
      });
  }

  render() {
    if (this.state.posts.length === 0) {
      return (
        <React.Fragment>
          <div>no post on sundays</div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="blog-page-container">
            <div className="blog-container">
              {this.state.posts.map(post => (
                <BlogSnippet
                  key={post.blogID}
                  id={post.blogID}
                  title={post.title}
                  published={post.published}
                  content={post.content}
                  tags={post.tags}
                />
              ))}
            </div>
            <TagList />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default BlogPosts;
