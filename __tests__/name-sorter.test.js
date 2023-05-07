import { expect } from "chai";
import { writeFile } from "node:fs/promises";
import sinon, { stub, assert } from "sinon";
import { readFile } from "node:fs/promises";
import { tmpdir } from "os";
import { join } from "path";

import { sortNames } from "../name-sorter.js";
import { readNames } from "../name-sorter.js";
import { printSortedNames } from "../name-sorter.js";

describe("readFile", () => {
    it("should correctly read a file and return its contents", async () => {
        const tmpFilePath = join(tmpdir(), "a-test-file.txt");
        await writeFile(tmpFilePath, UNSORTED_NAMES);
        
        const result = await readFile(tmpFilePath, "utf8");
        expect(result).to.equal(UNSORTED_NAMES);
    });
});

describe("readNames", () => {
    it("should correctly read a list of names from a file", async () => {
        const tmpFilePath = join(tmpdir(), "test-names.txt");
        await writeFile(tmpFilePath, UNSORTED_NAMES);
        
        const sortedNames = await readNames(tmpFilePath);
        expect(sortedNames).to.deep.equal(SORTED_NAMES);
    });
});

describe("sortNames", () => {
  it("should correctly sort an array of names", () => {
    expect(sortNames(UNSORTED_NAMES)).to.deep.equal(SORTED_NAMES);
  });
  it("should correctly handle duplicate last names", () => {
    expect(sortNames(UNSORTED_DUPE)).to.deep.equal(SORTED_DUPE);
  });
});

describe("printSortedNames", () => {
  it("should read and print a sorted list of names to the console", () => {
    const filePath = "./unsorted-names-list.txt";

    const logSpy = sinon.spy(console, "log");

    return printSortedNames(filePath).then(() => {
      expect(logSpy.calledWith(EXPECTED_OUTPUT)).to.be.true;
    });
  });
});


const EXPECTED_OUTPUT =
  "Marin Alvarez\nAdonis Julius Archer\nBeau Tristan Bentley\nHunter Uriah Mathew Clarke\nLeo Gardner\nVaughn Lewis\nLondon Lindsey\nMikayla Lopez\nJanet Parsons\nFrankie Conner Ritter\nShelby Nathan Yoder";

const UNSORTED_NAMES =
  "Wenona Smith Elliot\nJane Doe\nBob Johnson\nEmily Wilson Scott";
const SORTED_NAMES = [
  "Jane Doe",
  "Wenona Smith Elliot",
  "Bob Johnson",
  "Emily Wilson Scott",
];
const UNSORTED_DUPE =
  "John Smith\nJane Doe\nBelinda Johnson\nEmily Wilson\nChris James Smith";
const SORTED_DUPE = [
  "Jane Doe",
  "Belinda Johnson",
  "John Smith",
  "Chris James Smith",
  "Emily Wilson",
];
