import { useContext } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { KudosContext } from '../../context/KudosContext';
import { contractAddress } from '../../utils/contants';
import { shortenAddress } from '../../utils/shortenAddress';
import "./kudos.css";

const Kudos = ({ senderAddress, receiverAddress, timestamp, message, tokenId }) => {
  const { state, handler } = useContext(KudosContext);

  const getImageUrl = (tokenId) => {
    const ipfsId = state.nftsMetadata.find(nft => nft.id === tokenId).image.split('ipfs://')[1];
    console.log(ipfsId);
    return `https://ipfs.io/ipfs/${ipfsId}`
  }

  return (
    <div className='kudos__kudos-container__kudos'>
      <div className='kudos__kudos-container__kudos-nft'>
        <img
          src={getImageUrl(tokenId)}
          alt="nft"
        />
      </div>
      <div className='kudos__kudos-container__kudos-data'>
        <div />
        <h4>From: </h4>
        <a href={`https://rinkeby.etherscan.io/address/${senderAddress}`} target="_blank" rel="noreferrer">
          <p>{shortenAddress(senderAddress.toUpperCase())}</p>
        </a>
        <h4>To: </h4>
        <a href={`https://rinkeby.etherscan.io/address/${receiverAddress}`} target="_blank" rel="noreferrer">
          <p>{shortenAddress(receiverAddress.toUpperCase())}</p>
        </a>
        <h4>Date:</h4>
        <p>{timestamp}</p>
        <br />
        <div />
        <h4>Message: </h4>
        <p>{message}</p>
      </div>
      <a href={`https://rinkeby.etherscan.io/address/${contractAddress}`} target="_blank" rel="noreferrer">
        <FaEthereum className='kudos__kudos-container__etherscan' />
      </a>

    </div>
  );
}

export default Kudos;
