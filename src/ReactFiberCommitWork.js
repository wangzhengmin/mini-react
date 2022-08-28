import { updateProperties } from "./ReactDOMComponent";
import { appendChild, removeChild } from "./ReactDOMHostConfig";
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
  appendChild(parentStateNode, stateNode)
}

/**
 * 更新节点
 * @param {*} current 
 * @param {*} nextEffect 
 */
export function commitWork(current, workInProgress) {
  const updatePayload = workInProgress.updateQueue;
  workInProgress.updatePayload = null;
  if(updatePayload) {
    updateProperties(workInProgress.stateNode, updatePayload)
  }
}

/**
 * 删除节点
 * @param {*} current 
 */
export function commitDeletion(current) {
  if(!current) {
    return;
  }
  const parentStateNode = getParentStateNode(current);
  const stateNode = current.stateNode
  removeChild(parentStateNode, stateNode)
}