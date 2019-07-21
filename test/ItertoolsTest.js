const Itertools = require('../src/Itertools');
const chai = require('chai');
const should = chai.should;
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
        const it = Itertools.count(1,3);
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
        const it = Itertools.range(10,100);
        let idx = 10;
        let minValue = 10000000;
        let maxValue = -1000000;
        for (let value of it) {
            minValue = Math.min(value,minValue);
            maxValue = Math.max(value,maxValue);
            value.should.equal(idx);
            idx++;
        }
        minValue.should.equal(10);
        maxValue.should.equal(99);
    });

    it("returns finite iterator of step 7", () => {
        const it = Itertools.range(5,68,7);
        let expect = 5;
        let maxValue = 0;
        for (let value of it) {
            value.should.equal(expect);
            expect += 7;
            maxValue = Math.max(value,maxValue);
        }
        maxValue.should.equal(61); //[start, end) - end argument is excluded from range.
    });

});

describe("Iteratools.cycle", () => {
    it ("works for array", () => {
        const array = [0,3,6,9,12];
        const it = Itertools.cycle(array);
        let expect = 0;
        let index = 0;
        for (let value of it) {
            value.should.equal(expect);
            expect = (expect + 3)%15;
            index++;
            if (index > 100) break;
        }
    });

    it ("works for string", () => {
        const string = "ABCDEFG";
        const it = Itertools.cycle(string);
        let index = 0;
        for (let value of it) {
            let expect = string[index%7];
            value.should.equal(expect);
            index++;
            if (index > 100) break;
        }
    });

    it ("works for other iterable", () => {
        const range = Itertools.range(1,4,1);
        const it = Itertools.cycle(range);
        let index = 0;
        for (let value of it) {
            let expect = index%3 + 1;
            value.should.equal(expect);
            index++;
            if (index > 100) break;
        }
    });
});

describe("Itertools.repeat", () => {
    it ("returns iterable object which yields same value endlessly", () => {
        const it = Itertools.repeat("VALUE");
        let index = 0;
        for (let value of it) {
            value.should.equal("VALUE");
            index++;
            if(index > 100) break;
        }
    });
});