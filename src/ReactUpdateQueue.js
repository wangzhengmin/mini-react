/**
 * 初始化更新队列，更新队列是一个环状链表
 * 所有的fiber都会等待更新内容放在更新队列中
 */
export function initializeUpdateQueue(fiber) {
  const updateQueue = {
    shared: {
      pending: null,
    },
  };
  fiber.updateQueue = updateQueue;
}

export function createUpdate() {
  return {};
}

/**
 * 向当前的fiber的更新队列中添加一个更新
 * @param {1} fiber
 * @param {*} update
 */
export function enqueueUpdate(fiber, update) {
  let updateQueue = fiber.updateQueue;
  const sharedQueue = updateQueue.shared;
  const pending = sharedQueue.pending;
  // 构成环状链表
  if (!pending) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  sharedQueue.pending = update; // pending 永远指向最新的更新，pending.next 指向第一个更新。
}
