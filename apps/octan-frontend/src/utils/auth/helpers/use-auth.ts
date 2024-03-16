import { isNil } from "ramda";
import { useEffect, useState } from "react";
import { checkIsLoggedIn } from "./checkIsLoggedIn";

export const useAuth = (requireLogin = true) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    if (checkIsLoggedIn()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      if (requireLogin) {
        document.location.href = "/login";
      }
    }
  }, [requireLogin]);

  return [isNil(isLoggedIn), isLoggedIn];
};
