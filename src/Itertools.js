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
                while(true) yield value;
            }
        });
    }
}

module.exports = Itertools;