import ReactDOM from "../src/react-dom.js";
import Component from "../src/Component.js";
import React  from "react";

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
  <div>
    hello word
    {/* <h1>hello word</h1>
    <a href="mini-react">mini-react</a>
    <ElButton content="el-button" />
    <ElInput content="el-input"/> */}
  </div>
);
