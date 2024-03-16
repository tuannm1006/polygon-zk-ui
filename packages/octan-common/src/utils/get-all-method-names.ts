import { isFunction } from './isFunction';

export const getAllMethodNames = (obj: any): string[] => Object.getOwnPropertyNames(obj).filter(isFunction);