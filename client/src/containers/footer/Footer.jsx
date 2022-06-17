import logo from "../../assets/logo-zemoga.png";
import "./footer.css";

const Footer = () => (
 <div className='kudos__footer section__padding'>
  <div className='kudos__footer-links'>
   <div className='kudos__footer-links_logo'>
    <img src={logo} alt='logo' />
    <p>Copyright © 2022 Zemoga.com</p>
   </div>
   <div className='kudos__footer-links_div'>
    <h4>Links</h4>
    <p>Kudos Collection</p>
    <p>Social Media</p>
    <p>Etherscan</p>
    <p>Contract</p>
   </div>
   <div className='kudos__footer-links_div'>
    <h4>Company</h4>
    <p>Terms & Conditions </p>
    <p>Privacy Policy</p>
    <p>Contact</p>
   </div>
   <div className='kudos__footer-links_div'>
    <h4>Any help?</h4>
    <p>Zemoga.com</p>
    <p>(57) 601 744 3555</p>
    <p>info@zemoga.com</p>
   </div>
  </div>

  <div className='kudos__footer-copyright'>
   <p>@2022 Zemoga. All rights reserved.</p>
  </div>
 </div>
);

export default Footer;
