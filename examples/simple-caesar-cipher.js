'use strict'

function mod (n, p) {
  return ((n % p) + p) % p
}

// Cæsar Cipher
var key = 3
function encrypt (plaintext) {
  return plaintext.map(function (byte) {
    return mod(byte + key, 256)
  })
}

function decrypt (ciphertext) {
  return ciphertext.map(function (byte) {
    return mod(byte + key, 256)
  })
}

// Encrypting message
var plaintext = Buffer.from('I like cats')
var ciphertext = encrypt(plaintext)

console.log('Cipher Text: ', ciphertext.toString())
console.log('Recovered Plain Text: ', decrypt(ciphertext).toString())

// Frequency analysis of Robinson Crusoe from Project Gutenberg
var fs = require('fs')
var crusoe = fs.readFileSync('./crusoe.txt')
console.log('Length of book: ', crusoe.length)

var freq = require('buffer-byte-frequency')
console.log(freq(encrypt(crusoe)))
