
import { GoArrowUpRight } from "react-icons/go";

function DocterCards() {
  return (
    <>
      <div className="card flex justify-between">
        <div className="flex flex-col justify-between">
          <h1 className="text text-3xl">Hello, Doctor</h1>
          <h1 className="text"><span className="font-bold text-primary">Sunday, </span>16, Oct</h1>
        </div>

        <button className="relative bg-background-light flex items-center justify-center flex-col aspect-square h-full p-5 rounded-full ">
          <h1 className="text-color-light text-sm">Appoint</h1>
          <h1 className="flex items-center justify-center text-sm font-semibold leading-4 text-red-500 ">ments<GoArrowUpRight /></h1>

        </button>
      </div>
    </>
  );
}

export default DocterCards;
