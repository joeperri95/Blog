import React, { Component } from "react";
import Tag from "./Tag";

class TagList extends Component {
  constructor(props) {
    super(props);
    this.getTags = this.getTags.bind(this);
    this.state = {
      tags: []
    };
  }

  componentDidMount() {
    this.getTags();
  }

  getTags() {
    //this is a stupid language
    const self = this;
    fetch("http://localhost:5002/tags", {
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
        self.setState({ tags: data.tags });
      });
  }

  render() {
    if (this.state.tags.length === 0) {
      return <React.Fragment>no tags, no cry</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <div className="tags-container">
            <div className="tags-container-title">
              <h2>Categories</h2>
              <hr />
            </div>
            <div className="tags-section">
              {this.state.tags.map(tag => (
                <Tag
                  key={tag.tagname}
                  tagname={tag.tagname}
                  count={tag.count}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default TagList;
