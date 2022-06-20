import { useContext } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import logo from "../../assets/logo-zemoga.png";
import { KudosContext } from "../../context/KudosContext";
import { shortenAddress } from "../../utils/shortenAddress";
import "./navbar.css";

const Navbar = () => {
  const { state, handler } = useContext(KudosContext);

  return (
    <div className='kudos__navbar'>
      <div className='kudos__navbar-logo'>
        <img src={logo} alt='logo' />
      </div>
      <div className='kudos__navbar-connect_wallet'>
        {!state.currentAccount ? (
          <button type='button' onClick={handler.connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div
            className='kudos__navbar-connected_wallet'
            type='button'
            onClick={handler.connectWallet}
          >
            <GoPrimitiveDot className='kudos__navbar-connected_wallet-circle' />
            {shortenAddress(state.currentAccount.toUpperCase())}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
