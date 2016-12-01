'use strict'
const assert = require('assert')

function mod (n, p) {
  assert(Number.isSafeInteger(n), 'n must be safe integer')
  assert(Number.isSafeInteger(p), 'p * 2 must be safe integer')
  assert(p > 0, 'p must be positive')
  return ((n % p) + p) % p
}

module.exports = caesarCipher
function caesarCipher (key) {
  assert(Number.isSafeInteger(key), 'key must be safe integer')
  var alphabetSize = 0b1111111 // 7 bits = 127 to keep in ascii

  function shift (n) {
    return function (byte) {
      return mod(byte + n, alphabetSize)
    }
  }

  return {
    encrypt: function (plaintext) {
      assert(Buffer.isBuffer(plaintext), 'plaintext must be buffer')
      return plaintext.map(shift(key))
    },
    decrypt: function (ciphertext) {
      assert(Buffer.isBuffer(ciphertext), 'ciphertext must be buffer')
      return ciphertext.map(shift(-key))
    }
  }
}

// Example usage with Cæsar' popular shift of 3
var cipher = caesarCipher(3)

var cipherText = cipher.encrypt(Buffer.from('Hello JSConf AU 2016'))

console.log(cipherText.toString())

console.log(cipher.decrypt(cipherText).toString())
