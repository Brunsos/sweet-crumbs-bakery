'use client';

import { useState, useEffect } from 'react';
import { graphqlClient } from '@/lib/graphql';
import { GET_POSTS } from '@/lib/queries';
import { Post, GraphQLPostsResponse } from '@/types';
import Layout from '@/components/layout/Layout';
import PostCard from '@/components/ui/PostCard';

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await graphqlClient.request(GET_POSTS) as GraphQLPostsResponse;
        const transformedPosts: Post[] = data.posts.nodes.map((post) => ({
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
        }));

        setPosts(transformedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-6xl">
                Our Blog
              </h1>
              <div className="mt-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-6xl">
                Our Blog
              </h1>
              <p className="mt-6 text-lg leading-8 text-red-600">
                {error}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (posts.length === 0) {
    return (
      <Layout>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-6xl">
                Our Blog
              </h1>
              <p className="mt-6 text-lg leading-8 text-amber-700">
                Sweet stories, baking tips, and behind-the-scenes content will be displayed here once connected to WordPress.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-5xl">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <article key={i} className="group relative bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 w-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-sm">Sample Blog Post {i}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-amber-600 mb-3">
                        <time>January {i}, 2024</time>
                        <span className="mx-2">•</span>
                        <span>Sweet Crumbs Team</span>
                      </div>
                      <h3 className="text-xl font-semibold text-amber-900 mb-3">
                        Sample Blog Post {i}: The Art of Cookie Making
                      </h3>
                      <p className="text-amber-700 text-sm mb-4">
                        This is a sample blog post that will be replaced with real content from WordPress.
                        Learn about our baking process and secrets!
                      </p>
                      <div className="inline-flex items-center text-sm font-semibold text-amber-600">
                        Read more
                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-6xl">
              Our Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-amber-700">
              Sweet stories, baking tips, and behind-the-scenes content from our kitchen to yours.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;