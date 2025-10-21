import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Dashboard from '@/components/Dashboard'

describe('Dashboard', () => {
  beforeEach(() => {
    // reset fetch mock
    global.fetch = vi.fn()
    // reset or stub localStorage
    Storage.prototype.getItem = vi.fn(() => 'fake-token')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('shows stats when API responds successfully', async () => {
    const fakeStats = {
      totalUsers: 5,
      totalPosts: 10,
      totalViews: 100
    }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(fakeStats)
    })

    render(<Dashboard user={{ name: 'John', role: 'user', email: 'j@e.com' }} />)

    expect(screen.getByText(/📊 Dashboard/i)).toBeInTheDocument() 
    expect(screen.getByText(/Welcome to your dashboard/i)).toBeInTheDocument()
    
    // wait for stats to appear
    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
    })
  })

  it('handles API failure gracefully (does not crash, maybe shows zeros)', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}),
    });
  
    render(<Dashboard user={{ name: 'John', role: 'user', email: 'j@e.com' }} />);
  
    // Wait for the component to render and handle the API failure
    await waitFor(() => {
      // Assert that the '0' text is present in the document
      const totalUsers = screen.getByText('👥 Total Users').nextElementSibling;
      console.log("Total Users Element:", totalUsers);
      expect(totalUsers).toHaveTextContent('0');
    
     //expect(screen.queryAllByText('0').length).toBeGreaterThan(0)
      // Optionally, log the current DOM for debugging
      screen.debug();
    });
  });
  
})
