import { apiUrl } from '../config/api';
import { clearAuthSession, setAuthSession } from '../utils/storage';

const DEMO_USERS = {
  admin: { password: 'password123', role: 'admin', redirectTo: '/admin' },
  client: { password: 'password123', role: 'client', redirectTo: '/client' },
};

export const loginUser = async ({ username, password }) => {
  const trimmedUsername = username?.trim() || '';

  if (!trimmedUsername || !password) {
    throw new Error('Username and password are required.');
  }

  const demoAccount = DEMO_USERS[trimmedUsername];
  if (demoAccount && password === demoAccount.password) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setAuthSession({ token: 'demo-token', role: demoAccount.role });
    return {
      token: 'demo-token',
      role: demoAccount.role,
      redirectTo: demoAccount.redirectTo,
    };
  }

  let response;
  try {
    response = await fetch(apiUrl('/api/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: trimmedUsername, password }),
    });
  } catch {
    throw new Error(
      'Failed to connect to server. Ensure your database is running, or use admin / password123 or client / password123'
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  const role = data.role || 'client';
  setAuthSession({ token: data.token, role });

  return {
    ...data,
    role,
    redirectTo: role === 'admin' ? '/admin' : '/client',
  };
};

export const logoutUser = () => {
  clearAuthSession();
};

