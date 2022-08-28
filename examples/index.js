import ReactDOM from "../src/react-dom.js";
import Component from "../src/Component.js";
import React from "../src/react";

class ElInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <input type="text" defaultValue={this.props.content} />;
  }
}

function ElButton(props) {
  return <button>{props.content}</button>;
}
ReactDOM.render(
  document.getElementById("app"),
  <div key="title" id="title">
    title
    {/* <h1>hello word</h1>
    <a href="mini-react">mini-react</a>
    <ElButton content="el-button" />
    <ElInput content="el-input"/> */}
  </div>
);

let updateBtn = document.getElementById("update");
updateBtn.addEventListener("click", function () {
  ReactDOM.render(
    document.getElementById("app"),
    <div key="title2" id="title2">
      title2
    </div>
  );
});

update2.addEventListener("click", function () {
  ReactDOM.render(
    document.getElementById("app"),
    <span key="title2" id="title2">
      title2
    </span>
  );
});
