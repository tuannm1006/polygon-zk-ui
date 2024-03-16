import {
  compose,
  not
} from "ramda";
import { isNilOrEmpty } from "./isNilOrEmpty";

export const isNotNilAndEmpty = compose(not, isNilOrEmpty);
