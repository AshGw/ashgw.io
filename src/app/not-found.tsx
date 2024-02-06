import { BlogData } from './(pages)/blog/_types';
import Image from 'next/image';
import Link from 'next/link';
import formatDate from '@/lib/funcs/form-date';
interface FeaturedBlogPostProps {
  blogData: BlogData;
}
export default function FeaturedBlogPost({ blogData }: FeaturedBlogPostProps) {
  const tags = ['rust', 'axum', 'sqlx'];

  return (
    <div className="mx-auto mt-8 w-full max-w-[1280px] px-5 sm:mt-24 sm:px-10">
      <div className="group grid gap-4 rounded-[2rem] border border-black/10 p-5 transition-all duration-300 hover:shadow-[0px_4px_88px_0px_rgba(252,84,12,0.25)] dark:border-white/10 md:grid-cols-2 md:items-center md:gap-5 md:p-8">
        <div className="grid gap-4 lg:gap-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <li className="list-disc text-[#7A7A7A]">
              {formatDate(blogData.parsedContent.attributes.firstModDate)}
            </li>
          </div>
          <Link href={`/blog/${blogData.filenameSlug}`}>
            <h2 className="font-gradual text-2xl font-bold text-black dark:text-[#C2C2C2] lg:text-[2.5rem] lg:leading-9">
              {blogData.parsedContent.attributes.title}
            </h2>
            <p className="mt-3 dimmed lg:text-xl">
              {blogData.parsedContent.attributes.summary}
            </p>
          </Link>
          <div className="flex flex-wrap items-center gap-[0.625rem] text-sm text-black dark:text-[#C2C2C2]">
            {tags.map((tag) => (
              <div
                key={tag}
                className="border-gradient-h relative rounded-full px-2 py-1 outline outline-1 outline-black/10 hover:outline-transparent hover:after:rounded-full hover:after:bg-gradient-to-r hover:after:from-[#FC540C] hover:after:to-[#FFD76F] dark:bg-black dark:outline-[#1E1B19]"
              >
                {tag}
              </div>
            ))}
            <div className="dimmed">{'13 minutes'}</div>
          </div>
        </div>
        <Link
          href={`/blog/${blogData.filenameSlug}`}
          className="relative h-full overflow-hidden rounded-[2rem]"
        >
          <Image
            src={`/images/blog/` + blogData.filenameSlug}
            alt={blogData.parsedContent.attributes.title}
            fill
            className="rounded-[2rem] object-contain transition-all duration-300 group-hover:scale-125"
          />
        </Link>
      </div>
    </div>
  );
}
