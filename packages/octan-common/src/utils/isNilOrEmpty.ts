import {
  isNil,
  isEmpty,
  anyPass
} from "ramda";

export const isNilOrEmpty = anyPass([isNil, isEmpty]);
