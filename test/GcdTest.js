const Gcd = require('../src/Gcd');
const chai = require('chai');
const should = chai.should;
should();

describe('Gcd.gcd', () => {

    it("returns 6 for 18,24", () => {
        Gcd.gcd(18,24).should.equal(6);
    });

    it("returns 1 for 32,15", () => {
        Gcd.gcd(32,15).should.equal(1);
    });

    it("returns 1 for 45,1", () => {
        Gcd.gcd(45,1).should.equal(1);
    });
    //ここなぜかテストの引数が18,24になっててテスト通らなかったので0,34に修正しました
    it("returns 34 for 0,34(0 should be the identity element of gcd)", () => {
        Gcd.gcd(0,34).should.equal(34);
    });

    it("returns 7 for -7,21", () => {
        Gcd.gcd(-7,21).should.equal(7);
    });

    it("treats undefined argments as 0", () => {
        Gcd.gcd(32).should.equal(32); 
    });

    it("we define gcd(0,0) equals to 0", () => {
        Gcd.gcd(0,0).should.equal(0);
    });

    it("is very fast", () => {
        Gcd.gcd(10218237918,46172874918).should.equal(186);
    })
});
