import React, { Component } from "react";
import sanitizeHtml from "sanitize-html";

class BlogPost extends Component {
  constructor(props) {
    super(props);
    console.log("wtf m8");
    this.getPosts = this.getPosts.bind(this);
    this.state = {
      blogID: this.props.match.params.blogID,
      title: "",
      published: "",
      content: "",
      tags: [],
      isLoaded: false,
      exists: false
    };
  }

  componentDidMount() {
    this.getPosts();
    this.setState({ isLoaded: true });
  }

  getPosts() {
    //this is a stupid language
    const self = this;
    const path = `http://localhost:5002/blog/${self.state.blogID}`;
    console.log(path);
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
        if (data === "") {
          self.setState({ exists: false });
        } else {
          self.setState({
            title: data.title,
            published: data.published,
            content: data.content,
            tags: data.tags,
            exists: true
          });
        }
      });
  }

  tidy() {}

  render() {
    if (this.state.isLoaded === false) {
      return <div>Loading</div>;
    } else {
      if (this.state.exists === false) {
        return <div>post does not exist</div>;
      } else {
        let newContent = this.state.content.replace(
          /(?:\r\n|\r|\n)/g,
          "<br />"
        );
        newContent = this.state.content.replace(" ", "&nbsp");

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
                <h1 className="blog-title ">{this.state.title}</h1>

                <h4 className="blog-published-date">{this.state.published}</h4>
              </div>
              <hr className="title-hr" />
              <div className="content-wrapper">
                <div
                  className="content"
                  dangerouslySetInnerHTML={sanitize(newContent)}
                />
                <p>
                  tags:{" "}
                  {this.state.tags.map(tag => (
                    <span className="badge badge-danger post-tag">{tag}</span>
                  ))}
                </p>
              </div>
            </div>
          </React.Fragment>
        );
      }
    }
  }
}

export default BlogPost;
