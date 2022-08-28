import { createElement,diffProperties,setInitialProperties } from "./ReactDOMComponent";

export function shouldSetTextContent(type,props) {
  return typeof props.children === "string" || typeof props.children === "number";
}
export function createInstance(type,props){
  return createElement(type,props)
}
export function finalizeInitialChildren(domElement, type, props) {
  setInitialProperties(domElement,type,props)
}

export function appendChild(parentInstance, child) {
  parentInstance.appendChild(child)
}

export function removeChild(parentInstance, child) {
  parentInstance.removeChild(child)
}


export function prepareUpdate(domElement,type,oldProps,newProps) {
  return diffProperties(domElement,type,oldProps,newProps)
}
