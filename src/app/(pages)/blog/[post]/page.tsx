import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPosts, getBlogPost } from '../content';
import { getSiteName } from '@/lib/funcs/site-name';
import { pub } from '@/lib/env';
import LoadingScreen from '@/app/components/reusables/loading-screen';
import BlogSection from '@/app/components/blog/blog-section';
import Footer from '@/app/components/footer/footer';

type RouteParams = {
  params: { post: string };
};

export const generateStaticParams = async () => {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ post: post.filename }));
};

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const post = await getBlogPost(params.post);
  if (!post) {
    return {};
  }
  const postAttrs = post.parsedContent.attributes;
  const title = postAttrs.seoTitle;
  const description = postAttrs.summary;
  const url = pub.SITE_URL_PROD + '/' + post.filename;

  const postImageWidth = 1200;
  const postImageHeight = 630;
  const postImageUrl = `https://via.placeholder.com/${postImageWidth}x${postImageHeight}.png/000000/ffffff/?text=${title}`;
  return {
    title,
    description,
    openGraph: {
      siteName: getSiteName(pub.SITE_URL_PROD) || pub.SITE_URL_PROD,
      locale: 'en_US',
      publishedTime: postAttrs.firstModDate,
      title,
      description,
      type: 'article',
      url,
      images: [
        {
          url: postImageUrl,
          width: postImageWidth,
          height: postImageHeight,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [postImageUrl],
    },
    creator: 'Ashref Gwader',
    keywords: postAttrs.tags,
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    manifest: pub.SITE_URL_PROD + '/manifest.json',
    category: 'everything',
  };
}

export default async function Blog({ params }: RouteParams) {
  const post = await getBlogPost(params.post);
  if (post) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <main className="pt-5">
          <BlogSection post={post} />
        </main>
        <div className="py-10"></div>
        <Footer />
      </Suspense>
    );
  } else {
    return notFound();
  }
}
