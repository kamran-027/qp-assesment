import Checkout from "./Checkout";

const Appbar = () => {
  return (
    <div className="flex items-center justify-between p-4 border border-solid border-black h-full bg-[#CCD6A6]">
      <h2 className="text-3xl font-extrabold font-semibold tracking-tight text-center font-yu text-stone-700">
        GroRacery
      </h2>
      <Checkout />
    </div>
  );
};

export default Appbar;
