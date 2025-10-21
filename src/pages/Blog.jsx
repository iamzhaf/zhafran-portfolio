import { Link } from 'react-router-dom';


const posts = [
{
id: 'finwise-story',
title: 'Why I Built Finwise',
date: '2025-10-15',
excerpt: 'Turning receipts into self-awareness: how I designed a money app to connect spending with happiness.',
tags: ['Product', 'Python', 'Dash'],
},
{
id: 'learn-react-unemployment',
title: 'Learning React During Unemployment',
date: '2025-10-12',
excerpt: 'How I turned a tough season into a portfolio site, animations, and a growth mindset.',
tags: ['React', 'Career'],
},
];


export default function Blog() {
return (
<section className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100">
<div className="max-w-3xl mx-auto px-5 py-16">
<header className="mb-12 text-center">
<h1 className="text-4xl font-serif font-bold tracking-tight">Articles</h1>
<p className="mt-2 text-gray-500 dark:text-gray-400">Clean, readable posts — Medium vibes, your voice.</p>
</header>


<ul className="space-y-8">
{posts.map((p) => (
<li key={p.id} className="border-b border-gray-200/70 dark:border-white/10 pb-8">
<Link to={`/writeups/${p.id}`} className="group block rounded-xl -mx-3 px-3 py-2 transition hover:bg-gray-50 dark:hover:bg-white/5">
<h2 className="text-2xl font-serif font-bold group-hover:translate-x-0.5 transition">{p.title}</h2>
<div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{new Date(p.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}</div>
<p className="mt-3 text-gray-700 dark:text-gray-300">{p.excerpt}</p>
<div className="mt-4 flex flex-wrap gap-2">
{p.tags.map((t) => (
<span key={t} className="text-xs rounded-full border border-gray-300 dark:border-white/20 px-2 py-1 text-gray-600 dark:text-gray-200">{t}</span>
))}
</div>
</Link>
</li>
))}
</ul>
</div>
</section>
);
}