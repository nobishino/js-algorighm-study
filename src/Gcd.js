/**
 * @file
 * ユークリッド互除法とその周辺
 * 
 */

/**
 * 2つの整数の最大公約数を求める。
 * 
 * 実装は、ユークリッドの互除法による。
 * 
 * @param {number} x 整数でなければならない。0でも負の整数でも構わない。
 * @param {number} y 整数でなければならない。0でも負の整数でも構わない。
 * @returns {number} xとyの最大公約数.
 * @example
 * gcd(18,24) //6
 * gcd(32,15) //1 引数はどちらが大きくても構わない。
 * gcd(45,1) //1
 * gcd(0,34) //34 0はgcdの「単位元」である。
 * gcd(-7,21) //7 
 * gcd(32) //32. undefinedの引数は0扱いする。
 * gcd(0,0) //0. 意味的にはちょっとおかしいが、gcd(0,0)は0に等しいものと約束する。
 * //なお、Python3のmath.gcdも同様にふるまう。
 * gcd(10218237918,46172874918) //186 ユークリッド互除法はとても速いので。
 */
    function gcd(x=0,y=0) {
        
        if(x<y){
            let tmp = x;
            x = y;
            y = tmp;
        }
        console.log("xは"+x)
        console.log("yは"+y)
        if(y==0){
            return x;
        }
        let r = x%y;
        console.log(r);
        while(r!==0){
            x = y;
            y = r;
            r = x%y;
        }
        if(y<0){
            y=y*-1;
        }
        if(isNaN(r)){
            y=x;
        }

        return y; //TODO: implement 
    }

module.exports = {
    gcd: gcd,
}