
const Spinner = () => {
  return (
    <div className="flex justify-center animate-spin">
      <div className="border-4 border-sky-900 rounded-full w-12 h-12" style={{borderRightColor: "transparent"}}></div>
    </div>
  );
};

export default Spinner;
