import { createHostRootFiber } from "./ReactFiber";
import {initializeUpdateQueue}from "./ReactUpdateQueue"

export function createFiberRoot(containerInfo) {
  const fiberRoot = {containerInfo}; // 指容器对象
  // fiber 树的根节点
  const hostRootFiber = createHostRootFiber();
  fiberRoot.current = hostRootFiber;
  hostRootFiber.stateNode = fiberRoot; // stateNode 代表真实dom节点

  // 初始化更新队列
  initializeUpdateQueue(hostRootFiber);
  return fiberRoot
}