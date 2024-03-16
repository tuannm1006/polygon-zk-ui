import { isFunction } from './is-function';

export const getAllMethodNames = (obj: any): string[] => Object.getOwnPropertyNames(obj).filter(isFunction);