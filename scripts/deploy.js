const hre = require("hardhat");

async function main() {
    const VotingDApp = await hre.ethers.getContractFactory("VotingDApp");

    const votingDApp = await VotingDApp.deploy();

    console.log(`VotingDApp working at address: ${await votingDApp.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
