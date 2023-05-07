import { readFile } from "node:fs/promises";

const args = process.argv.slice(2);
const filePath = args[0];

async function readNames(path) {
  const contents = await readFile(path, "utf8");
  const sortedNames = sortNames(contents);
  return sortedNames;
}

const sortNames = (names) => {
  const namesSplit = names.trim().split("\n");
  return namesSplit.sort((a, b) => {
    // extract last names only and compare
    const lastNameA = a.trim().split(" ").pop();
    const lastNameB = b.trim().split(" ").pop();
    return lastNameA.localeCompare(lastNameB);
  });
};

async function printSortedNames(path) {
  const sortedNames = await readNames(path);
  const sortedNamesList = sortedNames.join("\n");
  console.log(sortedNamesList);
}

printSortedNames(filePath);

export { readNames, sortNames, printSortedNames };
