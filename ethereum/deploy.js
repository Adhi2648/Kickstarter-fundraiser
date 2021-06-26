const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compliedFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
    // add your metamask phase
    "license father segment month gaze amateur define early together absurd marriage save",
    // add your infura api address 
    "https://rinkeby.infura.io/v3/19fc0fd04f7b4acab8320376c44e46b7"
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compliedFactory.interface))
        .deploy({ data: compliedFactory.bytecode })
        .send({ gas: "1000000", from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
};
deploy();