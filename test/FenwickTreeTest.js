const FenwickTree = require('../src/FenwickTree');
const chai = require('chai');
const should = chai.should;
should();


/**
 * FenwickTreeと比較テストするための愚直計算データ構造。
 * 
 * 加算処理にO(N), 区間和の取得にO(N)を要する。
 */
class NaiveSummer {

    constructor(N) {
        this.size = N;
        this.values = [];
        for (let i = 0; i < N + 10; i++) this.values[i] = 0;
    }

    /**
     * 数値の配列からFenwickTreeを初期化して返却する。
     * 
     * @param {number[]} valueArray 数値の配列。この配列は0-indexedであるものとする。
     * @returns {FenwickTree} 数値配列によって初期化されたFenwickTree
     */
    static fromArray(valueArray) {
        const summer = new NaiveSummer(valueArray.length);
        for (let i = 0; i < valueArray.length; i++) {
            ft.add(i + 1, valueArray[i]); //1-indexedでデータ管理することに注意
        }
        return summer;
    }

    add(index, value) {
        this.values[index] += value;
    }

    sumUpto(index) {
        let sum = 0;
        for (let i = 1; i <= index; i++) {
            sum += this.values[i];
        }
        return sum;
    }

    sum(min,max) {
       let s = 0;
       for (let i = min; i <= max; i++) s += this.values[i];
       return s;
    }
}
describe("FenwickTree", () => {
    const values = [3,-4,2,1,9,10,2,-67,12,241,2];
    const ft = new FenwickTree(values.length);
    const ns = new NaiveSummer(values.length);

    it ("initialized to zero", () => {
        ft.size.should.equal(values.length);
        ft.sum(3,8).should.equal(0);
    });

    it ("returns correct sum", () => {
        for (let i = 0; i < values.length; i++) {
            ft.add(i+1,values[i]);
            ns.add(i+1,values[i]);
        }
        ft.sum(3,8).should.equal(ns.sum(3,8));
        ft.sum(2,5).should.equal(ns.sum(2,5));
        ft.sum(1,3).should.equal(ns.sum(1,3));
    });

    it ("update works correctly", () => {
        const before = ft.sum(2,9);
        ft.add(4,-3);
        const after = ft.sum(2,9);
        after.should.equal(before - 3);
    });

});