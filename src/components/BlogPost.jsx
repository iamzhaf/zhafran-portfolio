import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function BlogPost() {
  const { id } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    import(`../posts/${id}.md`)
      .then((res) => fetch(res.default))
      .then((res) => res.text())
      .then(setContent);
  }, [id]);

  return (
    <div className={dark ? "bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900"}>
      <article className="prose prose-lg max-w-3xl mx-auto">
        <MarkdownRenderer content={content} />
      </article>
    </div>
  );
}
