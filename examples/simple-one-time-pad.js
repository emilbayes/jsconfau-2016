'use strict'

const xor = require('buffer-xor')

var encrypt = onetimepad
var decrypt = onetimepad
function onetimepad (key, text) {
  return xor(key, text)
}

// Example
var plaintext = Buffer.from('I like dogs')
var keyA = Buffer.from([0x01, 0x3d, 0xe2, 0xc8, 0x5a, 0x25, 0xd1, 0x45, 0x79, 0x8f, 0xf3])

var ciphertext = encrypt(keyA, plaintext)

// Plausible key, but not the right one
var keyB = Buffer.from([0x01, 0x3d, 0xe2, 0xc8, 0x5a, 0x25, 0xd1, 0x42, 0x77, 0x9c, 0xf3])
decrypt(keyB, ciphertext) // I like cats
