import { isFunction } from "./isFunction";

export const isAsync = (func: (...params: unknown[]) => unknown) => isFunction(func) && func.constructor.name === "AsyncFunction";
