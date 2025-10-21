// Navbar.jsx
import { Link } from "react-router-dom";
import { CodeXml, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
// ❌ remove: import "./App.css";

export default function Navbar({ 
    dark, 
    setDark, 
    banner = "",
    isMobile }) {
  const [open, setOpen] = useState(false);
  const linkCls = "opacity-70 transition hover:opacity-100";

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-[100] w-[100vw] bg-white/20 dark:bg-neutral-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200/60 dark:border-neutral-800/60 text-black dark:text-white"
      style={{ margin: 0, padding: 2 }}
    >
      <div className="w-full max-w-full px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-10">
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow">
            <CodeXml className="h-5 w-5 text-white" />
          </div>
          {isMobile === "desktop" ? 
          <span className="font-semibold text-xl">{banner}</span> : null}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="/#about" className={linkCls}>About</a>
          <a href="/#projects" className={linkCls}>Projects</a>
          <a href="/#skills" className={linkCls}>Skills</a>
          <a href="/#contact" className={linkCls}>Get in touch</a>
          <Link to="/writeups" className={linkCls}>Write-ups</Link>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="text-xs rounded-xl px-3 py-1 border border-neutral-300 dark:border-neutral-700 hover:bg-indigo-50 dark:hover:bg-indigo-900"
            aria-label="Toggle theme"
          >
            {dark ?  <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg border border-transparent hover:shadow"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="mobile-nav"
          className="
            md:hidden px-4 pb-3
            bg-white/70 dark:bg-neutral-900/70 backdrop-blur
            border-t border-neutral-200/60 dark:border-neutral-800/60
          "
        >
          <ul className="flex flex-col gap-2 text-sm">
            <li><a className={linkCls} href="/#about" onClick={() => setOpen(false)}>About</a></li>
            <li><a className={linkCls} href="/#projects" onClick={() => setOpen(false)}>Projects</a></li>
            <li><a className={linkCls} href="/#skills" onClick={() => setOpen(false)}>Skills</a></li>
            <li><a className={linkCls} href="/#contact" onClick={() => setOpen(false)}>Get in touch</a></li>
            <li><Link className={linkCls} to="/writeups" onClick={() => setOpen(false)}>Write-ups</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
