import { compose, filter, join } from "ramda";
import { useMemo } from "react";
import { isNotNilAndEmpty } from "@octan/common";

export const useClassName = (...classNames: (string | undefined)[]): string => {
  const combinedClassName = useMemo(
    () => compose(
      join(' '),
      filter(isNotNilAndEmpty),
    )(classNames),
    classNames
  );

  return combinedClassName;
};
