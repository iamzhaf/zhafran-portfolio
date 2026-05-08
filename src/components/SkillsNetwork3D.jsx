import React, { useRef, useEffect, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";
import SpriteText from "three-spritetext";

// Define categories and colors
const GROUPS = {
  DS_AI: { id: "ds", color: "#d946ef", name: "Data Science & AI" }, // fuchsia-500
  DE_DB: { id: "de", color: "#3b82f6", name: "Data Engineering" }, // blue-500
  WEB_VIZ: { id: "web", color: "#f59e0b", name: "Web & Viz" }, // amber-500
  DOMAIN: { id: "domain", color: "#10b981", name: "Domain Knowledge" }, // emerald-500
};

// Map skills to their groups
const nodes = [
  { id: "Python", group: GROUPS.DS_AI.id, val: 30 },
  { id: "Pandas", group: GROUPS.DS_AI.id, val: 20 },
  { id: "NumPy", group: GROUPS.DS_AI.id, val: 20 },
  { id: "TensorFlow", group: GROUPS.DS_AI.id, val: 25 },
  { id: "Machine Learning", group: GROUPS.DS_AI.id, val: 25 },
  { id: "Deep Learning", group: GROUPS.DS_AI.id, val: 20 },
  { id: "Statistical Modelling", group: GROUPS.DS_AI.id, val: 20 },
  { id: "Scikit-learn", group: GROUPS.DS_AI.id, val: 20 },
  { id: "Probability Theory", group: GROUPS.DS_AI.id, val: 15 },
  { id: "Time Series Analysis", group: GROUPS.DS_AI.id, val: 15 },

  { id: "SQL", group: GROUPS.DE_DB.id, val: 25 },
  { id: "PostgreSQL", group: GROUPS.DE_DB.id, val: 20 },
  { id: "DuckDB", group: GROUPS.DE_DB.id, val: 15 },
  { id: "PySpark", group: GROUPS.DE_DB.id, val: 20 },
  { id: "Data Modelling", group: GROUPS.DE_DB.id, val: 20 },
  { id: "Docker", group: GROUPS.DE_DB.id, val: 20 },
  { id: "GCP", group: GROUPS.DE_DB.id, val: 20 },

  { id: "JavaScript", group: GROUPS.WEB_VIZ.id, val: 20 },
  { id: "React", group: GROUPS.WEB_VIZ.id, val: 25 },
  { id: "Flask", group: GROUPS.WEB_VIZ.id, val: 15 },
  { id: "Power BI", group: GROUPS.WEB_VIZ.id, val: 20 },
  { id: "Tableau", group: GROUPS.WEB_VIZ.id, val: 15 },
  { id: "Data Visualisation", group: GROUPS.WEB_VIZ.id, val: 25 },

  { id: "Data Governance", group: GROUPS.DOMAIN.id, val: 20 },
  { id: "Econometrics", group: GROUPS.DOMAIN.id, val: 15 },
  { id: "Banking & Finance", group: GROUPS.DOMAIN.id, val: 25 },
  { id: "Financial Risk", group: GROUPS.DOMAIN.id, val: 20 },
  { id: "Credit Risk", group: GROUPS.DOMAIN.id, val: 25 },
];

const links = [
  // DS_AI Links
  { source: "Python", target: "Pandas" },
  { source: "Python", target: "NumPy" },
  { source: "Python", target: "Scikit-learn" },
  { source: "Machine Learning", target: "Scikit-learn" },
  { source: "Machine Learning", target: "Deep Learning" },
  { source: "Deep Learning", target: "TensorFlow" },
  { source: "Python", target: "TensorFlow" },
  { source: "Statistical Modelling", target: "Probability Theory" },
  { source: "Statistical Modelling", target: "Time Series Analysis" },
  { source: "Machine Learning", target: "Statistical Modelling" },

  // DE_DB Links
  { source: "SQL", target: "PostgreSQL" },
  { source: "SQL", target: "DuckDB" },
  { source: "SQL", target: "Data Modelling" },
  { source: "Python", target: "PySpark" },
  { source: "PySpark", target: "Data Modelling" },
  { source: "Docker", target: "GCP" },
  { source: "PostgreSQL", target: "GCP" },

  // WEB_VIZ Links
  { source: "JavaScript", target: "React" },
  { source: "Python", target: "Flask" },
  { source: "Data Visualisation", target: "Power BI" },
  { source: "Data Visualisation", target: "Tableau" },
  { source: "React", target: "Data Visualisation" },
  
  // DOMAIN Links
  { source: "Banking & Finance", target: "Financial Risk" },
  { source: "Banking & Finance", target: "Credit Risk" },
  { source: "Financial Risk", target: "Credit Risk" },
  { source: "Econometrics", target: "Time Series Analysis" },
  { source: "Banking & Finance", target: "Econometrics" },
  { source: "Data Governance", target: "Data Modelling" },

  // Cross-Domain Core Links to pull graph together
  { source: "Python", target: "SQL" },
  { source: "Python", target: "JavaScript" },
  { source: "SQL", target: "Data Visualisation" },
  { source: "Machine Learning", target: "Credit Risk" },
];

const graphData = { nodes, links };

export default function SkillsNetwork3D({ dark_mode }) {
  const fgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef();

  // Resize graph on window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: 500, // Fixed height for section
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-rotate the graph
  useEffect(() => {
    const controls = fgRef.current?.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.2;
    }
  }, []);

  // Set physics config
  useEffect(() => {
    const fg = fgRef.current;
    if (fg) {
      fg.d3Force("charge").strength(-150); // Spread nodes apart
      fg.d3Force("link").distance(60); // Link length
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl bg-neutral-100 dark:bg-neutral-900/50">
      <ForceGraph3D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        backgroundColor={dark_mode ? "rgba(0,0,0,0)" : "rgba(250,250,250,0)"} // Transparent to let tailwind handle it
        showNavInfo={false}
        
        // Node Rendering: A Glowing Sphere with text next to it
        nodeThreeObject={(node) => {
          const group = Object.values(GROUPS).find((g) => g.id === node.group);
          const color = group ? group.color : "#ffffff";
          
          // Container for sphere + text
          const groupObj = new THREE.Group();
          
          // 1. Core Sphere
          const geometry = new THREE.SphereGeometry(node.val * 0.15, 16, 16);
          const material = new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.9,
          });
          const sphere = new THREE.Mesh(geometry, material);
          groupObj.add(sphere);

          // 2. Text Sprite
          const sprite = new SpriteText(node.id);
          sprite.color = dark_mode ? "#e5e5e5" : "#171717"; // Text color
          sprite.textHeight = 4 + (node.val * 0.1); // Size based on importance
          sprite.fontWeight = "bold";
          // Offset text so it doesn't overlap sphere
          sprite.position.set(0, - (node.val * 0.2 + 2), 0);
          groupObj.add(sprite);

          return groupObj;
        }}
        
        // Link Styling
        linkColor={() => dark_mode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}
        linkWidth={1.5}
        linkOpacity={0.6}
        
        // Interaction
        enableNodeDrag={true}
        onNodeClick={(node) => {
          // Aim at node from outside it
          const distance = 100;
          const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
          
          if(fgRef.current) {
              fgRef.current.cameraPosition(
                { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
                node, // lookAt ({ x, y, z })
                2000  // ms transition duration
              );
          }
        }}
      />
      
      {/* Legend overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 p-3 rounded-lg bg-white/80 dark:bg-black/60 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 pointer-events-none">
        <h4 className="text-xs font-semibold mb-1 uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Skill Categories</h4>
        {Object.values(GROUPS).map((g) => (
          <div key={g.id} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]" style={{ backgroundColor: g.color, boxShadow: `0 0 8px ${g.color}` }} />
            <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">{g.name}</span>
          </div>
        ))}
      </div>
      
      {/* Interaction Hint */}
      <div className="absolute bottom-4 right-4 z-10 text-xs text-neutral-500 dark:text-neutral-400 bg-white/80 dark:bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
        Drag to rotate • Scroll to zoom • Click node to focus
      </div>
    </div>
  );
}
