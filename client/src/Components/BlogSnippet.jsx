import React, { Component } from "react";
import sanitizeHtml from "sanitize-html";

class BlogSnippet extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div className="blog-posting">
          <div className="blog-title-section">
            <h1 className="blog-title ">
              <a href={"/blog/" + this.props.id}>{this.props.title}</a>
            </h1>

            <h4 className="blog-published-date">{this.props.published}</h4>
          </div>
          <hr className="title-hr" />
          <div className="content-wrapper">
            <div className="blog-description">
              <h4>{this.props.content}</h4>
            </div>
            <p>
              tags:{" "}
              {this.props.tags.map(tag => (
                <span className="badge badge-danger post-tag">
                  {
                    <a
                      className="post-tag-text"
                      href={"http://localhost:3000/blog?q=" + tag}
                    >
                      {tag}
                    </a>
                  }
                </span>
              ))}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BlogSnippet;
