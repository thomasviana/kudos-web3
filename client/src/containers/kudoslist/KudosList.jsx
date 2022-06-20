import { useContext } from "react";
import { Kudos } from "../../components";
import { KudosContext } from "../../context/KudosContext";
import "./kudoslist.css";

const KudosList = () => {
  const { state } = useContext(KudosContext);
  return (
    <div className='kudos__kudos_list section__padding' >
      <h1>Kudos list</h1>
      <div className='kudos__kudos_list-container'>
        {state.kudos.map((item, index) => (
          <Kudos key={item + index} {...item} />
        ))}
      </div>
    </div >
  );

}
export default KudosList;
