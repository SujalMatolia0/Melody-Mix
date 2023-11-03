import { useSession } from 'next-auth/react';

export const useSes = () => {
  const { data, status, update } = useSession();

  return {
    session: data,
    sessionStatus: status,
    sessionUpdate: update,
  };
};
