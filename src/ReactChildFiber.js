import { createFiberFromElement } from "./ReactFiber";
import { Placement } from "./ReactFiberFlags";
import { REACT_ELEMENT_TYPE } from "./ReactSymbols";

function childReconciler(shouldTrackSideEffects) {
  function reconcilerSingElement(returnFiber, currentFirstChild, element) {
    const created = createFiberFromElement(element);
    created.return = returnFiber;
    return created;
  }

  function placeSingleChild(newFiber) {
    // 是否需要添加副作用，并且新fiber没有alternate
    if(shouldTrackSideEffects && !newFiber.alternate) {
      newFiber.flags = Placement;
    }
    return newFiber;
  }

  /**
   *
   * @param {*} returnFiber 新的父fiber
   * @param {*} currentFirstChild 老的第一个子fiber
   * @param {*} newChild 新的虚拟DOM
   */
  function recondilerChildFibers(returnFiber, currentFirstChild, newChild) {
    // 如果是一个对象说明是单节点
    const isObject = typeof newChild === "object" && newChild;
    if (isObject) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          return placeSingleChild(
            reconcilerSingElement(returnFiber, currentFirstChild, newChild)
          );
        }
      }
    }
  }
  return recondilerChildFibers;
}

export const mountChildFibers = childReconciler(true);
export const recondilerChildFibers = childReconciler(false);
