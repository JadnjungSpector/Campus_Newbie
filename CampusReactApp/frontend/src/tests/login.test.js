<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> baa32106a (addded review filtering)
=======
>>>>>>> baa32106a (addded review filtering)
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../views/ui/Login';
import { AuthProvider } from '../contexts/AuthContext';
import { UserProvider } from '../views/ui/UserContext';
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 6be43a322 (figuring out lint)
// see if above needs to be deleted

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';
import { AuthProvider } from '../contexts/AuthContext';
beforeAll(() => {
    global.MutationObserver = class {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {}
      disconnect() {}
    };
  }); 
<<<<<<< HEAD
>>>>>>> 6be43a322 (figuring out lint)
=======
>>>>>>> baa32106a (addded review filtering)
=======
>>>>>>> baa32106a (addded review filtering)

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
=======
>>>>>>> 6be43a322 (figuring out lint)

describe('Login Component', () => {
  it('should display error message on failed login', async () => {
    // Mock the fetch function to simulate a failed login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Login failed' }),
      })
    );

    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <Login />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Login failed')).toBeInTheDocument();
    });
  });

  it('should navigate to profile on successful login', async () => {
    // Mock the fetch function to simulate a successful login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'fake-token' }),
      })
    );

    render(
      <MemoryRouter>
        <AuthProvider>
          <UserProvider>
            <Login />
          </UserProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/profile');
    });
  });
});