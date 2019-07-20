const Sample = require("../src/Sample");
const Sample2 = require("../src/Sample2");
const chai = require('chai');
const should = chai.should;
should();

describe("Sample.getGoodOrBad", () => {
    Sample2.helloWorld();
    it("returns 'Good' for true", () => {
        const expect = 'Good';
        const actual = Sample.getGoodOrBad(true);
        actual.should.equal(expect);
    });

    it("returns 'Bad' for false", () => {
        const expect = 'Bad';
        const actual = Sample.getGoodOrBad(false);
        actual.should.equal(expect);
    });

    it("can solve ABC131 A-Security", () => {
        /*
        すぬけ君の管理する研究室の扉にはロックがかかっており、解錠にはセキュリティコードを入力する必要があります。
        セキュリティコードは4桁の数字列です。
        セキュリティコードが「入力しづらい」とは、同じ数字が連続する箇所が存在することを言います。

        現在のセキュリティコードSが与えられます。
        Sが「入力しづらい」なら Bad を、そうでなければ Good を出力してください。
        */
        const solve = S => {
            flag = true; //デフォルトを入力しやすいものとしておく
            for (let i = 0; i < 3; i++) {
                if (S[i] === S[i+1]) flag = false;
            }
            return(Sample.getGoodOrBad(flag)); //solveの中で「ライブラリ」を使う
        }
        const testData = [
            {input: '3776', output: 'Bad'},
            {input: '8080', output: 'Good'},
            {input: '1333', output: 'Bad'},
            {input: '0024', output: 'Bad'},
        ];
        testData.forEach(data => {
            solve(data.input).should.equal(data.output);
        });
    });
});

