import { updateProperties } from "./ReactDOMComponent";
import { appendChild, removeChild, insertBefore } from "./ReactDOMHostConfig";
import { Placement } from "./ReactFiberFlags";
import { HostComponent, HostRoot } from "./ReactWorkTags";

export function getParentStateNode(fiber) {
  const parent = fiber.return;
  do {
    if (parent.tag === HostComponent) {
      return parent.stateNode;
    } else if (parent.tag === HostRoot) {
      return parent.stateNode.containerInfo;
    } else {
      parent = parent.return;
    }
  } while (parent);
}
/**
 * 插入节点
 * @param {*} nextEffect
 */
export function commitPlacement(nextEffect) {
  let stateNode = nextEffect.stateNode;
  let parentStateNode = getParentStateNode(nextEffect);
  let before = getHostSibling(nextEffect);
  if (before) {
    insertBefore(parentStateNode, stateNode, before);
  } else {
    appendChild(parentStateNode, stateNode);
  }
}

function getHostSibling(fiber) {
  let node = fiber.sibling;
  while (node) {
    // 找到最近一个不是插入的弟弟
    if (!(node.flags & Placement)) {
      return node.stateNode;
    }
    node = node.sbling;
  }
  return null;
}

/**
 * 更新节点
 * @param {*} current
 * @param {*} nextEffect
 */
export function commitWork(current, workInProgress) {
  const updatePayload = workInProgress.updateQueue;
  workInProgress.updatePayload = null;
  if (updatePayload) {
    updateProperties(workInProgress.stateNode, updatePayload);
  }
}

/**
 * 删除节点
 * @param {*} current
 */
export function commitDeletion(current) {
  if (!current) {
    return;
  }
  const parentStateNode = getParentStateNode(current);
  const stateNode = current.stateNode;
  removeChild(parentStateNode, stateNode);
}
