export function createElement(type,props) {
  return document.createElement(type)
}

export function  setInitialProperties(domElement,tag,props) {
  for(let propKey in props) {
    const nextProp = props[propKey];
    if(propKey === 'children') {
      if(typeof nextProp === 'number' ||typeof nextProp === 'string') {
        domElement.textContent = nextProp;
      }
    } else if(propKey == 'style') {
      for(let stylePropKey in nextProp) {
        domElement.style[stylePropKey] = nextProp[stylePropKey]
      }
    }else {

      domElement.setAttribute(propKey, nextProp)
    }
  }
}
