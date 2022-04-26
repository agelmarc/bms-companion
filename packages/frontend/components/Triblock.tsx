import { useDispatch } from "react-redux";

import WorldSelect from "./svg/WorldSelect";
import { setActiveWorld } from "@lib/activeWorld";
import useMapConfig from "@lib/hooks/useMapConfig";
import { Dimension } from "types";

const Triblock: React.FC = ({}) => {
  const config = useMapConfig();
  const dispatch = useDispatch();

  if (!config) return null;
  const keys = Object.keys(config);
  return (
    <div className="w-full mt-auto">
      <div className="w-2/3 mx-auto my-16">
        <WorldSelect
          onClick0={() => {
            if (keys.includes(Dimension.Overworld))
              dispatch(setActiveWorld(Dimension.Overworld));
          }}
          onClick1={() => {
            if (keys.includes(Dimension.Nether))
              dispatch(setActiveWorld(Dimension.Nether));
          }}
          onClick2={() => {
            if (keys.includes(Dimension.End))
              dispatch(setActiveWorld(Dimension.End));
          }}
          disabled0={!keys.includes(Dimension.Overworld)}
          disabled1={!keys.includes(Dimension.Nether)}
          disabled2={!keys.includes(Dimension.End)}
        />
      </div>
    </div>
  );
};

export default Triblock;
