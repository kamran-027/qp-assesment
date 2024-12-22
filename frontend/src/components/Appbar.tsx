import Login from "./Login";

const Appbar = () => {
  return (
    <div className="flex items-center justify-between p-4 border border-solid border-black">
      <h2 className="text-3xl font-semibold tracking-tight">Grocery IT</h2>

      <Login />
    </div>
  );
};

export default Appbar;
