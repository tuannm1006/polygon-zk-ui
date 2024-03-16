import {
  compose,
  not
} from "ramda";
import { isNilOrEmpty } from "./is-nil-or-empty";

export const isNotNilAndEmpty = compose(not, isNilOrEmpty);
