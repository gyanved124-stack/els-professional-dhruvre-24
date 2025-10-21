const bcrypt = require('bcryptjs')

/**
 * Generate a bcrypt hash for a plaintext password.
 * @param {string} password - Plaintext password.
 * @param {number} [saltRounds=10] - Cost factor (10-12 is common; higher => slower but more secure).
 * @returns {Promise<string>} - The bcrypt hash to store in DB.
 */
async function hashPassword(password, saltRounds = 10) {
  if (typeof password !== 'string' || password.length === 0) {
    throw new Error('Password must be a non-empty string')
  }
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

/**
 * Compare a plaintext password with a stored bcrypt hash.
 * @param {string} password - Plaintext password to check.
 * @param {string} hash - Stored bcrypt hash from DB.
 * @returns {Promise<boolean>} - true if match, false otherwise.
 */
async function comparePassword(password, hash) {
    console.log('Comparing password:', password, 'with hash:', hash)
  if (typeof password !== 'string' || typeof hash !== 'string') {
    throw new Error('Invalid arguments to comparePassword')
  }
  console.log('Starting bcrypt comparison')
  const isMatch = await bcrypt.compare(password, hash)
    console.log('Bcrypt comparison result:', isMatch)
  return isMatch
}

module.exports = { hashPassword, comparePassword }
