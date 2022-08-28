import { updateContainer } from "./ReactFiberReconciler";
import { createFiberRoot } from "./ReactFiberRoot";

function render(container, vnode) {
  let fiberRoot = createFiberRoot(container);
  updateContainer(vnode, fiberRoot)
  // const node = createNode(vnode);

  // container.appendChild(node);
}

// 创建真实dom节点
function createNode(vnode) {
  let { type } = vnode;
  let node;
  if (typeof type === "string") {
    node = updateHostComponent(vnode);
  } else if (typeof type === "function") {
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = updateTextComponent(vnode);
  }
  return node;
}

// 处理原生标签
function updateHostComponent(vnode) {
  let { type, props } = vnode;
  const node = document.createElement(type);
  updateNode(node, props);
  reconclieChildren(node, props.children);
  return node;
}

// 处理文本节点
function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// 处理函数组件
function updateFunctionComponent(vnode) {
  const { type, props } = vnode;
  const vvnode = type(props);
  const node = createNode(vvnode);
  return node;
}

// 处理class 组件
function updateClassComponent(vnode) {
  const { type, props } = vnode;
  const instance = new type(props);
  const vvnode = instance.render();
  const node = createNode(vvnode);
  return node;
}

// 处理字节点
function reconclieChildren(node, children) {
  if (!children) return;

  children = Array.isArray(children) ? children : [children];

  children.forEach((child) => {
    render(node, child);
  });
}

// 更新属性
function updateNode(node, nextVal) {
  Object.keys(nextVal).forEach((key) => {
    if (key !== "children") {
      node.setAttribute(key, nextVal[key]);
    }
  });
}

export default {
  render,
};
