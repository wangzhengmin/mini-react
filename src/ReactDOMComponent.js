export function createElement(type, props) {
  return document.createElement(type);
}

export function setInitialProperties(domElement, tag, props) {
  for (let propKey in props) {
    const nextProp = props[propKey];
    if (propKey === "children") {
      if (typeof nextProp === "number" || typeof nextProp === "string") {
        domElement.textContent = nextProp;
      }
    } else if (propKey == "style") {
      for (let stylePropKey in nextProp) {
        domElement.style[stylePropKey] = nextProp[stylePropKey];
      }
    } else {
      domElement.setAttribute(propKey, nextProp);
    }
  }
}

/**
 * 比较新旧属性差异
 */
export function diffProperties(domElement, type, oldProps, newProps) {
  let updatePayload = null;
  let propKey;
  for (propKey in oldProps) {
    if (
      oldProps.hasOwnProperty(propKey) &&
      !newProps.hasOwnProperty(propKey)
    ) {
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }
  for (propKey in newProps) {
    const newProp = newProps[propKey];
    if (propKey === "children") {
      if (typeof newProp === "number" || typeof newProp === "string") {
        if (newProp != oldProps[propKey]) {
          (updatePayload = updatePayload || []).push(propKey, newProp);
        }
      }
    } else {
      if (newProp != oldProps[propKey]) {
        (updatePayload = updatePayload || []).push(propKey, newProp);
      }
    }
  }
  return updatePayload;
}

export function updateProperties(domElement, updatePayload) {
  for (let i = 0; i < updatePayload.length; i += 2) {
    const propKey = updatePayload[i];
    const propValue = updatePayload[i + 1];
    if (propKey === "children") {
      domElement.textContent = propValue;
    } else {
      if (propValue) {
        domElement.setAttribute(propKey, propValue);
      } else {
        domElement.removeAttribute(propKey);
      }
    }
  }
}
