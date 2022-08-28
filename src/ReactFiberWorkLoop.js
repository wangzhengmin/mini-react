import { createWorkInProgress } from "./ReactFiber";
import { beginWork } from "./ReactFiberBeginWork";
import { commitDeletion, commitPlacement, commitWork } from "./ReactFiberCommitWork";
import { completeWork } from "./ReactFiberCompleteWork";
import { Deletion, Placement, Update } from "./ReactFiberFlags";

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
  commitRoot();
}

function commitRoot() {
  const finishedWork = workInProgressRoot.current.alternate;
  workInProgressRoot.finishedWork = finishedWork;
  commitMutationEffects(workInProgressRoot);
}

function commitMutationEffects(root) {
  const finishedWork = root.finishedWork;
  let nextEffect = finishedWork.firstEffect;
  let effectList = "";
  while (nextEffect) {
    effectList += `(${getFlags(nextEffect.flags)}#${nextEffect.type}#${nextEffect.key})`;
    const flags = nextEffect.flags;
    let current = nextEffect.alternate;
    if(flags === Placement) {
      commitPlacement(nextEffect);
    } else if(flags === Update) {
      commitWork(current,nextEffect)
    } else if(flags === Deletion)  {
      commitDeletion(nextEffect)
    }
    nextEffect = nextEffect.nextEffect;
  }
  effectList += "null";
  // console.log(effectList);
  // console.log(workInProgressRoot);
  root.current = finishedWork;
}

/**
 * 自上而下构建新的fiber树
 */
function workLoopSync() {
  while (workInProgress) {
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
  if (next) {
    workInProgress = next;
  } else {
    workInProgress = next;
    // 如果当前fiber 没有子fiber，则处理完成
    completeUnitOfWork(unitOfWork);
  }
}

function completeUnitOfWork(unitOfWork) {
  let completedWork = unitOfWork;
  do {
    const current = completedWork.alternate;
    const returnFiber = completedWork.return;
    completeWork(current, completedWork);
    // 收集副作用
    collectEffectList(returnFiber, completedWork);
    const siblingFiber = completedWork.sibling;
    if (siblingFiber) {
      workInProgress = siblingFiber;
      return;
    }
    // 循环到最后， 根fiber的return 为null
    completedWork = returnFiber;
    workInProgress = completedWork;
  } while (workInProgress);
}
/**
 * 收集副作用链
 * @param {*} returnFiber
 * @param {*} completedWork
 */
function collectEffectList(returnFiber, completedWork) {
  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = completedWork.firstEffect;
    }
    // 当前fiber是否有lastEffect
    if (completedWork.lastEffect) {
      // 父fiber是否有lastEffect
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completedWork.firstEffect;
      }
      returnFiber.lastEffect = completedWork.lastEffect;
    }

    const flags = completedWork.flags;
    if (flags) {
      // 父fiber是否存在副作用
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completedWork;
      } else {
        returnFiber.firstEffect = completedWork;
      }
      returnFiber.lastEffect = completedWork;
    }
  }
}
function markUpdateLaneFromFiberToRoot(sourceFiber) {
  let node = sourceFiber;
  let parent = node.return;
  while (parent) {
    node = parent;
    parent = parent.return;
  }
  return node.stateNode;
}

function getFlags(flag) {
  switch(flag) {
    case Placement:{
      return "添加"
    }
    case Update:{
      return "更新"
    }
  }
}
