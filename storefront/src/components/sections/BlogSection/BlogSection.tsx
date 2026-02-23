import { BlogCard } from "@/components/organisms"
import { BlogPost } from "@/types/blog"

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Summer's Most Elegant Accessories",
    excerpt:
      "Discover this season's most sophisticated accessories that blend timeless elegance with modern design.",
    image: "/images/blog/post-1.jpg",
    category: "ACCESSORIES",
    href: "/",
  },
  {
    id: 2,
    title: "The Season’s Hottest Trends",
    excerpt:
      'From bold colors to nostalgic silhouettes, explore the must-have looks defining this season’s fashion narrative.',
    image: "/images/blog/post-2.jpg",
    category: "STYLE GUIDE",
    href: "/",
  },
  {
    id: 3,
    title: "Minimalist Outerwear Trends",
    excerpt:
      'Explore the latest minimalist outerwear pieces that combine functionality with clean aesthetics.',
    image: "/images/blog/post-3.jpg",
    category: "TRENDS",
    href: "/",
  },
]

export function BlogSection() {
  return (
    <section className="container">
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-7 md:px-8 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="heading-lg text-slate-900">STAY UP TO DATE</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} index={index} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
