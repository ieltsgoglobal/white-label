/**
 * Retries an async operation until it returns a truthy value or the retry limit
 * is reached.
 *
 * Useful for situations where a value may not be immediately available due to
 * asynchronous initialization (e.g. IndexedDB writes, browser APIs, delayed
 * hydration, etc.).
 *
 * Example:
 * ```ts
 * const section = await retry(loadCurrentMockSection);
 * ```
 *
 * Retry behavior:
 * - Calls `fn()` immediately.
 * - If the result is falsy (`null`, `undefined`, `""`, `0`, `false`), waits
 *   `delay` milliseconds and tries again.
 * - Stops as soon as a truthy value is returned.
 * - Returns the final result even if all retries are exhausted.
 *
 * @template T The return type of the async function.
 * @param fn Async function to execute.
 * @param retries Maximum number of retry attempts after the initial call.
 * @param delay Delay in milliseconds between retries.
 * @returns The first truthy result, or the final result if retries are exhausted.
 */
export async function customAsyncRetryWrapper<T>(fn: () => Promise<T>, retries = 5, delay = 50): Promise<T> {
    let result = await fn();
    console.log("started")
    while (!result && retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        result = await fn();
        console.log(result)
        retries--;
    }

    return result;
}