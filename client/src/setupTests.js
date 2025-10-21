import '@testing-library/jest-dom'

// Example: mock window.alert
global.alert = vi.fn()

// If fetch isn't present or you want a default mock:
if (!global.fetch) {
  global.fetch = vi.fn()
}

// You can also mock localStorage getItem/setItem if needed
// Example:
Storage.prototype.getItem = vi.fn()
Storage.prototype.setItem = vi.fn()
Storage.prototype.removeItem = vi.fn()
