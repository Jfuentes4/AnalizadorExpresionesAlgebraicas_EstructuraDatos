import ExpressionAnalyzer from './ExpressionAnalyzer.js';

class Main {
    constructor () {
        this._analyzer = new ExpressionAnalyzer();
        document.getElementById('btnResolve').addEventListener('click', this._showResults);
    }

    _showResults = () => {
        let expression = document.getElementById('expresion').value;
        //let tree = this._analyzer.convertExpressionToTree('30+6/A k2-f99dDF/Df9d* 2');
        if (expression.includes(/0-9/)) {
            let tree = this._analyzer.convertExpressionToTree(expression);

            let preOrderExpression = this._analyzer.getPreOrderElements(tree);
            let inOrderExpression = this._analyzer.getInOrderElements(tree);
            let postOrderExpression = this._analyzer.getPostOrderElements(tree);
            let result = this._analyzer.resolveTree(tree);

            let resultsString = `PreOrder: ${preOrderExpression} <br />InOrder: ${inOrderExpression}<br />PostOrder: ${postOrderExpression}` +
                `<br /><br />Resultado: ${result}`;

            document.getElementById('results').innerHTML = resultsString;
        } else {
            alert('debes escribir una expresion para continuar');
        }
    }
}

const main = new Main();