import { GoArrowUpRight } from "react-icons/go";

const cards = [
  { title: "Patient Management", id: "1" },
  { title: "Operation Services", id: "2" },
  { title: "Patient Management", id: "3" },
  { title: "Patient Management", id: "4" },
];

const Cards = () => {
  return (
    <div className="w-full flex flex-wrap gap-5">
      {
        cards.map((card) => (
          <div
            key={card.id}
            style={{ width: 'calc(50% - 12px)' }}
          >
            <div className="card p-32" style={{ borderRadius: "16px 16px 128px 16px" }}>
              <div className="relative flex flex-col gap-5">
                <h1 className="text text-lg font-[500] leading-tight">{card.title}</h1>
                <div className="relative h-16 w-full">
                  <div className="absolute bg-primary h-24 w-24 rounded-full bottom-0 right-0 translate-x-[20px] translate-y-[20px] flex items-center justify-center rotate-45">
                    <GoArrowUpRight rotate={100} size={40} color="#f5e9dd" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Cards