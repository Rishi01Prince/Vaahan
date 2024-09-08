// import { companyLogos } from "../constants";

import bike from "../assets/vechicle/bike.png";
import car from "../assets/vechicle/car.png";
import cycle from "../assets/vechicle/cycle.png";
import racercar from "../assets/vechicle/racercar.png";
import Scooty from "../assets/vechicle/Scooty.png";
import mountainbike from "../assets/vechicle/mountainbike.png";

const companyLogo = [cycle , bike, car , racercar ,mountainbike ,Scooty ];

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Helping people finding nearest vechicle  with one click
      </h5>
      <ul className="flex">
        {companyLogo.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[8.5rem]"
            key={index}
          >
            <img src={logo} width={100} height={28} alt={logo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
