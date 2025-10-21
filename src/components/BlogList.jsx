import { Link } from "react-router-dom";

const posts = [
  { id: "post1", url: "https://medium.com/@mzhafran/a-rigged-financial-system-b222c88040ea", title: "A rigged financial system? How Lower Interest Rates Drive Property Prices and Contribute to Wealth Inequality.", date: "Nov 4, 2024", desc: "How our financial system enriches the rich and widens wealth inequality." },
  { id: "post2", url: "https://www.linkedin.com/pulse/how-climbing-taught-me-pivot-lessons-growth-risks-zhafran-bahaman-sbm6c", title: "How Climbing Taught Me to Pivot: Lessons in Growth and Risk", date: "Oct 15, 2024", desc: "Lessons in growth and risk from my climbing journey." },
];

export default function BlogList({dark}) {
  return (
    <div className={dark ? "min-h-screen bg-neutral-950 text-neutral-100" : "min-h-screen bg-neutral-50 text-neutral-900"}>
            <section className="mx-auto max-w-3/4 px-2 py-16 md:py-24">
            <div className="max-w-5xl mx-auto translate-y-12">
                <h1 className="text-4xl font-bold mb-12 text-center font-mono">Articles</h1>
                <div className="space-y-8">
                {posts.map((post) => (
                    post.url ? (
                        <Link
                        key={post.id}
                        to={post.url}
                        className="block border-b-3 border-gray-900 pb-9 transition hover:border-indigo-600 block text-left"
                        >
                        <h2 className={dark ? "text-2xl font-bold font-mono text-white" : "text-2xl font-bold font-mono text-gray-800"}>{post.title}</h2>
                        <p className={dark ? "text-gray-200 text-sm mt-1" : "text-gray-500 text-sm mt-1"}>{post.date}</p>
                        <p className={dark ? "mt-2 text-gray-300" : "mt-2 text-gray-700"}>{post.desc}</p>
                        </Link>
                    ) :
                        ( 
                        <Link
                        key={post.id}
                        to={"/writeups/#"+post.id}
                        className="block border-b-3 border-gray-900 pb-9 transition hover:border-indigo-600 "
                        >
                        <h2 className={dark ? "text-2xl font-bold font-mono text-white" : "text-2xl font-bold font-mono text-gray-800"}>{post.title}</h2>
                        <p className={dark ? "text-gray-200 text-sm mt-1" : "text-gray-500 text-sm mt-1"}>{post.date}</p>
                        <p className={dark ? "mt-2 text-gray-300" : "mt-2 text-gray-700"}>{post.desc}</p>
                        </Link>
                    )
                ))}
                </div>
            </div>
    </section>
    </div>
  );
}