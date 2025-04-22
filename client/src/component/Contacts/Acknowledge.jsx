import { AcknowledgementContent } from "../../Data";
// import SectionHeader from "../../utility/SectionHeader.jsx";

const Acknowledgement = () => {
  return (
    <>
      {/* <div className="my-7">
        <SectionHeader title="Guidelines" />
      </div> */}
      <section
        className="relative w-full bg-cover bg-center py-20 px-4 md:px-10"
        style={{
          backgroundImage: `url(${AcknowledgementContent.image})`,
        }}
      >
        <div className="absolute inset-0 bg-emerald-800/70 bg-opacity-60"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-6 drop-shadow-lg">
            {AcknowledgementContent.title}
          </h2>

          <p className="text-lg font-medium mb-6 text-gray-200 leading-relaxed">
            {AcknowledgementContent.intro}
          </p>

          <ul className="list-disc pl-6 space-y-4 text-base text-gray-200">
            {AcknowledgementContent.guidelines.map((item, index) => {
              const [bold, rest] = item.text.split(" — ");
              return (
                <li key={index}>
                  {item.icon}{" "}
                  <span className="font-semibold text-white">{bold}</span> —{" "}
                  {rest}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 text-sm text-gray-300">
            📮{" "}
            <span className="font-semibold text-white">
              {AcknowledgementContent.complaintText.split(" If ")[0]}
            </span>{" "}
            If {AcknowledgementContent.complaintText.split(" If ")[1]}{" "}
            <a
              href={`mailto:${AcknowledgementContent.complaintEmail}`}
              className="text-blue-400 hover:underline font-medium"
            >
              {AcknowledgementContent.complaintEmail}
            </a>
            .
          </div>

          <p className="text-sm text-gray-400 mt-6">
            {AcknowledgementContent.footer}
          </p>
        </div>
      </section>
    </>
  );
};

export default Acknowledgement;
