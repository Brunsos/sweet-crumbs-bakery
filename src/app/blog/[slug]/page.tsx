import { graphqlClient } from '@/lib/graphql';
import { GET_POST_BY_SLUG, GET_POSTS } from '@/lib/queries';
import { Post } from '@/types';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const data = await graphqlClient.request(GET_POST_BY_SLUG, { slug });
    const post = data.postBy;

    if (!post) return null;

    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      slug: post.slug,
      date: post.date,
      author: {
        name: post.author.node.name,
      },
      featuredImage: post.featuredImage?.node ? {
        url: post.featuredImage.node.sourceUrl,
        alt: post.featuredImage.node.altText || post.title,
      } : undefined,
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const data = await graphqlClient.request(GET_POSTS);
    return data.posts.nodes.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <Layout>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-6xl">
                Post Not Found
              </h1>
              <p className="mt-6 text-lg leading-8 text-amber-700">
                The blog post you're looking for doesn't exist or has been moved.
              </p>
              <div className="mt-10">
                <Link
                  href="/blog"
                  className="rounded-md bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 transition-colors"
                >
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <article className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <nav className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-500 transition-colors"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </nav>

          <header className="mb-12">
            <div className="flex items-center text-sm text-amber-600 mb-4">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="mx-2">•</span>
              <span>{post.author.name}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl mb-6">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-xl text-amber-700 leading-8">
                {post.excerpt.replace(/<[^>]*>/g, '')}
              </p>
            )}
          </header>

          {post.featuredImage && (
            <div className="mb-12">
              <img
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="prose prose-lg prose-amber max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <footer className="mt-16 pt-8 border-t border-amber-200">
            <div className="flex justify-between items-center">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-500 transition-colors"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                More Blog Posts
              </Link>
              <div className="text-sm text-amber-600">
                By {post.author.name}
              </div>
            </div>
          </footer>
        </div>
      </article>
    </Layout>
  );
}