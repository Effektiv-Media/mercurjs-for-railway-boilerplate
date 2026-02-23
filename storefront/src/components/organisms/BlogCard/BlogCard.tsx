import Image from "next/image"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { BlogPost } from "@/types/blog"
import { ArrowRightIcon } from "@/icons"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  post: BlogPost
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <LocalizedClientLink
      href={post.href}
      className={cn(
        "group block border border-slate-200 rounded-2xl relative overflow-hidden bg-white hover:shadow-md transition-shadow"
      )}
    >
      <div className="relative overflow-hidden h-full">
        <Image
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, 100vw"
          src={decodeURIComponent(post.image)}
          alt={post.title}
          width={467}
          height={472}
          className="object-cover max-h-[320px] md:max-h-[360px] h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold tracking-[0.08em] text-sky-700 uppercase">
          {post.category}
        </p>
        <h3 className="heading-sm text-slate-900 mt-1">{post.title}</h3>
        <p className="text-md text-slate-600 line-clamp-2 mt-1">{post.excerpt}</p>
        <div className="flex items-center gap-2 uppercase label-md mt-4 text-slate-900">
          Read more
          <ArrowRightIcon size={18} color="#0f172a" />
        </div>
      </div>
    </LocalizedClientLink>
  )
}
