import { createWorkInProgress } from "./ReactFiber";

let workInProgressRoot = null; // 当前正在更新的根
let workInProgress = null; // 当前正在更新的fiber

export function scheduleUpdateOnFiber(fiber) {
  const fiberRoot = markUpdateLaneFromFiberToRoot(fiber);
  performSyncWorkOnRoot(fiberRoot);
}

function performSyncWorkOnRoot(fiberRoot) {
  workInProgressRoot = fiberRoot;
  workInProgress = createWorkInProgress(workInProgressRoot.current);
  console.log(workInProgress)
} 

function markUpdateLaneFromFiberToRoot(sourceFiber) {
  let node = sourceFiber;
  let parent = node.return;
  while(parent) {
    node = parent;
    parent = parent.return;
  }
  return node.stateNode;
}
