import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowRight, ExternalLink, MapPin, CodeXml } from "lucide-react";
import "./App.css";
import WorkTimeline from "./components/WorkTimeLine";
import DigitalClock from "./components/DigitalClock";
import ParticlesBackground from "./components/ParticlesBackground";

const years_experience = 8;

const PROFILE = {
  banner_message: "Welcome to Zhafran's Portfolio",
  name: "Muhammad Zhafran",
  header_role: "Data Analyst • ML/AI Builder • Data Enthusiast ",
  base_location: "Singapore",
  years_experience: 8,
  header_blurb:
    "I am driven by purpose. I transform business problems into data-driven human-centric solutions end‑to‑end — from data collection to statistical analysis to ML/AI models to dashboard/data visualization apps.",
  about_blurb: {
    first_para: 
    "I’m an ex-Police Officer and an economics graduate turned Data Analyst and ML/AI Builder.",
    second_para: "I graduated from the University of London with Honours in Bachelor of Science in Economics and Finance. I also have a Diploma in Engineering Informatics from Nayang Polytechnic, Singapore",
    third_para: `Over the past ${years_experience} years, I have worked in Banking, FinTech, Consulting and Credit Risk Management, helping businesses and teams streamline processes, and transform data into actionable insights and solutions.`,
    last_para:  
    "Outside of work, I do photography and bouldering. I also enjoy tinkering with machine learning models, AI applications and web development projects.",
    },
    links: {
    github: "https://github.com/iamzhaf",
    linkedin: "https://www.linkedin.com/in/mdzhafranbb",
    email: "mailto:muhd.zhafranb@gmail.com",
  },
};

const PROJECTS = [
  {
    title: "Finwise — Budget & Cash Flow App",
    description:
      "Plotly Dash / React prototype that scans receipts with GenAI to auto‑categorize expenses. PostgreSQL + RAG for knowledge tips.",
    tech: ["Python", "Dash", "PostgreSQL", "OpenAI"],
    url: "https://github.com/iamzhaf",
  },
    {
    title: "Geoology & Site Investigation Dashboard",
    description:
      "Pandas + Streamlit + Plotly to transform geology and site investigation data efficiently into actionable soil, and geospatial insights and solutions.",
    tech: ["Python", "Streamlit", "Pandas", "Plotly", "QGIS","Folium"],
    url: "https://github.com/iamzhaf",
  },
  {
    title: "SmartOps — Manpower Roster Engine",
    description:
      "Flask backend + React front‑end using Google Sheets as a low‑cost DB. Rule‑based planning with export to Excel/PDF.",
    tech: ["Flask", "React", "gspread", "Google Cloud"],
    url: "https://your-demo-or-",
  },
  {
    title: "Corporate Entities Insights Dashboard",
    description:
      "Plotly dashboards with entity search, filtering, and KPI drill‑downs.",
    tech: ["Python", "Pandas", "Plotly"],
    url: "https://github.com/iamzhaf",
  },
];

const SKILLS = [
  "Python", "SQL", "PostgreSQL" ,"Pandas", "NumPy", "TensorFlow", "Deep Learning", "Statistical Modelling", "Scikit‑learn", "PySpark", "Flask",
  "React", "JavaScript", "Power BI", "Tableau", "Docker",
  "DuckDB", "GCP", "Data Governance" , "Probability Theory" , "Econometrics" , "Time Series Analysis", "Machine Learning"];

