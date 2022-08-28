import { mountChildFibers, recondilerChildFibers } from "./ReactChildFiber";
import { shouldSetTextContent } from "./ReactDOMHostConfig";
import { HostComponent, HostRoot } from "./ReactWorkTags";

/**
 * 创建当前fiber的子fiber
 */
export function beginWork(current, workInProgress) {
  switch (workInProgress.tag) {
    case HostRoot: {
      return updateHostRoot(current, workInProgress);
    }
    case HostComponent: {
      return updateHostComponent(current, workInProgress);
    }
  }
}

/**
 * 更新或者挂载根节点
 * @param {*} current
 * @param {*} workInProgress
 */
function updateHostRoot(current, workInProgress) {
  const updateQueue = workInProgress.updateQueue;
  const nextChildren = updateQueue.shared.pending.paylod.element;
  // 处理子节点，根据老fiber和新的虚拟DOM，创建新的fiber
  recondilerChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function updateHostComponent(current, workInProgress) {
  const type = workInProgress.type; // 原生组件类型
  const nextProps = workInProgress.pendingProps;
  let nextChildren = nextProps.children;

  // 如果原生组件只有一个子节点，并且该节点为文本节点,则不会创建fiber
  let isDirectTextChild = shouldSetTextContent(type, nextProps);
  if(isDirectTextChild) {
    nextChildren = null;
  }
  recondilerChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}


function recondilerChildren(current, workInProgress, nextChildren) {
  // 更新还是挂载
  if (current) {
    workInProgress.child = recondilerChildFibers(
      workInProgress,
      current && current.child,
      nextChildren
    );
  } else {
    workInProgress.child = mountChildFibers(
      workInProgress,
      current && current.child,
      nextChildren
    );
  }
}
