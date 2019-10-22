/**
 * @file
 * https://docs.python.org/3/library/itertools.html
 */

/**
 * 
 * 
 * https://docs.python.org/3/library/itertools.html
 */
class Itertools {

    /**
     * 指定した値から開始する等差数列のIterableオブジェクトを返却する。
     * 
     * @param {number} start 
     * @param {number} step [Optional] 刻み幅を指定する。デフォルトは1.
     * @returns {Iterable}
     */
    static count(start, step = 1) {
        return ({
            [Symbol.iterator]: function* () {
                let currentValue = start - step;
                while (true) {
                    currentValue += step;
                    yield currentValue;
                }
            }
        });
    }

    /**
     * [start,end)
     * 
     * @param {number} start 
     * @param {number} end 
     * @param {number} step 
     * @returns {Iterable}
     */
    static range(start, end, step = 1) {
        return ({
            [Symbol.iterator]: function* () {
                let currentValue = start - step;
                while (true) {
                    currentValue += step;
                    if (currentValue < end) {
                        yield currentValue;
                    } else {
                        return;
                    }
                }
            }
        });
    }

    /**
     * 引数のIterableオブジェクトを繰り返すIterableオブジェクトを返却する。
     * 
     * @param {array} elements 配列やIterableオブジェクト
    * @returns {Iterable}
        */
    static cycle(elements) {
        return ({
            [Symbol.iterator]: function* () {
                while (true) {
                    for (let elem of elements) yield elem;
                }
            }
        });
    }

    /**
         * 引数の値を繰り返すIterableオブジェクトを返却する。
         * 
         * @param {*} value Iterableオブジェクトが生成する値
         * @returns {Iterable}
         */
    static repeat(value) {
        return ({
            [Symbol.iterator]: function* () {
                while (true) yield value;
            }
        });
    }

    /**
     * <p>
     * 左側からの畳み込みを行った結果をIterableオブジェクトとして返却する。
     * </p>
     * 
     * <p>
     * Haskellのscanlに近いが、初期値としては配列の最初の要素が用いられる。
     * したがって、関数は型 a -> a -> aを持つ必要がある。
     * </p>
     * 
     * @param {Iterable} iterable 
     * @param {function} func
     * @example
     * Itertools.accumulate([1,2,3,4,5]) // [1,3,6,10,15]
     * Itertools.accumulate([1,2,3,4,5], (a,b) => a*b) // [1,2,6,24,120]
    */
    static accumulate(iterable, func = (a, b) => a + b) {
        return ({
            [Symbol.iterator]: function* () {
                let acc;
                for (let elem of iterable) {
                    acc = acc ? func(acc,elem) : elem; //初期値がないので場合分けする
                    yield acc;
                }
            }
        });
    }

    /**
     * 
     * tupleがないので、配列のIterableを返却する？
     * 
     * @param {*} args 
     */
    static product(...args) {
        return ({
            [Symbol.iterator]: function*() {
                for (let a of args[0]) {
                    for (let b of args[1]) {
                        yield [a,b];
                    }
                }
            }
        });
    }

    /**
     * 
     * @param {number} length 
     * @param {number} takeNum 
     * @returns {number[][]}
     */
    static numericCombinations(length, takeNum) {
        if (takeNum === 0) return [[]]; //Base Case
        if (takeNum > length) return [];
        //最後の要素を取らない場合の組み合わせ
        const withoutLastElem = Itertools.numericCombinations(length - 1, takeNum);
        //最後の要素をとる場合の残りの組み合わせ
        const withLastElem = Itertools.numericCombinations(length - 1, takeNum - 1);
        //最後の要素をとる場合の組み合わせを作る
        withLastElem.forEach(function (combination) {
            combination.push(length - 1);
        });
        //concatして返却する
        const concatArray = withoutLastElem.concat(withLastElem);
        return concatArray;
    }


    /**
     * 
     * @param {any[]} array 
     * @param {number} takeNumber 
     * @param {any[][]}
     */
    static combinations(array, takeNumber) {
        const numericCombinations = Itertools.numericCombinations(array.length, takeNumber);
        const combinationsArray = numericCombinations.map(function (indexArray) {
            const combination = [];
            for (let i = 0; i < takeNumber; i++) {
                combination.push(array[indexArray[i]]);
            }
            return combination;
        });
        return combinationsArray;
    }

    /**
     * 配列の順序を無視して、同一の要素を持つかどうかを判定する。
     * 
     * @param {any[]} array1
     * @param {any[]} array2
     * @param {function} [equality] 要素の一致判定に用いる等価性判定関数。指定しない場合、厳密等価演算子===を用いる。
     * @returns {boolean} 
     * 
     */
    static hasSameElems(array1, array2, equality) {
        if (typeof equality !== 'function') {
            equality = (a,b) => a===b; //デフォルトは厳密等価で判断する
        }
        if (array1.length !== array2.length) return false; //要素数が異なる時はfalse
        const length = array1.length;
        const matched = Array(length).fill(false);
        for (let i = 0; i < length; i++) {
            let success = false;
            for (let j = 0; j < length; j++) {
                if (matched[j]) continue;
                if (equality(array1[i], array2[j])) {
                    matched[j] = true;
                    success = true;
                    break;
                }
            }
            if (!success) return false;
        }
        return true;
    }



}

module.exports = Itertools;