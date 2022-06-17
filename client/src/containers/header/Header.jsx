import nfts from "../../assets/nfts.png";
import "./header.css";

const Header = () => (
 <div className='kudos__header section__padding' id='home'>
  <div className='kudos__header-content'>
   <h1>Give Kudos to the team</h1>
   <p>
    Connect your wallet, select the NFT and send it to someone with a
    personalized message.
   </p>

   <div className='kudos__header-content__input'>
    <input type='text' placeholder='Receiver address' />
   </div>
   <div className='kudos__header-content__input'>
    <input type='text' placeholder='Token ID' />
   </div>
   <div className='kudos__header-content__input'>
    <input type='text' placeholder='Personalized message' />
   </div>

   <div className='kudos__header-content__mint'>
    <button type='button'>Send NFT</button>
   </div>
  </div>

  <div className='kudos__header-image'>
   <img src={nfts} alt='nft' />
  </div>
 </div>
);

export default Header;
