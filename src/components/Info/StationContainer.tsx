import StationIcon from "../icons/StationIcon";
import InfoSelectStation from "./InfoSelectStation";

export default function StationContainer() {
  return (
    <div className="flex gap-1 min-[1160px]:mt-14">
      <StationIcon />
      <InfoSelectStation />
    </div>
  );
}
