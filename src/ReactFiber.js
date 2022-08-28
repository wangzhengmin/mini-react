import { NoFlags } from "./ReactFiberFlags";
import { HostComponent, HostRoot } from "./ReactWorkTags";

export function createHostRootFiber() {
  return createFiber(HostRoot);
}
/**
 *
 * @param {*} tag fiber标签
 * @param {*} pendingProps 等待生效的属性对象
 * @param {*} key
 */
export function createFiber(tag, pendingProps, key) {
  return new FiberNode(tag, pendingProps, key);
}

function FiberNode(tag, pendingProps, key) {
  this.tag = tag;
  this.pendingProps = pendingProps;
  this.key = key;
}

/**
 * 根据旧fiber 创建新fiber
 * @param {*} current
 * @param {*} pendingProps
 */
export function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate;
  if (!workInProgress) {
    workInProgress = createFiber(current.tag, pendingProps, current.key);
    workInProgress.type = current.type;
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
  }
  workInProgress.flags = NoFlags;
  workInProgress.child = null;
  workInProgress.sibling = null;
  workInProgress.updateQueue = current.updateQueue;
  // 副作用链表
  workInProgress.firstEffect =
    workInProgress.nextEffect =
    workInProgress.lastEffect =
      null;
  return workInProgress;
}
/**
 * 根据虚拟DOM元素创建fiber
 * @param {*} element
 */
export function createFiberFromElement(element) {
  const { key, type, props } = element;
  let tag;
  if (typeof type === "string") {
    tag = HostComponent;
  }
  const fiber = new FiberNode(tag, props, key);
  fiber.type = type;
  return fiber;
}
