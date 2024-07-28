
import { Cards, DocterCards } from "../components";
const Home = () => {


  return (
    <div className="flex flex-col gap-5 max-w-[100vw] h-full">

      <DocterCards />

      <div className="para-size w-screen text-left font-extralight flex flex-col justify-center gap-5">
        <p className="text text-sm font-thin">
          Efficiently manage patient records,appointments and hospitals
          operations with HospiTech.
        </p>
        <div className="Title-heading flex text-left screen font-medium text-3xl">
          <h1 className="text font-thin ">Why Choose <br /> <span className="Hospitech text-red-500 font-bold text-3xl font-arial">HospiTech?</span> </h1>
        </div>
      </div>

      <Cards title="hello" />
      


    </div>
  );
};

export default Home
