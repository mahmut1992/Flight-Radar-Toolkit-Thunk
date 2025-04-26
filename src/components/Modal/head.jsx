import { MdOutlineQuestionMark as Question } from "react-icons/md";
import c from "../../utils/nullcheck";
import { useDispatch } from "react-redux";
import { close } from "../../redux/slices/detailSlice";

const Head = ({ info }) => {
  const dispatch = useDispatch();
  return (
    <div className="head">
      <div>
        <h3 title="Çağrı İşareti">
          {info?.identification?.number?.default || <Question />}
        </h3>
        <span title="Uçuş No">{c(info?.identification?.callsign)} </span>
        <span title="Uçak Tip Kodu">{c(info?.aircraft?.model?.code)} </span>
      </div>
      <button onClick={() => dispatch(close())}>X</button>
    </div>
  );
};

export default Head;