export default function Portfolio({
  dark
}) {
  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check if there is a resize event immediately
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // unmount or remove event listener
  }, []);

  return (
    <div className={dark ? "min-h-screen bg-neutral-950 text-neutral-100" : "min-h-screen bg-neutral-50 text-neutral-900"}>
      {/* ==================================== NAVBAR ==================================== */}

      {/* ====================================  BANNER ========================================= */}
      <section className="relative w-full h-[35vh] py-[50px] md:py-24 bg-[url('/banner.JPG')] bg-cover bg-center bg-no-repeat overflow-hidden">
        
        {/* Translucent overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Particles overlay */}
        <ParticlesBackground
          baseCount={isMobile ? 10 : 300}
          speed={isMobile ? 0.05 : 0.1}
          connect={true}
          color="rgba(255, 255, 255, 0.7)"
          radius={isMobile ? 1.5 : 10}
          linkColor="rgba(255, 255, 255,0.7)"
          linkDistance={isMobile ? 80 : 150}
          linkOpacity={1}
          lineWidth={isMobile ? 1.5 : 2.3}
          zIndex={100}
        />

        {/* Content on top of particles */}
        <div className="relative z-20 flex justify-center items-center h-full translate-y-[-50px]">
          <div className="flex flex-col items-center gap-2">
            <p className="text-1xl font-semibold font-mono text-gray-300">Current Time</p>
            <DigitalClock isMobileStatus={isMobile ? "mobile" : "desktop"} />
          </div>
        </div>
      </section>


      {/* ==================================== HERO SECTION ==================================== */}
      <section className="mx-auto max-w-3/4 px-2 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-5/8 w-full">
            <p className={dark ? "typewriter text-xl md:text-4xl text-center text-indigo-600" : "typewriter text-xl md:text-4xl text-center text-indigo-800"}>
              Hello, I'm <span className="font-bold text-xl md:text-5xl">{PROFILE.name}.</span>
            </p>
            <h1 className={dark ? "mt-5 text-xl md:text-3xl leading-tight font-semibold text-gray-300" : "mt-5 text-xl md:text-3xl leading-tight font-semibold text-gray-700"}>
              {PROFILE.header_role}
            </h1>
            <p className="mt-4 text-base md:text-lg opacity-80">
              {PROFILE.header_blurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <a href={PROFILE.links.github} target="_blank" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-neutral-300 white:border-neutral-700 hover:bg-indigo-400">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href={PROFILE.links.linkedin} target="_blank" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-neutral-300 white:border-neutral-700 hover:bg-indigo-400">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href={PROFILE.links.email} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-neutral-300 white:border-neutral-700 hover:bg-indigo-400">
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2 opacity-100 text-sm justify-center">
              <p className="flex items-baseline gap-2"> I'm located in <MapPin className="h-5 w-5" />
                  <span className={dark ? "text-2xl text-white" : "text-2xl text-black-900"}> {PROFILE.base_location}</span>
              </p>
            </div>  
          </div>
          <div className="md:w-3/8 max-w-screen-lg mx-auto">
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-indigo-500 via-violet-600 to-fuchsia-500 shadow-lg">
              <div className={dark ? "rounded-3xl p-6 md:p-10 bg-neutral-900 text-white [box-shadow:0_0_0_1px_rgba(168,85,247,0.3),0_0_30px_5px_rgba(168,85,247,0.15)]" : "rounded-3xl p-6 md:p-10 bg-white text-gray-800"}>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {PROJECTS.slice(0, 4).map((p, i) => (
                    <article key={i} className={`rounded-2xl border p-4 hover:shadow-md transition ${
                      dark ? 'border-neutral-800' : 'border-neutral-200 bg-white'
                    }`}>
                      <h3 className="font-semibold text-sm md:text-base">{p.title}</h3>
                      <p className="mt-1 text-xs md:text-sm text-opacity-80 line-clamp-3">{p.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {p.tech.map((t, j) => (
                          <span key={j} className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full border ${
                            dark ? 'border-neutral-700 bg-neutral-800/50 text-white' : 'border-neutral-300 bg-gray-50 text-gray-800'
                          }`}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
                <a href="#projects" className={`mt-4 md:mt-6 inline-flex items-center gap-2 text-sm font-medium ${
                  dark ? 'text-white' : 'text-gray-800'
                }`}>
                  See all projects <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-[75%] px-2 py-16 md:py-24 border-t border-neutral-200/60 dark:border-neutral-800/60"
      >
        <h2 className="text-2xl md:text-5xl font-semibold font-mono tracking-wider text-center mb-6">About Me</h2>

        <div className="flex flex-col gap-6 justify-center items-center text-center">
          <div className="max-w-3xl">
            <p className="mt-3 opacity-90 text-md md:text-lg">
              {PROFILE.about_blurb.first_para}
            </p>
          </div>
          <div className="max-w-3xl">
            <p className="mt-3 opacity-90 text-md md:text-lg">
              {PROFILE.about_blurb.second_para}
            </p>
          </div>
          <div className="max-w-3xl">
            <p className="mt-3 opacity-90 text-md md:text-lg">
              {PROFILE.about_blurb.third_para}
            </p>
          </div>
          <div className="max-w-3xl">
            <p className="mt-3 opacity-90 text-md md:text-lg">
              {PROFILE.about_blurb.last_para}
            </p>
          </div>
        </div>
        

        {/* WORK TIMELINE */} 
        <div className="mt-16">
          <WorkTimeline dark_mode={dark} />
        </div>

      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-[75%] px-2 py-16 md:py-24 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">Projects</h2>
          <a href="https://github.com/your-username?tab=repositories" target="_blank" className="text-sm opacity-80 hover:opacity-100">All repos →</a>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <article key={i} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 hover:shadow-md transition flex flex-col">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 opacity-80 text-sm flex-1">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t, j) => (
                  <span key={j} className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700">
                    {t}
                  </span>
                ))}
              </div>
              <a href={p.url} target="_blank" className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                Visit <ExternalLink className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mx-auto max-w-[75%] px-2 py-16 md:py-24 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <h2 className="text-2xl md:text-5xl font-semibold font-mono tracking-wider">Skills</h2>
        <div className="mt-4 flex flex-wrap gap-2 justify-center items-center max-w-5xl mx-auto">
          {SKILLS.map((s, i) => (
            <span key={i} className="text-md md:text-lg px-5 py-1 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-[75%] px-2 py-16 md:py-24 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <h2 className="text-2xl md:text-5xl font-semibold font-mono tracking-wider text-center">Get in touch</h2>
        <div className="flex flex-wrap gap-2 justify-center items-center">
        <p className="mt-3 opacity-80 max-w-3xl">
          Open to full‑time roles and collaborations. The fastest way to reach me is via email or LinkedIn.
        </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 justify-center items-center">
          <a href={PROFILE.links.email} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:shadow">
            <Mail className="h-4 w-4" /> Email me
          </a>
          <a href={PROFILE.links.linkedin} target="_blank" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:shadow">
            <Linkedin className="h-4 w-4" /> Connect
          </a>
        </div>
        <p className="mt-6 text-xs opacity-60">© {new Date().getFullYear()} {PROFILE.name}.All rights reserved. Built with React + Tailwind.</p>
      </section>
    </div>
  );
}
