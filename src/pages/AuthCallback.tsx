import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleGithubCallback, error } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      handleGithubCallback(code)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Authentication failed:', error);
          navigate('/login');
        });
    }
  }, [searchParams, handleGithubCallback, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Authentication failed. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
    </div>
  );
}