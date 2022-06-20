import "./cta.css";

const CTA = () => (
  <div className='kudos__cta section__margin'>
    <div className='kudos__cta-content' >
      <p>Do you want to know more about MTK?</p>
      <h3>Take a look at the MoreThanKudos collection at OpenSea</h3>
    </div>
    <a href={`https://testnets.opensea.io/collection/more-than-kudos-3qsvk1rpu1`} target="_blank" rel="noreferrer">
      <div className='kudos__cta-btn'>
        <button type='button'>View at OpenSea</button>
      </div>
    </a>
  </div>
);

export default CTA;
