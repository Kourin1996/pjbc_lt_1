import { ethers } from "hardhat";

async function main() {
  const a = 11;
  const b = 13;
  const c = "Hello, World"; // 24 bytes <  32 bytes
  const d = c.repeat(3); // 72 bytes >= 32 bytes
  const e = [10, 20, 30, 40];
  const fKeys = [
    "0x0000000000000000000000000000000000000011",
    "0x0000000000000000000000000000000000000012",
    "0x0000000000000000000000000000000000000013",
    "0x0000000000000000000000000000000000000014",
  ];
  const fValues = [true, false, false, true];

  const TestFactory = await ethers.getContractFactory("Test");
  const test = await TestFactory.deploy(a, b, c, d, e, fKeys, fValues);

  await test.deployed();

  console.log(`Contract Address: ${test.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
