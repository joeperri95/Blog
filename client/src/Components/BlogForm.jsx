import React, { Component } from "react";

class BlogForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", tags: [], id: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    let res = window.confirm("Are you sure you want to submit?");
    if (res) {
      //get next available blog id then submit the post
      fetch("http://localhost:5002/count", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.setState({
            id: jsonData.count
          });

          fetch("http://localhost:5002/blog/" + this.state.id, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: this.state.title,
              content: this.state.content,
              tags: this.state.tags
            })
          });
        });
    }
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
    event.preventDefault();
  };

  handleContentChange = event => {
    this.setState({ content: event.target.value });
    event.preventDefault();
  };

  handleTagChange = event => {
    this.setState({ tags: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div id="top-row">
              <h2 id="blog-icon">Create New Blog Post</h2>
              <textarea
                className="title-textarea"
                rows="1"
                maxLength="200"
                required
                onChange={this.handleTitleChange}
                placeholder="Title"
              />
              <textarea
                className="tags-textarea"
                onChange={this.handleTagChange}
                placeholder="Comma separated tags"
                rows="1"
                maxLength="200"
              />
              <button className="btn btn-primary submit-button">Submit</button>
            </div>
            <br />
            <div>
              <textarea
                className="content-textarea"
                required
                onChange={this.handleContentChange}
                placeholder="Blog contents"
                rows="50"
              />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default BlogForm;
