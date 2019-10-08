class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key
    this.value = value
    this.parent = parent
    this.left = null
    this.right = null
  }
  insert(item) {
    if (this.key === null) {
      this.key = item.key
    } else if (item.key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(item.key, item.value, this)
      } else {
        this.left.insert(item)
      }
    } else if (item.key > this.key) {
      if (this.right === null) {
        this.right = new BinarySearchTree(item.key, item.value, this)
      } else {
        this.right.insert(item)
      }
    } else if (item.key === this.key) {
      this.value = item.value
    }
  }
  remove(key) {
    if (this.key === null) {
      return null
    } else if (key < this.key) {
      this.left.remove(key)
    } else if (key > this.key) {
      this.right.remove(key)
    } else if (key === this.key) {
      //found the key
      if (this.left && this.right) {
        //if there are two children
        const rightMin = this.right._findMin() //find the smallest key on the right side
        this.key = rightMin.key
        this.value = rightMin.value
        this.right.remove(rightMin.key)
      } else if (this.left) {
        //if there is only a left child
        this.left.parent = this.parent
        if (this.parent.left === this) this.parent.left = this.left
        if (this.parent.right === this) this.parent.right = this.left
      } else if (this.right) {
        //if there is only a right child
        this.right.parent = this.parent
        if (this.parent.left === this) this.parent.left = this.right
        if (this.parent.right === this) this.parent.right = this.right
      } else {
        //if there are no children
        if (this.parent.left === this) this.parent.left = null
        if (this.parent.right === this) this.parent.right = null
      }
    }
  }

  find(key) {
    if (key === this.key) {
      return this.value
    } else if (key < this.key) {
      return this.left.find(key)
    } else if (key > this.key) {
      return this.right.find(key)
    }
  }
  _findMin() {
    if (this.left === null) {
      return this
    }
    return this.left._findMin()
  }
}

function main() {
  let BST = new BinarySearchTree()
  BST.insert({ key: 3, value: null })
  BST.insert({ key: 1, value: null })
  BST.insert({ key: 4, value: null })
  BST.insert({ key: 6, value: null })
  BST.insert({ key: 9, value: null })
  BST.insert({ key: 2, value: null })
  BST.insert({ key: 5, value: 'something' })
  BST.insert({ key: 7, value: null })

  BST.remove(7)

  console.log(thirdLargest(BST))

  // BST.insert({key: 'E', value: null})
  // BST.insert({key: 'A', value: null})
  // BST.insert({key: 'S', value: null})
  // BST.insert({key: 'Y', value: null})
  // BST.insert({key: 'Q', value: null})
  // BST.insert({key: 'U', value: null})
  // BST.insert({key: 'E', value: null})
  // BST.insert({key: 'S', value: null})
  // BST.insert({key: 'T', value: null})
  // BST.insert({key: 'I', value: null})
  // BST.insert({key: 'O', value: null})
  // BST.insert({key: 'N', value: null})

  // console.log(bstHeight(BST))
  console.log(isBst(BST))
}

main()

// 4.)
// tree(t) adds all values in a tree
function tree(t) {
  // base case stop recursion if null
  if (!t) {
    return 0
  }
  // runs to the left adds the values of left and right and current
  return tree(t.left) + t.value + tree(t.right)
}

// 5.)
// Height of BST
function bstHeight(bst) {
  // run until null
  if (!bst) {
    return 0
  }
  let countL = bstHeight(bst.left)
  let countR = bstHeight(bst.right)
  // add one each recursion
  if (countL > countR) {
    return countL + 1
  } else {
    return countR + 1
  }
}

// 6.) Is it a BST?
function isBst(bst) {
  if (!bst) {
    return true
  }
  if (bst.right !== null && bst.right.key < bst.key) {
    // console.log('Right Key:',bst.right.key)
    return false
  }
  if (bst.left !== null && bst.left.key > bst.key) {
    // console.log('Left Key:',bst.left.key)
    return false
  }
  const bstL = isBst(bst.left)
  const bstR = isBst(bst.right)
  if (bstL && bstR) {
    return true
  } else {
    return false
  }
}

// 7.) 3rd largest node
function thirdLargest(bst) {
  let largest = findLargest(bst)
  if (largest.left) {
    if (largest.left.right) {
      return largest.left.right
    }
    if (largest.left.left) {
      return largest.left.left
    } else {
      return largest.parent
    }
  } else {
    if(largest.parent &&largest.parent.left){
      return largest.parent.left
    } else {
      return largest.parent.parent
    }
  }
}

function findLargest(bst) {
  if (bst.right === null) {
    return bst
  }
  return findLargest(bst.right)
}


