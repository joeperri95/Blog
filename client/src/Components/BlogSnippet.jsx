import React, { Component } from "react";
import sanitizeHtml from "sanitize-html";

class BlogSnippet extends Component {
  state = {};

  render() {
    {
      /* replace newline with line breaks */
    }

    let newContent = this.props.content.replace(/(?:\r\n|\r|\n)/g, "<br />");
    newContent = this.props.content.replace(" ", "&nbsp");

    const defaultOptions = {
      allowedTags: ["b", "i", "em", "strong", "a", "br", "h1"],
      allowedAttributes: {
        a: ["href"]
      }
    };

    const sanitize = dirty => ({
      __html: sanitizeHtml(dirty, defaultOptions)
    });

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
            <div
              className="content"
              dangerouslySetInnerHTML={sanitize(newContent)}
            />
            <p>
              tags:{" "}
              {this.props.tags.map(tag => (
                <span className="badge badge-danger post-tag">{tag}</span>
              ))}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BlogSnippet;
