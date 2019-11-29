import TreeNode from "./TreeNode.js";

class ExpressionAnalyzer {
    constructor () {
        window.alert('Expression Analyzer is Loaded');
        this._preOrderStack = [];
        this._resolveStack = [];
    }

    convertExpressionToTree (ExpressionString) {
        let cleanExpression = this._clearExpression(ExpressionString);
        console.log(cleanExpression);
        let expressionArray = this._separateOperatorsAndValues(cleanExpression);
        console.log(expressionArray);
        let arbol = this._generateExpressionTree(expressionArray);

        return arbol;
    }

    _generateExpressionTree(expressionArray) {
        let stack1 = [];
        let stack2 = [];
        for (let i = 0; i < expressionArray.length; i++) {
            if (!isNaN(expressionArray[i]) || expressionArray[i] === '+' || expressionArray[i] === '-') {
                stack1.push(new TreeNode(expressionArray[i]));
                console.log(stack1[0]);
            } else if (expressionArray[i] === '*' || expressionArray[i] === '/') {
                let lCh = stack1.pop();
                let rCh = new TreeNode(expressionArray[i+1]);
                let Ft = new TreeNode(expressionArray[i], lCh, rCh);
                console.log(Ft);
                stack1.push(Ft);
                i++;
                console.log(stack1);
            }
        }

        for (let i = 0; i < stack1.length; i++) {
            if (stack1[i].value === '+' || stack1[i].value === '-') {
                let lCh = stack2.pop();
                let rCh = stack1[i+1];
                stack1[i].leftChild = lCh;
                stack1[i].rightChild = rCh;
                stack2.push(stack1[i]);
                i++;
                console.log(stack2);
            } else {
                stack2.push(stack1[i]);
            }
        }

        return stack2[0];
    }

    _clearExpression (ExpressionString) {
        let cleanExpression = ExpressionString.replace(/[\. ,:]+/g, "");
        cleanExpression = cleanExpression.replace(/[a-z]+/g, "");
        cleanExpression = cleanExpression.replace(/[A-Z]+/g, "");

        return cleanExpression;
    }

    _separateOperatorsAndValues (ExpressionString) {
        let expressionArray = new Array(ExpressionString.length);
        let arrayPos = 0;
        for (let i = 0; i < ExpressionString.length; i++){
            if (!isNaN(ExpressionString[i])) {
                expressionArray[arrayPos] === undefined ?
                    expressionArray[arrayPos] = ExpressionString[i] : expressionArray[arrayPos] += ExpressionString[i];
                if (isNaN(ExpressionString[i+1])) arrayPos++;
            } else {
                expressionArray[arrayPos] = ExpressionString[i];
                arrayPos++;
            }
        }

        return expressionArray;
    }

    resolveTree = (tree) => {
        let stack = [];
        this._preOrderArray(tree);
        console.log(this._preOrderStack)
        let nodes = this._preOrderStack.length;

        for (let i = 0; i < nodes; i++) {
            let currentChar = this._preOrderStack.pop();
            if (isNaN(currentChar)) {
                let res = this._operate(currentChar, stack.pop(), stack.pop());
                stack.push(res);
            } else {
                stack.push(Number(currentChar));
            }
            //console.log(stack)
        }

        //console.log(stack[0]);
        return stack[0];
    };

    _operate = (operator, value1, value2) => {
        switch (operator) {
            case '-':
                return value1 - value2;

            case '+':
                return  value1 + value2;

            case '*':
                return value1 * value2;

            case '/':
                return value1 / value2;
        }
    };


    // Pre, In, Pos order functions
    getPreOrderElements = (tree) => {
        return this._preOrder(tree);
    };

    _preOrder (root) {
        let strElements = '';
        strElements += root.value;
        if (root.leftChild !== null) {
            strElements += this._preOrder(root.leftChild);
        }
        if (root.rightChild !== null) {
            strElements += this._preOrder(root.rightChild);
        }
        return strElements;
    };

    _preOrderArray = (root) => {
        this._preOrderStack.push(root.value);
        if (root.leftChild !== null) {
            this._preOrderArray(root.leftChild);
        }
        if (root.rightChild !== null) {
            this._preOrderArray(root.rightChild);
        }
    };

    getInOrderElements = (tree) => {
        return this._inOrder(tree);
    };

    _inOrder (root) {
        let strElements = '';
        if (root.leftChild !== null) {
            strElements += this._inOrder(root.leftChild);
        }
        strElements += root.value;
        if (root.rightChild !== null) {
            strElements += this._inOrder(root.rightChild);
        }
        return strElements;
    };

    getPostOrderElements = (tree) => {
        return this._postOrder(tree);
    };

    _postOrder (root) {
        let strElements = '';
        if (root.leftChild !== null) {
            strElements += this._postOrder(root.leftChild);
        }
        if (root.rightChild!== null) {
            strElements += this._postOrder(root.rightChild);
        }
        strElements += root.value;
        return strElements;
    };

}

export default ExpressionAnalyzer;