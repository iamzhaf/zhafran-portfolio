import { Brain, Database, LineChart, Briefcase, ShieldCheck } from "lucide-react";

const TIMELINE = [
  {
    id: 1,
    label: "Jan 2026 - Present",
    year: "2026",
    title: "Lead Data Analyst",
    desc: "A*STAR Singapore",
    icon: <Database className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    label: "Jun 2025 - Sep 2025",
    year: "2025",
    title: "Digital Transformation Consultant",
    desc: "TERS Consulting (Construction Company)",
    icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 3,
    label: "Apr 2024 - Oct 2024",
    year: "2024",
    title: "Data Governance Analyst",
    desc: "DBS Bank, Singapore",
    icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: 4,
    label: "Feb 2024 - Dec 2024",
    year: "2024",
    title: "LIBOR Data Analyst, AVP",
    desc: "Standard Chartered Bank, Singapore",
    icon: <LineChart className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: 5,
    label: "Feb 2023 - Feb 2024",
    year: "2023",
    title: "Data Scientist",
    desc: "Maybank, Singapore",
    icon: <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    id: 6,
    label: "Mar 2020 - Mar 2023",
    year: "2023",
    title: "Data Scientist II",
    desc: "Validus Capital, Singapore",
    icon: <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "from-fuchsia-400 to-purple-500",
  },
  {
    id: 7,
    label: "Feb 2019 - Mar 2020",
    year: "2020",
    title: "Associate Consultant/Data Analyst",
    desc: "KPMG, Singapore",
    icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 8,
    label: "Sep 2017 - Oct 2018",
    year: "2018",
    title: "Data Analyst",
    desc: "Dun & Bradstreet",
    icon: <LineChart className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "from-blue-500 to-indigo-600",
  },
];

export default function WorkTimeline({ dark_mode }) {
  return (
    <div className="relative mx-auto max-w-4xl px-2 md:px-4 py-8 md:py-12">
      {/* Central Vertical Line */}
      <div className="absolute left-[35px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-fuchsia-500 to-indigo-500 md:-translate-x-1/2 opacity-30 rounded-full" />

      <div className="flex flex-col gap-10 md:gap-16 relative z-10">
        {TIMELINE.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row items-start md:items-center w-full group ${
                isLeft ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Card Container */}
              <div className={`w-full md:w-[45%] ml-[70px] md:ml-0 flex flex-col transition-all duration-300 transform group-hover:-translate-y-1 ${isLeft ? "md:items-start" : "md:items-end"}`}>
                <div
                  className={`relative p-5 md:p-6 rounded-2xl border shadow-lg backdrop-blur-md transition-colors duration-300 w-full ${
                    dark_mode
                      ? "bg-neutral-900/80 border-neutral-700/50 group-hover:border-indigo-500/50"
                      : "bg-white/90 border-neutral-200/50 group-hover:border-indigo-400/50"
                  }`}
                >
                  <div className={`mb-3 inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider ${dark_mode ? "bg-neutral-800/80 text-indigo-300" : "bg-indigo-100/80 text-indigo-800"}`}>
                    {item.label}
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold ${dark_mode ? "text-white" : "text-gray-900"}`}>
                    {item.title}
                  </h3>
                  <p className={`mt-2 text-sm font-medium ${dark_mode ? "text-neutral-400" : "text-neutral-600"}`}>
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Center Node / Icon */}
              <div className="absolute left-[15px] md:static md:w-[10%] flex justify-center z-20 mt-4 md:mt-0">
                <div
                  className={`w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${item.color} shadow-lg ring-4 ${
                    dark_mode ? "ring-neutral-950" : "ring-neutral-50"
                  } transform transition-transform duration-300 group-hover:scale-110`}
                >
                  {item.icon}
                </div>
              </div>

              {/* Empty Space for the other side */}
              <div className="hidden md:block w-[45%]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

