const counts = [
  {
    count: 2500,
    label: "Girls Helped",
  },
  {
    count: "15k+",
    label: "Pads Distributed",
  },
  {
    count: 300,
    label: "Schools Reached",
  },
  {
    count: 500,
    label: "Volunteers",
  },
];

const DataCount = () => {
  return (
    <div className="w-[95%] bg-[#FFF5F9] flex flex-row justify-between px-16">
      {counts.map((item, index) => (
        <aside
          key={index}
          className="flex flex-col items-center justify-center p-4"
        >
          <h2
            className="text-[72px] font-bold text-[#989797]"
            style={{
              fontFamily: "OpenSans-Semi",
            }}
          >
            {item.count}
          </h2>
          <p className="text-[24px] text-[#393939]" style={{
            fontFamily: "OpenSans"
          }}>{item.label}</p>
        </aside>
      ))}
    </div>
  );
};

export default DataCount;
