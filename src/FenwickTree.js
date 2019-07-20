/**
 * Fenwick Tree, またはBinary Indexed Tree
 * 
 * http://hos.ac/slides/20140319_bit.pdf
 * とりあえず基本的な機能のみ実装する。
 * N個の数値v1, v2, ... , vnに対して、
 * vaに値wを加えるadd(a, w)
 * v1, v2, ..., vaまでの和を求める
 * この2つの計算をO(log N)で行う。
 * 
 * このクラスでデータの添え字は1-indexedで扱われることに注意する。
 * 
 */
class FenwickTree {

    /**
     * 
     * @param {number} N FenwickTreeで管理する数値データの個数。正の整数でなければならない。
     */
    constructor(N) {
        N = N || 1000000; //Nが与えられなかったときはN = 10^6で初期化しておく
        this.size = N;

        //ノードの値を格納する配列。
        //数値の値は1-indexedで管理される。
        //this.nodes[i]は、iで終わる区間の和を保持する。
        this.nodes = [];
        for (let i = 0; i < N + 10; i++) {
            this.nodes[i] = 0;
        }
        //ここはもう少しきれいに実装したい
    }

    /**
     * 数値の配列からFenwickTreeを初期化して返却する。
     * 
     * @param {number[]} valueArray 数値の配列。この配列は0-indexedであるものとする。
     * @returns {FenwickTree} 数値配列によって初期化されたFenwickTree
     */
    static fromArray(valueArray) {
        const ft = new FenwickTree(valueArray.length);
        for (let i = 0; i < valueArray.length; i++) {
            ft.add(i + 1, valueArray[i]); //FenwickTreeは1-indexedでデータ管理することに注意
        }
        return ft;
    }

    /**
     * 指定した位置のデータに指定した値を加算する。
     * 
     * @param {number} index 値を加算する対象のインデックス
     * @param {number} value 整数または浮動小数点数
     * @returns {void}
     */
    add(index, value) {
        //node[index]を更新して、そのノードが管理する区間の幅だけindexを増やす。
        for (let x = index; x <= this.size; x += x & -x) {
            this.nodes[x] += value;
        }
    }

    /**
     * v1からv_indexまでの総和を計算する。
     * 
     * @param {number} index 1以上N以下の整数でなければならない。
     * @returns {number} v1 + v2 + ... + v_index
     */
    sumUpto(index) {
        let sum = 0;
        for (let x = index; x > 0; x -= x & -x) {
            sum += this.nodes[x];
        }
        return sum;
    }

    /**
     * 閉区間[min,max]におけるデータの総和を計算する。
     * 
     * min > maxとしたときの動作は未定義。
     * 
     * @param {number} min 1以上N以下の整数
     * @param {number} max 1以上N以下の整数
     * @returns {number} v_min + ... + v_max
     */
    sum(min,max) {
        return this.sumUpto(max) - this.sumUpto(min-1);
    }
}

module.exports = FenwickTree;