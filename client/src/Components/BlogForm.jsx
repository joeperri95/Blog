import React, { Component } from "react";

class BlogForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", description: "", tags: [], id: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
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
              tags: this.state.tags,
              description: this.state.description
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
    event.preventDefault();
  };

  handleDescChange = event => {
    this.setState({ description: event.target.value });
    event.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="title-section">
            <h1>Create New Blog Post</h1>
          </div>
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <label className="label" for="title-input">
                  Title:
                </label>
                <div className="content">
                  <input
                    id="title-input"
                    className="form-input"
                    rows="1"
                    maxLength="200"
                    required
                    onChange={this.handleTitleChange}
                    placeholder="Title"
                  />
                </div>
              </div>
              <div className="row">
                <label className="label" for="description-input">
                  Description:
                </label>
                <div className="content">
                  <input
                    id="description-input"
                    className="form-input"
                    maxLength="200"
                    required
                    onChange={this.handleDescChange}
                    placeholder="Enter a short description"
                  />
                </div>
              </div>
              <div className="row">
                <label className="label" for="tags-input">
                  Tags:
                </label>
                <div className="content">
                  <input
                    id="tags-input"
                    className="form-input"
                    onChange={this.handleTagChange}
                    placeholder="Comma Separated Tags"
                    maxLength="200"
                  />
                </div>
              </div>
              <div className="row ">
                <h2 className="title-section">Enter blog contents below</h2>
              </div>
              <div className="">
                <textarea
                  id="blog-textarea"
                  required
                  onChange={this.handleContentChange}
                  placeholder="Blog contents"
                  rows="50"
                />
              </div>

              <div className="row">
                <label id="preview-label" className="">
                  <b>Preview and submit post</b>
                </label>
                <button className="btn btn-primary submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BlogForm;
