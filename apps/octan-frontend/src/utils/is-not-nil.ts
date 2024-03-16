import {
  compose,
  not,
  isNil
} from "ramda";

export const isNotNil = compose(not, isNil);
