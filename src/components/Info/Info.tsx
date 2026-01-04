import InfoContainer from "./InfoContainer";
import StationContainer from "./StationContainer";

export default function Info() {
  return (
    <div className="min-[1160px]:w-125 min-[1160px]:h-100 w-[90%] left-[5%] bg-[#313236] absolute min-[1160px]:top-50p min-[1160px]:-translate-y-[50%] min-[1160px]:left-20 rounded-2xl box-border bottom-unset p-4 z-20 max-[1160px]:top-full top-[50%] -translate-y-[100%] max-[1160px]:flex justify-between">
      <InfoContainer />
      <StationContainer />
    </div>
  );
}
