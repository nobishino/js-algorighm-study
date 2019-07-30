const Itertools = require('../src/Itertools');
const chai = require('chai');
const should = chai.should;
const expect = chai.expect;
should();

describe("Itertools.count", () => {

    it("returns infinite iterator", () => {
        const it = Itertools.count(10);
        let index = 10;
        for (let value of it) {
            value.should.equal(index);
            index++;
            if (index > 20) break;
        }
    });

    it("step = 3 => 1,4,7,10...", () => {
        const it = Itertools.count(1, 3);
        let index = 1;
        for (let value of it) {
            value.should.equal(index);
            index += 3;
            if (index > 30) break;
        }
    });

});

describe("Itertools.range", () => {

    it("returns finite iterator", () => {
        const it = Itertools.range(10, 100);
        let idx = 10;
        let minValue = 10000000;
        let maxValue = -1000000;
        for (let value of it) {
            minValue = Math.min(value, minValue);
            maxValue = Math.max(value, maxValue);
            value.should.equal(idx);
            idx++;
        }
        minValue.should.equal(10);
        maxValue.should.equal(99);
    });

    it("returns finite iterator of step 7", () => {
        const it = Itertools.range(5, 68, 7);
        let expectation = 5;
        let maxValue = 0;
        for (let value of it) {
            value.should.equal(expectation);
            expectation += 7;
            maxValue = Math.max(value, maxValue);
        }
        maxValue.should.equal(61); //[start, end) - end argument is excluded from range.
    });

});

describe("Iteratools.cycle", () => {
    it("works for array", () => {
        const array = [0, 3, 6, 9, 12];
        const it = Itertools.cycle(array);
        let expectation = 0;
        let index = 0;
        for (let value of it) {
            value.should.equal(expectation);
            expectation = (expectation + 3) % 15;
            index++;
            if (index > 100) break;
        }
    });

    it("works for string", () => {
        const string = "ABCDEFG";
        const it = Itertools.cycle(string);
        let index = 0;
        for (let value of it) {
            let expectation = string[index % 7];
            value.should.equal(expectation);
            index++;
            if (index > 100) break;
        }
    });

    it("works for other iterable", () => {
        const range = Itertools.range(1, 4, 1);
        const it = Itertools.cycle(range);
        let index = 0;
        for (let value of it) {
            let expectation = index % 3 + 1;
            value.should.equal(expectation);
            index++;
            if (index > 100) break;
        }
    });
});

describe("Itertools.repeat", () => {
    it("returns iterable object which yields same value endlessly", () => {
        const it = Itertools.repeat("VALUE");
        let index = 0;
        for (let value of it) {
            value.should.equal("VALUE");
            index++;
            if (index > 100) break;
        }
    });
});

describe("Itertools.accumulate", () => {

    it("returns empty iterable for empty input", () => {
        const actual = Itertools.accumulate([]);
        [...actual].should.have.lengthOf(0);
    });

    it("returns [1] for [1]", () => {
        const actual = Itertools.accumulate([1]);
        expectation = [1];
        let index = 0;
        for (let value of actual) {
            value.should.equal(expectation[index]);
            index++;
        }
    });

    it("returns [1,3,6,10,15] for [1,2,3,4,5]", () => {
        const arg = [1, 2, 3, 4, 5];
        const actual = Itertools.accumulate(arg);
        expectation = [1, 3, 6, 10, 15];
        let index = 0;
        for (let value of actual) {
            value.should.equal(expectation[index]);
            index++;
        }
    });

    it("returns [1,2,6,24,120] for [1,2,3,4,5] and (a,b)=>a*b", () => {
        const arg = [1, 2, 3, 4, 5];
        const actual = Itertools.accumulate(arg, (a, b) => a * b);
        expectation = [1, 2, 6, 24, 120];
        let index = 0;
        for (let value of actual) {
            value.should.equal(expectation[index]);
            index++;
        }
    });

    it("can process other iterable object", () => {
        const arg = Itertools.range(2, 10, 3); //[2,5,8]
        const actual = Itertools.accumulate(arg, (a, b) => a * a + b);
        let expectation = [2, 9, 89];
        let index = 0;
        for (let value of actual) {
            value.should.equal(expectation[index]);
            index++;
        }
    });

});

describe("Itertools.product", () => {
    
    it("can process an iterable object and a string", () => {
        const numbers = Itertools.range(0,3);
        const alphabets = "ABC";
        const actual = Itertools.product(numbers,alphabets);
        const expectation = [
            [0,"A"],
            [0,"B"],
            [0,"C"],
            [1,"A"],
            [1,"B"],
            [1,"C"],
            [2,"A"],
            [2,"B"],
            [2,"C"],
        ];
        let index = 0;
        for (let tuple of actual) {
            expect(tuple).to.eql(expectation[index]);
            index++;
        }
    });

    // it("can process three iterable objects", () => {
    //     const numbers1 = Itertools.range(0,2);
    //     const numbers2 = Itertools.range(0,3);
    //     const numbers3 = Itertools.range(2,5);
    //     const iterable = Itertools.product(numbers1, numbers2, numbers3);
    //     // const iterator = iterable[Symbol.iterator]();
    //     for (let i = 0; i < 2; i++) {
    //         for (let j = 0; j < 3; j++) {
    //             for (let k = 2; k < 5; k++) {
    //                 const expectation = [i,j,k];
    //                 console.log(iterable);
    //                 const [value,done] = iterable.next();
    //                 expect(value).to.eql(expectation);
    //             }
    //         }
    //     }
    // }
    // );

});