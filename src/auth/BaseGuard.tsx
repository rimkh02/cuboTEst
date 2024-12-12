/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from 'react';
// routes
import { PATH_PAGE } from 'src/routes/paths';
import { useNavigate } from 'react-router';
// redux
import { useSelector } from 'src/redux/store';

type GuardProps = {
  children: ReactNode;
};

const BaseGuard = ({ children }: GuardProps) => {
  const { user, refresh } = useSelector((state: any) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      if (user?.passwordResetRequired) {
        navigate(PATH_PAGE.ResetPasswordPage);
      }
    }
  }, [user, refresh]);

  return <>{children}</>;
};

export default BaseGuard;
