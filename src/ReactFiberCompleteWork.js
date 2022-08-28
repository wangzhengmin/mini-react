import { createInstance, finalizeInitialChildren } from "./ReactDOMHostConfig";
import { HostComponent } from "./ReactWorkTags";

export function completeWork(current, workInProgress) {
  const newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case HostComponent: {
      const { type } = workInProgress;
      // 创建真实don
      const instance = createInstance(type, newProps);
      workInProgress.stateNode = instance;
      // 给真实DOM添加属性
      finalizeInitialChildren(instance, type, newProps);
      break;
    }
  }
}
