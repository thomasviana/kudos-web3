import { useContext } from "react";
import nfts from "../../assets/nfts.png";
import { Loader } from "../../components";
import { KudosContext } from "../../context/KudosContext";
import "./header.css";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);

const Header = () => {
  const { state, handler } = useContext(KudosContext);

  const handleSubmit = (event) => {
    const { receiverAddress, tokenId, message } = state.formData;
    event.preventDefault();
    if (!receiverAddress || !tokenId || !message) return;
    handler.sendKudos();
  };

  return (
    <div className='kudos__header section__padding' id='home'>
      <div className='kudos__header-content'>
        <h1>Give Kudos to the team</h1>
        <p>
          Connect your wallet, select the NFT and send it to someone with a
          personalized message.
        </p>
        {state.currentAccount && (
          <div className='kudos__header-content__form'>
            <Input
              placeholder='Receiver address'
              name='receiverAddress'
              type='text'
              handleChange={handler.handleChange}
              value={state.formData["receiverAddress"]}
            />
            <Input
              placeholder='Token ID'
              name='tokenId'
              type='text'
              handleChange={handler.handleChange}
              value={state.formData["tokenId"]}
            />
            <Input
              placeholder='Personalized message'
              name='message'
              type='text'
              handleChange={handler.handleChange}
              value={state.formData["message"]}
            />
          </div>
        )}

        {state.currentAccount &&
          (state.isLoading ? (
            <Loader />

          ) : (
            <div className='kudos__header-content__mint'>
              <button type='button' onClick={handleSubmit}>
                Send NFT
              </button>
            </div>
          ))}
      </div>
      <div className='kudos__header-image'>
        <img src={nfts} alt='nft' />
      </div>
    </div>
  );
};

export default Header;
