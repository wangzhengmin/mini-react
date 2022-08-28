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
  <ul>
    <li key="A">A</li>
    <li key="B">B</li>
    <li key="C">C</li>
    <li key="D">D</li>
    <li key="E">E</li>
    <li key="F">F</li>
  </ul>
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
update3.addEventListener("click", function () {
  ReactDOM.render(
    document.getElementById("app"),
    <ul>
      <li key="B">B</li>
    </ul>
  );
});
update4.addEventListener("click", function () {
  ReactDOM.render(
    document.getElementById("app"),
    <ul>
      <li key="A">A</li>
      <p key="B">P2</p>
      <li key="C">C2</li>
    </ul>
  );
});
update5.addEventListener("click", function () {
  ReactDOM.render(
    document.getElementById("app"),
    <ul>
      <li key="A">A</li>
    <li key="B">B</li>
    <li key="C">C</li>
    <li key="D">D</li>
    </ul>
  );
});

update6.addEventListener("click", function () {
  ReactDOM.render(
    document.getElementById("app"),
    <ul>
      <li key="A">A</li>
    <li key="B">B</li>
    </ul>
  );
});
update7.addEventListener("click", function () {
  ReactDOM.render(
    document.getElementById("app"),
    <ul>
    <li key="A">A</li>
    <li key="C">C</li>
    <li key="E">E</li>
    <li key="B">B</li>
    <li key="G">G</li>
    <li key="D">D</li>
    </ul>
  );
});

