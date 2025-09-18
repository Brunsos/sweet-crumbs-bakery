import Link from 'next/link';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.featuredImage && (
        <div className="aspect-w-16 aspect-h-9 w-full">
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-amber-600 mb-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="mx-2">•</span>
          <span>{post.author.name}</span>
        </div>
        <h3 className="text-xl font-semibold text-amber-900 mb-3 group-hover:text-amber-700 transition-colors">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="text-amber-700 text-sm mb-4 line-clamp-3">
          {post.excerpt?.replace(/<[^>]*>/g, '') || 'Read more about this post...'}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors"
        >
          Read more
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default PostCard;