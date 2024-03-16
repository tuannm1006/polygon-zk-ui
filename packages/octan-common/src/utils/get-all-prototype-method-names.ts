import { getAllMethodNames } from "./get-all-method-names";

export const getAllPrototypeMethodNames = (obj: any): string[] => getAllMethodNames(Object.getPrototypeOf(obj)).filter(
  (property) => property !== "constructor"
);