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

  // BST.remove(7)

  // console.log(thirdLargest(BST))

  // console.log(isBalanced(BST))

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
  // console.log(isBst(BST))
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


// 8.) Balanced BST

function isBalanced(t, top=true) { //top=true tells us its the first iteration
  if (!t) {
    return 0 //base case is 0
  }
  let countR = isBalanced(t.right, false) //calling function for left and right
  let countL = isBalanced(t.left, false) //we specifiy top=false because it's not the first iteration
  if (countL === false|| countR === false) { //if we have found the tree to be unbalanced at any level, it will return false
    return false                             //so if line 204 is ever true, 201 will evaluate true every loop after
  }
  if (countL > countR+1 || countR > countL+1) {//checks if the tree is unbalanced
    return false
  }
  if (top === true) return true //if we are in the first iteration of the function, and the tree was never found to be unbalanced, we return true
  if (countL > countR) { //returning the height of the tree
    return countL + 1
  } else {
    return countR + 1
  }
}

function sameBST(arr1, arr2) {
  if(arr1.length === 0 || arr2.length === 0) { //base case, if we got here, they match
    return true
  }
  if (arr1.length !== arr2.length) return false //if different lengths, we know it's false
  let root1=arr1[0] //root is first value in each array
  let root2=arr2[0]
  if (root1 !== root2) return false //if root values don't match, trees don't match
  let higherNums1 = [] //546
  let higherNums2 = [] //546
  let lowerNums1 = [] //102 
  let lowerNums2 = [] //120
  for (let i=1; i< arr1.length; i++) { 
    if (arr1[i] > root1) higherNums1.push(arr1[i])//push numbers higher than root to one array
    if (arr1[i] < root1) lowerNums1.push(arr1[i])//push numbers lower than root to one array
  }
  for (let i=1; i< arr2.length; i++) {
    if (arr2[i] > root1) higherNums2.push(arr2[i])
    if (arr2[i] < root1) lowerNums2.push(arr2[i])
  }
  const higherCheck = sameBST(higherNums1, higherNums2)
  const lowerCheck = sameBST(lowerNums1, lowerNums2)
  if (higherCheck === true && lowerCheck === true) return true
  return false
}

console.log(sameBST([3,5,4,6,1,0,2],[3,1,5,2,4,6,0]))

//           3
//         1   5
//       0  2 4 6 
//
//           3
//        1     5
//       0 2   4 6
//
//