'use strict'

const assert = require('assert')
const xor = require('buffer-xor')
const randomBytes = require('randombytes')

module.exports = OneTimePad
function OneTimePad (key) {
  assert(Buffer.isBuffer(key), 'key must be buffer')

  return {
    encrypt: function (plaintext) {
      assert(Buffer.isBuffer(plaintext), 'plaintext must be buffer')
      assert(plaintext.length <= key.length, 'plaintext cannot be longer than key')

      return xor(plaintext, key)
    },
    decrypt: function (ciphertext) {
      assert(Buffer.isBuffer(ciphertext), 'ciphertext must be buffer')
      assert(ciphertext.length <= key.length, 'ciphertext cannot be longer than key')

      return xor(ciphertext, key)
    }
  }
}

OneTimePad.generateKey = function (keyLength) {
  assert(Number.isSafeInteger(keyLength), 'keyLength must be safe integer')

  return randomBytes(keyLength)
}
