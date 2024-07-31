import { PHistoryCard, FilterBtn } from "../../components";

const PatientHistory = () => {
  return (
    <div className="main flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between ">
        <div className="li w-full flex justify-start ">
          <FilterBtn></FilterBtn>
        </div>
        <div className="right flex flex-row gap-4">
          <div className="view-btn text-white">V</div>
          <div className="Plus-btn text-white">P</div>
        </div>
      </div>
      <PHistoryCard></PHistoryCard>
    </div>
  );
};

export default PatientHistory;
