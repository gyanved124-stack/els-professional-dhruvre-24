import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '@/components/LoginForm';
import { vi } from 'vitest';

describe('LoginForm', () => {
  it('renders username, password, and login button', () => {
    render(<LoginForm onLogin={vi.fn()} loading={false} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('disables inputs and button when loading is true', () => {
    render(<LoginForm onLogin={vi.fn()} loading={true} />);
    expect(screen.getByLabelText(/username/i)).toBeDisabled();
    expect(screen.getByLabelText(/password/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /logging in/i })).toBeDisabled();
  });

  it('calls onLogin with credentials when form submitted', () => {
    const mockOnLogin = vi.fn();
    render(<LoginForm onLogin={mockOnLogin} loading={false} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { name: 'username', value: 'admin' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });

    fireEvent.click(submitButton);

    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnLogin).toHaveBeenCalledWith({
      username: 'admin',
      password: 'password123',
    });
  });
});
