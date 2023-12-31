import { useSession } from 'next-auth/react';

interface UseIsLoggedInProps {}

export const useIsLoggedIn = ({}: UseIsLoggedInProps = {}) => {
  const { status } = useSession();

  return status === 'authenticated';
};
