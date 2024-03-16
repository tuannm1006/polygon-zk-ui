import { createElement, lazy } from 'react';

const defaultComponentName = 'default';

export const lazyLoadThenCreateElement = (loadFunction: () => Promise<any>, componentName = defaultComponentName) =>
  createElement(lazy(() => componentName === defaultComponentName ? loadFunction() : loadFunction().then((module) => ({ default: module[componentName] }))));
