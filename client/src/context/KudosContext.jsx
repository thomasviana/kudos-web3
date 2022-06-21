import { createContext, useEffect, useState } from "react";
import Web3 from 'web3/dist/web3.min.js';
import { contractABI, contractAddress, networks } from "../utils/contants";

export const KudosContext = createContext({
  state: {
    currentAccount: "",
    nftsMetadata: [],
    formData: {},
    kudos: [],
  },
  handler: {
    connectWallet: () => { },
    balanceOf: () => { },
    sendKudos: () => { },
    burn: () => { },
  },
});

const { ethereum } = window;

const createContract = async () => {
  const web3 = new Web3(window.ethereum);
  const networkId = await web3.eth.net.getId();
  const networkData = networks[networkId];
  if (networkData) {
    return new web3.eth.Contract(contractABI, contractAddress);
  } else {
    window.alert("Marketplace contract not deployed to detected network");
  }
};

const formInitialState = {
  receiverAddress: "",
  tokenId: "",
  message: "",
};

export const KudosProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState(formInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [kudosCount, setKudosCount] = useState(
    localStorage.getItem("kudosCount")
  );
  const [kudos, setKudos] = useState([]);
  const [nftsMetadata, setNftsMetadata] = useState();

  const handleChange = (event, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: event.target.value }));
  };

  const getAllKudos = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const kudosContract = await createContract();
      const availableKudos = await kudosContract.methods.getAllKudos().call();

      const structuredKudos = availableKudos.map((kudos) => ({
        receiverAddress: kudos.receiver,
        senderAddress: kudos.sender,
        timestamp: new Date(kudos.timestamp * 1000).toLocaleString(),
        message: kudos.message,
        tokenId: kudos.tokenId,
      })
      ).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
      const nftsMetadata = await fetchNFTMetadata();
      setNftsMetadata(nftsMetadata);
      setKudos(structuredKudos);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNFTMetadata = async () => {
    const kudosContract = await createContract();

    let promises = [];
    for (let i = 1; i < 4; i++) {
      let nftUri = await kudosContract.methods.uri(i).call();
      promises.push(
        fetch(`https://ipfs.io/ipfs/${nftUri.split('ipfs://')[1]}`)
          .then((res) => res.json())
          .then((res) => res)
      );
    }
    return Promise.all(promises);
  }

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      getAllKudos();
    } else {
      console.log("No accounts found");
    }
    console.log(accounts);
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const checkIfKudosExist = async () => {
    try {
      const kudosContract = await createContract();
      const kudosCount = await kudosContract.methods.supply().call();
      window.localStorage.setItem("kudosCount", kudosCount);
    } catch {
      throw new Error("No ethereum object");
    }
  };

  const sendKudos = async () => {
    try {
      if (ethereum) {
        setIsLoading(true);
        const { receiverAddress, tokenId, message } = formData;
        const kudosContract = await createContract();
        const tx = await kudosContract.methods
          .sendKudos(receiverAddress, tokenId, message)
          .send({ from: currentAccount });
        setIsLoading(false);
        console.log(`Success - ${tx.transactionHash}`);

        const kudosCount = await kudosContract.methods.supply().call();
        setFormData(formInitialState);
        setKudosCount(kudosCount);

      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfKudosExist();
  }, []);

  return (
    <KudosContext.Provider
      value={{
        state: {
          currentAccount,
          nftsMetadata,
          formData,
          kudos,
          isLoading,
        },
        handler: {
          connectWallet,
          handleChange,
          // balanceOf,
          sendKudos,
          // burn,
        },
      }}
    >
      {children}
    </KudosContext.Provider>
  );
};
