import { RootState } from '../store/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectedLayout({
  children,
  authentication = true,
}: {
  children: React.ReactNode;
  authentication?: boolean;
}) {
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate('/login');
    } else if (!authentication && authStatus !== authentication) {
      navigate('/');
    }
    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? null : <>{children}</>;
}

export default ProtectedLayout;
