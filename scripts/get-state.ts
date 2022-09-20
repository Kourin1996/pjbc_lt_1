import { ethers } from "hardhat";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS ?? "";

async function displayFieldA() {
  const baseIndex = 0;

  const storageData = await ethers.provider.getStorageAt(
    CONTRACT_ADDRESS,
    baseIndex
  );

  const a = ethers.BigNumber.from(
    // [30:32]
    ethers.utils.hexDataSlice(storageData, 32 - 2)
  );

  console.log("a", a.toNumber());
}

async function displayFieldB() {
  const baseIndex = 0;

  const storageData = await ethers.provider.getStorageAt(
    CONTRACT_ADDRESS,
    baseIndex
  );

  const b = ethers.BigNumber.from(
    // [28:30]
    ethers.utils.hexDataSlice(storageData, 32 - 4, 32 - 2)
  );

  console.log("b", b.toNumber());
}

async function displayFieldC() {
  const baseIndex = 1;

  const storageData = await ethers.provider.getStorageAt(
    CONTRACT_ADDRESS,
    baseIndex
  );

  const cLen = ethers.BigNumber.from(
    ethers.utils.hexDataSlice(storageData, 32 - 2) // [30:32]
  ).div(2); // len * 2 is stored in the storage

  const cBytes = ethers.utils.hexDataSlice(storageData, 0, cLen.toNumber());

  console.log("length of c", cLen);
  console.log("c", ethers.utils.toUtf8String(cBytes));
}

async function displayFieldD() {
  const baseIndex = 2;

  const baseStorageData = await ethers.provider.getStorageAt(
    CONTRACT_ADDRESS,
    baseIndex
  );

  const dLen = ethers.BigNumber.from(
    ethers.utils.hexDataSlice(baseStorageData, 32 - 2) // [30:32]
  )
    .sub(1)
    .div(2); // len * 2 + 1 is stored in the storage

  const dataOffset = ethers.utils.keccak256(
    ethers.utils.hexZeroPad(ethers.BigNumber.from(baseIndex).toHexString(), 32)
  );

  let data = "";

  for (let i = 0; i < dLen.toNumber() / 32; i++) {
    const dataIndex = ethers.utils.hexZeroPad(
      ethers.BigNumber.from(dataOffset).add(i).toHexString(),
      32
    );

    const rawSubData = await ethers.provider.getStorageAt(
      CONTRACT_ADDRESS,
      dataIndex
    );

    data += ethers.utils.toUtf8String(rawSubData);
  }

  console.log("size of d", dLen.toNumber());
  console.log("d", data);
}

async function displayFieldE() {
  const baseIndex = 3;

  const storage3 = await ethers.provider.getStorageAt(
    CONTRACT_ADDRESS,
    baseIndex
  );

  const len = ethers.BigNumber.from(storage3).toNumber();

  const indexOffset = ethers.utils.keccak256(
    ethers.utils.hexZeroPad(ethers.BigNumber.from(baseIndex).toHexString(), 32)
  );

  console.log("length of e", len);

  for (let i = 0; i < len; i++) {
    const index = ethers.utils.hexZeroPad(
      ethers.BigNumber.from(indexOffset).add(i).toHexString(),
      32
    );

    const storageData = await ethers.provider.getStorageAt(
      CONTRACT_ADDRESS,
      index
    );

    console.log(`e[${i}]`, ethers.BigNumber.from(storageData).toNumber());
  }
}

async function displayFieldF() {
  const baseIndex = 4;

  const keys = [
    "0x0000000000000000000000000000000000000011",
    "0x0000000000000000000000000000000000000012",
    "0x0000000000000000000000000000000000000013",
    "0x0000000000000000000000000000000000000014",
  ];

  for (const key of keys) {
    const index = ethers.utils.keccak256(
      "0x" +
        ethers.utils.hexZeroPad(key, 32).slice(2) +
        ethers.utils
          .hexZeroPad(ethers.BigNumber.from(baseIndex).toHexString(), 32)
          .slice(2)
    );

    const storageData = await ethers.provider.getStorageAt(
      CONTRACT_ADDRESS,
      index
    );

    const flag = storageData[storageData.length - 1] === "1";

    console.log(`f[${key}]`, flag);
  }
}

async function main() {
  // storage 0 (a, b)
  await displayFieldA();
  await displayFieldB();

  // storage 1 (c)
  await displayFieldC();

  // storage 2 (d)
  await displayFieldD();

  // storage 3 (e)
  await displayFieldE();

  // storage 4 (f)
  await displayFieldF();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
