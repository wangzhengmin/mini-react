import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";
import { createUpdate, enqueueUpdate } from "./ReactUpdateQueue";

/**
 * 把虚拟DOM变成真实DOM插入到container容器中
 * @param {*} element 
 * @param {*} container 
 */
export function updateContainer(element,container) {
  const current = container.current;
  const update  = createUpdate();
  update.payload = {element};
  enqueueUpdate(current, update);
  scheduleUpdateOnFiber(current);
}