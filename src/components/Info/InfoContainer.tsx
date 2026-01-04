import LocationIcon from "../icons/LocationIcon";
import InfoSelectCity from "./InfoSelectCity";

export default function InfoContainer() {
  return (
    <div className="flex gap-1 min-[1160px]:mt-14">
      <LocationIcon />
      <InfoSelectCity />
    </div>
  );
}
