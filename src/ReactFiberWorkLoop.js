import { createWorkInProgress } from "./ReactFiber";
import { beginWork } from "./ReactFiberBeginWork";

let workInProgressRoot = null; // 当前正在更新的根
let workInProgress = null; // 当前正在更新的fiber

export function scheduleUpdateOnFiber(fiber) {
  const fiberRoot = markUpdateLaneFromFiberToRoot(fiber);
  performSyncWorkOnRoot(fiberRoot);
}

function performSyncWorkOnRoot(fiberRoot) {
  workInProgressRoot = fiberRoot;
  workInProgress = createWorkInProgress(workInProgressRoot.current);
  workLoopSync();
} 

/**
 * 自上而下构建新的fiber树
 */
function workLoopSync() {
  while(workInProgress) {
    performUnitOfWork(workInProgress);
  }
}

/**
 * 执行单个工作单元
 * @param {*} workInProgress 单个fiber
 */
function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate;
  // 开始构建当前fiber的子fiber链表，会返回下一个要处理的fiber
  let next = beginWork(current, unitOfWork);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  if(next) {
    workInProgress = next;
  } else {
    workInProgress = next;
    console.log("completeWork")
    // 如果当前fiber 没有子fiber，则处理完成
    // completeWork(unitOfWork)
  }
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
