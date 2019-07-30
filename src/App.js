import React, { Component } from "react";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "read",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "world wide web!" },
      welcome: { title: "Welcome", desc: "Hello, React" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" }
      ]
    };
  }

  render() {
    console.log("App render");
    var _title,
      _desc,
      _article = <ReadContent title={_title} desc={_desc} />;

    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === "read") {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.tile;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function(_title, _desc) {
            this.max_content_id = this.max_content_id + 1;
            var newContents = Array.from(this.state.contents);
            newContents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc
            });
            this.setState({
              contents: newContents
            });
          }.bind(this)}
        />
      );
    }

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        />
        <TOC
          onChangePage={function(id) {
            this.setState({ mode: "read", selected_content_id: Number(id) });
          }.bind(this)}
          data={this.state.contents}
        />
        <Control
          onChangeMode={function(_mode) {
            this.setState({
              mode: _mode
            });
          }.bind(this)}
        />
        {_article}
      </div>
    );
  }
}

export default App;
