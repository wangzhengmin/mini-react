import { createInstance, finalizeInitialChildren, prepareUpdate } from "./ReactDOMHostConfig";
import { Update } from "./ReactFiberFlags";
import { HostComponent } from "./ReactWorkTags";

export function completeWork(current, workInProgress) {
  const newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case HostComponent: {
      if (current && workInProgress.stateNode) {
        updateHostComponent(
          current,
          workInProgress,
          workInProgress.tag,
          newProps
        );
      } else {
        const { type } = workInProgress;
        // 创建真实don
        const instance = createInstance(type, newProps);
        workInProgress.stateNode = instance;
        // 给真实DOM添加属性
        finalizeInitialChildren(instance, type, newProps);
      }

      break;
    }
  }
}
/**
 * 
 * @param {*} current 
 * @param {*} workInProgress 
 * @param {*} type 
 * @param {*} newProps 
 */
function updateHostComponent(current, workInProgress, type, newProps) {
  let oldProps = current.memoizedProps;
  // 可复用的真实DOM
  const instance = workInProgress.stateNode;
  const updatePayload = prepareUpdate(instance,type,oldProps, newProps);
  // 不同fiber updateQueue 不一样， 根fiber updateQueue 是一个环状链表， HostComponent 是一个数组
  workInProgress.updateQueue = updatePayload;
  if(updatePayload) {
    workInProgress.flags |= Update;
  }

}
