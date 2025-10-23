import { useEffect, useRef } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidLeftArrow } from "react-icons/bi";

const TIMELINE = [
  { id: 1, label: "Jun 2025 - Sep 2025", year: "2025", title: "Digital Transformation Lead", desc: "TERS Consulting (Construction Company)" },
  { id: 2, label: "Apr 2024 - Oct 2024", year: "2024", title: "Data Governance Analyst", desc: "DBS Bank, Singapore" },
  { id: 3, label: "Feb 2024 - Dec 2024", year: "2024", title: "LIBOR Data Analyst, AVP", desc: "Standard Chartered Bank, Singapore" },
  { id: 4, label: "Feb 2023 - Feb 2024", year: "2023", title: "Data Scientist", desc: "Maybank, Singapore" },
  { id: 5, label: "Mar 2020 - Mar 2023", year: "2023", title: "Data Scientist II", desc: "Validus Capital, Singapore" },
  { id: 6, label: "Feb 2019 - Mar 2020", year: "2020", title: "Associate Consultant/Data Analyst", desc: "KPMG, Singapore" },
  { id: 7, label: "Sep 2017 - Oct 2018", year: "2018", title: "Data Analyst", desc: "Dun & Bradstreet" },
];

export default function WorkTimeline({ dark_mode }) {
  const trackRef = useRef(null);


  // Keyboard arrows to move the timeline when the track is focused
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") el.scrollBy({ left: el.clientWidth * 0.8, behavior: "smooth" });
      if (e.key === "ArrowLeft")  el.scrollBy({ left: -el.clientWidth * 0.8, behavior: "smooth" });
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  const scrollByAmount = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-4 flex flex-col items-center justify-between justify-center">
        <h2 className="text-2xl md:text-5xl font-semibold font-mono tracking-wider text-center mb-6">Career Journey</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scrollByAmount(-1)}
            className={`flex items-center justify-center rounded-full w-12 h-12 border ${dark_mode ? "bg-neutral-300 hover:bg-neutral-100 focus:outline-none focus:ring focus:ring-white/20  border-indigo-600" : "bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-white/20 border-indigo-600"} `}
            aria-label="Previous"
          >
            <BiSolidLeftArrow className="text-indigo-600 text-4xl"/>
          </button>
          <button
            onClick={() => scrollByAmount(1)}
            className={`flex items-center justify-center rounded-full w-12 h-12 border ${dark_mode ? "bg-neutral-300 hover:bg-neutral-100 focus:outline-none focus:ring focus:ring-white/20  border-indigo-600" : "bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-white/20 border-indigo-600"}`}
            aria-label="Next"
          >
            <BiSolidRightArrow className="text-indigo-600 text-4xl"/>
          </button>
        </div>
      </div>

      {/* Track */}
    <div
    ref={trackRef}
    tabIndex={0}
    role="list"
    aria-label="Timeline"
    className="
        relative min-h-[280px]
        overflow-x-auto
        snap-x snap-mandatory
        focus:outline-none
        group no-scrollbar
    "
    >
    {/* Move the baseline INSIDE the scroll content and keep it at 50% */}
    <ul className="relative flex gap-16 md:gap-20 pr-12 py-8 min-w-max w-full">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-neutral-700/70 z-0" />

        {TIMELINE.map((item) => (
        <li
            key={item.id}
            role="listitem"
            aria-label={`${item.label}: ${item.title}`}
            className="
            snap-start shrink-0 relative z-10
            grid grid-rows-[auto_65px_auto]
            items-center justify-items-center
            "
        >
            {/* Top label */}
            <div className={`mb-2 text-center font-mono tracking-wider ${dark_mode ? "text-white" : "text-black"} text-base md:text-lg`}>
            {item.label}
            </div>

            {/* Middle row: dot is 48px tall, baseline passes through its center */}
            <div className="row-start-2 row-end-3 grid place-items-start">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-700 to-violet-400 ring-2 ring-neutral-600 shadow grid place-items-center translate-y-[30px]">
                <span className="text-xl">🚀</span>
            </div>
            </div>

            {/* Bottom card */}
            <div className={`row-start-3 mt-5 w-74 rounded-xl p-4 shadow hover:border-neutral-700 translate-y-[35px] ${dark_mode ? "bg-neutral-900/70" : "bg-neutral-400/70"}`}>
            <div className="text-sm font-semibold">{item.title}</div>
            <p className={dark_mode ? "mt-1 font-medium text-sm text-neutral-300" : "mt-1 font-medium text-sm text-neutral-800"}>{item.desc}</p>
            </div>
        </li>
        ))}

        {/* trailing spacer so last item isn’t clipped */}
        <li aria-hidden className="shrink-0 w-6 md:w-12" />
    </ul>
    </div>

      {/* Mobile hint */}
      <p className="mt-3 text-xs text-neutral-400 md:hidden">Tip: swipe left/right or use the buttons.</p>
    </section>
  );
}
