import { useAppContext } from './../../../contexts/app-context/app-context';
import { useEffect } from 'react';
export const useLoggedInGuard = () => {
  const { loggedIn } = useAppContext()

  useEffect(() => {
    if (loggedIn) return

    document.location.href = "/login";
  }, [loggedIn])
}