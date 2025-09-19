import { MetadataRoute } from 'next';
import { graphqlClient } from '@/lib/graphql';
import { GET_POSTS, GET_PRODUCTS } from '@/lib/queries';
import { GraphQLPostsResponse, GraphQLProductsResponse } from '@/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetcrumbs.com';

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  try {
    const postsRequest = graphqlClient.request(GET_POSTS).catch(() => ({ posts: { nodes: [] } })) as Promise<GraphQLPostsResponse>;
    const productsRequest = graphqlClient.request(GET_PRODUCTS).catch(() => ({ products: { nodes: [] } })) as Promise<GraphQLProductsResponse>;

    const [postsData] = await Promise.all([postsRequest, productsRequest]);

    const blogRoutes = postsData.posts.nodes.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticRoutes;
  }
}