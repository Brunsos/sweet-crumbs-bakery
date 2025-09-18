import { graphqlClient } from '@/lib/graphql';
import { GET_PRODUCTS, GET_HOMEPAGE_CONTENT } from '@/lib/queries';
import { Product } from '@/types';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import CTABanner from '@/components/sections/CTABanner';
import { mockProducts, mockHomepageContent } from '@/lib/mockData';

async function getProducts(): Promise<Product[]> {
  // In production without WordPress, use mock data
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.includes('http')) {
    return mockProducts;
  }

  try {
    const data = await graphqlClient.request(GET_PRODUCTS, { first: 6 });
    return data.posts.nodes.map((post: any) => ({
      id: post.id,
      name: post.title,
      description: post.content?.replace(/<[^>]*>/g, '').substring(0, 150) || 'Delicious bakery item',
      price: 12.99, // Default price
      image: {
        url: post.featuredImage?.node?.sourceUrl || '',
        alt: post.featuredImage?.node?.altText || post.title,
      },
      category: 'Bakery',
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to mock data if WordPress fails
    return mockProducts;
  }
}

async function getHomepageContent() {
  // In production without WordPress, use mock data
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.includes('http')) {
    return mockHomepageContent;
  }

  try {
    const data = await graphqlClient.request(GET_HOMEPAGE_CONTENT);
    return data.pageBy?.homepageContent || null;
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    // Fallback to mock data if WordPress fails
    return mockHomepageContent;
  }
}

export default async function Home() {
  const products = await getProducts();
  const homepageContent = await getHomepageContent();

  return (
    <Layout>
      <Hero content={homepageContent} />
      <FeaturedProducts products={products} />
      <CTABanner />
    </Layout>
  );
}
