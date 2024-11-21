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

test('Login form submits and navigates correctly', async () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthProvider>
  );

  
  fireEvent.change(screen.getByPlaceholderText('Username'), {
    target: { value: 'testUser' },
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: 'testPassword' },
  });

  fireEvent.click(screen.getByText('Login'));

  
  await waitFor(() => expect(window.location.pathname).toBe('/'));
});

test('Login form does not submit with empty fields', async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );
  
    fireEvent.click(screen.getByText('Login'));
  
    expect(screen.getByPlaceholderText('Username').value).toBe('');
    expect(screen.getByPlaceholderText('Password').value).toBe('');
});
  