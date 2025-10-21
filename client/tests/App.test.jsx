import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '@/App'; // Assuming App.jsx is in the src directory
import { act } from 'react';

describe('App login flow', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
    localStorage.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form initially', () => {
    render(<App />)
    expect(screen.getByText('🔐 Login')).toBeInTheDocument()
  })

  it('login success sets user and shows Dashboard', async () => {
    const mockUser = { name: 'Test User', email: 'test@ex.com', role: 'admin' }
    const mockToken = 'fake-token'
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ user: mockUser, token: mockToken })
    })

    render(<App />)

    fireEvent.change(screen.getByLabelText(/username/i), { target: { name: 'username', value: 'admin' }})
    fireEvent.change(screen.getByLabelText(/password/i), { target: { name: 'password', value: 'password123' }})

    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(screen.getByText(/📊 Dashboard/i)).toBeInTheDocument()
      expect(screen.getByText(`Welcome, ${mockUser.name}!`)).toBeInTheDocument()
    })

    // check token saved
    expect(localStorage.getItem('token')).toBe(mockToken)
  })

  it('login failure shows alert', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Invalid credentials' })
    })

    // spy on alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<App />)

    fireEvent.change(screen.getByLabelText(/username/i), { target: { name: 'username', value: 'wrong' }})
    fireEvent.change(screen.getByLabelText(/password/i), { target: { name: 'password', value: 'wrongpass' }})

    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Login failed: Invalid credentials')
    })

    alertSpy.mockRestore()
  })

  it('loading state disables login button and shows loading text', async () => {
    // simulate fetch pending by not resolving immediately
    let resolveFetch
    const fetchPromise = new Promise((resolve) => { resolveFetch = resolve })
    fetch.mockReturnValueOnce(fetchPromise)

    render(<App />)

    fireEvent.change(screen.getByLabelText(/username/i), { target: { name: 'username', value: 'admin' }})
    fireEvent.change(screen.getByLabelText(/password/i), { target: { name: 'password', value: 'password123' }})

    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    // During loading
    expect(screen.getByRole('button', { name: /logging in.../i })).toBeDisabled()

    // resolve fetch
    await act(async () => { resolveFetch({ ok: true, json: () => Promise.resolve({ user: { name: 'Name', email: 'e', role: 'r' }, token: 'tok' }) }) })

    // after
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /login/i })).not.toBeDisabled()
    })
  })
})
