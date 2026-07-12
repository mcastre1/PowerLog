// queue.ts

let queue: Promise<any> = Promise.resolve();

export function enqueue<T>(task: () => Promise<T>): Promise<T> {
  queue = queue.then(() => task());
  return queue;
}
