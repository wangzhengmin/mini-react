import { createFiberFromElement, createWorkInProgress } from "./ReactFiber";
import { Deletion, Placement } from "./ReactFiberFlags";
import { REACT_ELEMENT_TYPE } from "./ReactSymbols";

function childReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    // 是否需要跟踪副作用
    if (!shouldTrackSideEffects) {
      return;
    }
    // 将自己的这个父作用添加到父effectList中
    // 删除类型的副作用一般放在父fiber副作用链表的前面
    const lastEffect = returnFiber.lastEffect;
    if (lastEffect) {
      lastEffect.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }
    // 清空下一个副作用指向
    childToDelete.nextEffect = null;
    // 标记清楚
    childToDelete.flags = Deletion;
  }

  /**
   * 删除当前fiber及后续fiber
   * @param {*} returnFiber
   * @param {*} childToDelete
   */
  function deleteRemainingChildren(returnFiber, childToDelete) {
    while (childToDelete) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
  }
  function useFiber(oldFiber, pendingProps) {
    return createWorkInProgress(oldFiber, pendingProps);
  }
  /**
   * 协调单节点
   * @param {*} returnFiber // 新的父fiber
   * @param {*} currentFirstChild  // 旧的fiber
   * @param {*} element  新的虚拟DOM
   * @returns
   */
  function reconcilerSingElement(returnFiber, currentFirstChild, element) {
    let key = element.key;
    let child = currentFirstChild;
    // 如果有旧fiber
    while (child) {
      // key 相同则复用旧的fiber
      if (key === child.key) {
        // 判断type是否相同
        if (child.type === element.type) {
          // 复用旧fiber，删除剩下的fiber
          deleteRemainingChildren(returnFiber, child.sibling);
          const existing = useFiber(child, element.props);
          existing.return = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        // 删除旧fiber
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    const created = createFiberFromElement(element);
    created.return = returnFiber;
    return created;
  }

  function placeSingleChild(newFiber) {
    // 是否需要添加副作用，并且新fiber没有alternate
    if (shouldTrackSideEffects && !newFiber.alternate) {
      newFiber.flags = Placement;
    }
    return newFiber;
  }
  /**
   * 如果新虚拟DOM 是一个数组
   * @param {*} returnFiber
   * @param {*} currentFirstChild
   * @param {*} newChild
   */
  function reconcilerChildrenArray(returnFiber, currentFirstChild, newChild) {
    let resultingFirstChild = null; // 将要返回的第一个新fiber
    let previousNewFiber = null; // 上一个新fiber
    let oldFiber = currentFirstChild; // 第一个老fiber
    let newIndex = 0; // 新虚拟DOM索引
    if(!oldFiber) {
      for(;newIndex < newChild.length;newIndex++) {
        const newFiber = createChild(returnFiber, newChild[newIndex]);
        // newFiber.flags = Placement;
        if(!previousNewFiber) {
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber
      }
    }
    return resultingFirstChild;
  }

  function createChild(returnFiber, newChild) {
    const created = createFiberFromElement(newChild);
    created.return = returnFiber;
    return created;
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
    if (Array.isArray(newChild)) {
      return reconcilerChildrenArray(returnFiber, currentFirstChild, newChild);
    }
  }
  return recondilerChildFibers;
}

export const mountChildFibers = childReconciler(false);
export const recondilerChildFibers = childReconciler(true);
