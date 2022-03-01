
const hre = require("hardhat");

const main = async () => {
  console.log("compling..");
  const Verifier = await hre.ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy();

  console.log("compling...");
  await verifier.deployed();

  console.log("verifier deployed to: ", verifier.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}