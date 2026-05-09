import React from 'react';
import { nodes } from './SkillsNetwork3D';

export default function SkillsList({ dark_mode }) {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-2 md:gap-3 max-w-5xl mx-auto relative z-10 px-2">
      {nodes.map((node) => {
        let borderClass = "";
        let bgClass = "";

        if (node.group === "ds") {
          bgClass = dark_mode ? "bg-fuchsia-500/10 text-fuchsia-300" : "bg-fuchsia-50 text-fuchsia-700";
          borderClass = dark_mode ? "border border-fuchsia-500/30 hover:border-fuchsia-500/60 hover:bg-fuchsia-500/20" : "border border-fuchsia-200 hover:border-fuchsia-300 hover:bg-fuchsia-100";
        } else if (node.group === "de") {
          bgClass = dark_mode ? "bg-blue-500/10 text-blue-300" : "bg-blue-50 text-blue-700";
          borderClass = dark_mode ? "border border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/20" : "border border-blue-200 hover:border-blue-300 hover:bg-blue-100";
        } else if (node.group === "dev") {
          bgClass = dark_mode ? "bg-amber-500/10 text-amber-300" : "bg-amber-50 text-amber-700";
          borderClass = dark_mode ? "border border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/20" : "border border-amber-200 hover:border-amber-300 hover:bg-amber-100";
        } else if (node.group === "domain") {
          bgClass = dark_mode ? "bg-emerald-500/10 text-emerald-300" : "bg-emerald-50 text-emerald-700";
          borderClass = dark_mode ? "border border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-500/20" : "border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-100";
        }

        return (
          <span 
            key={node.id}
            className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-medium ${bgClass} ${borderClass} transition-all duration-300 cursor-default shadow-sm backdrop-blur-sm transform hover:-translate-y-1 hover:shadow-md`}
          >
            {node.id}
          </span>
        );
      })}
    </div>
  );
}
