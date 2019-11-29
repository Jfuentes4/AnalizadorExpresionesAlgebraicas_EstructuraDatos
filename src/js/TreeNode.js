class TreeNode {
    constructor(value, leftChild = null, rightChild = null) {
        this._value = value;
        this._leftChild = leftChild;
        this._rightChild = rightChild;
    }

    get value () {
        return this._value;
    }

    get leftChild () {
        return this._leftChild;
    }

    get rightChild () {
        return this._rightChild;
    }

    set leftChild (value) {
        this._leftChild = value;
    }

    set rightChild (value) {
        this._rightChild = value;
    }
}

export default TreeNode;