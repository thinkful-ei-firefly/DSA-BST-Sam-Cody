class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key=key
    this.value=value
    this.parent=parent
    this.left=null
    this.right=null
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
      
    } else if (item.key > this.key){
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
      } else if (key > this.key){
        this.right.remove(key)
    } else if (key === this.key) {//found the key
      if (this.left && this.right) { //if there are two children
        const rightMin = this.right._findMin() //find the smallest key on the right side
        this.key = rightMin.key
        this.value = rightMin.value
        this.right.remove(rightMin.key)
      } else if (this.left) { //if there is only a left child
        this.left.parent = this.parent
        if (this.parent.left === this) this.parent.left = this.left
        if (this.parent.right === this) this.parent.right = this.left
      } else if (this.right) { //if there is only a right child
        this.right.parent = this.parent
        if (this.parent.left === this) this.parent.left = this.right
        if (this.parent.right === this) this.parent.right = this.right
      } else { //if there are no children
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
  BST.insert({key: 3, value: null})
  BST.insert({key: 1, value: null})
  BST.insert({key: 4, value: null})
  BST.insert({key: 6, value: null})
  BST.insert({key: 9, value: null})
  BST.insert({key: 2, value: null})
  BST.insert({key: 5, value: 'something'})
  BST.insert({key: 7, value: null})

  BST.remove(2)

  console.log(BST.find(5))

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

  // console.log(BST)
}

main()