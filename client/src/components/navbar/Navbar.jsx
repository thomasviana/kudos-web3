import logo from "../../assets/logo-zemoga.png";
import "./navbar.css";

const Navbar = () => {
 return (
  <div className='kudos__navbar'>
   <div className='kudos__navbar-logo'>
    <img src={logo} alt='logo' />
   </div>
   <div className='kudos__navbar-connect_wallet'>
    <button type='button'>Connect Wallet</button>
   </div>
  </div>
 );
};

export default Navbar;
