import associate1 from "../../../assets/images/associates-1.png";
import associate2 from "../../../assets/images/associates-2.png";
import associate3 from "../../../assets/images/associates-3.png";
import associate4 from "../../../assets/images/associates-4.png";

const Associates = () => {
  return (
    <>
      <div className="associates bg-[#ebebeb]">
        <div className="container grid grid-cols-4 justify-between items-center">
          <img src={associate1} alt="asssiates-logo" className="assciates__logo max-w-[90%] h-auto mx-auto" />
          <img src={associate4} alt="asssiates-logo" className="assciates__logo max-w-[90%] h-auto mx-auto" />
          <img src={associate2} alt="asssiates-logo" className="assciates__logo max-w-[90%] h-auto mx-auto" />
          <img src={associate3} alt="asssiates-logo" className="assciates__logo max-w-[90%] h-auto mx-auto" />
        </div>
      </div>
    </>
  );
};

export default Associates;
