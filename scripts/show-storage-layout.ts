const hre = require("hardhat");

async function main() {
  await hre.storageLayout.export();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
