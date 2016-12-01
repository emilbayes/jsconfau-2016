'use strict'

const sodium = require('sodium-native')

function hash (input) {
  var output = Buffer.allocUnsafe(sodium.crypto_generichash_BYTES)
  sodium.crypto_generichash(output, input)
  return output
}










const tuple = require('tuple-encoding')

function Block (parents, data) {
  this.parents = parents
  this.data = data

  this.codec = tuple(['parents'].concat(Object.keys(data).sort()))
}

Block.prototype.hash = function () {
  return hash(this.toBuffer())
}

Block.prototype.toBuffer = function () {
  return this.codec.encode(this)
}





















const sorted = require('sorted-array-functions')
const copy = require('deep-assign')
const topoSort = require('toposort')

function MerkleDAG () {
  this.heads = []
  this.blocks = {}
}

MerkleDAG.prototype.append = function (data) {
  var b = new Block(this.heads, data)
  var bHash = b.hash().toString('hex')
  this.heads = [bHash]
  this.blocks[bHash] = b
}

MerkleDAG.prototype.add = function (parents, data) {
  var self = this
  parents.forEach(function (parentHash) {
    if (self.blocks[parentHash] === undefined)
      throw new Error('Invalid parent')
  })

  var b = new Block(parents, data)
  var bHash = b.hash().toString('hex')
  sorted.add(this.heads, bHash)
  this.blocks[bHash] = b
}














MerkleDAG.prototype.sendReplica = function () {
  return copy({}, this.blocks)
}

MerkleDAG.prototype.receiveReplica = function (receivedBlocks) {
  var blockHashes = Object.keys(receivedBlocks)
  var relations = blockHashes.reduce(function (memo, blockHash) {
    receivedBlocks[blockHash].parents.forEach(function (parentHash) {
      memo.push([blockHash, parentHash])
    })

    return memo
  }, [])

  var order = topoSort.array(blockHashes, relations)
  var self = this

  order.forEach(function (blockHash) {
    if (self.blocks[blockHash] !== undefined) return

    var block = receivedBlocks[blockHash]

    block.parents.forEach(function (parentHash) {
      if (self.blocks[parentHash] === undefined)
        throw new Error('Missing parent')

      sorted.remove(self.heads, parentHash)
    })

    self.blocks[blockHash] = block
    sorted.add(self.heads, blockHash)
  })
}












var chain = new MerkleDAG()

chain.append({
  test: 'Hello world'
})

chain.append({
  test: 'Hello world'
})

var clone = new MerkleDAG()

clone.append({
  test: 'Hello world'
})

clone.receiveReplica(chain.sendReplica())

console.dir(clone.sendReplica(), { color: true, depth: null })
