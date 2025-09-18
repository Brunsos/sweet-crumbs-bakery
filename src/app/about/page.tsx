import { graphqlClient } from '@/lib/graphql';
import { GET_PAGE_BY_SLUG } from '@/lib/queries';
import { Page } from '@/types';
import Layout from '@/components/layout/Layout';

async function getAboutPage(): Promise<Page | null> {
  try {
    const data = await graphqlClient.request(GET_PAGE_BY_SLUG, { slug: 'about' });
    const page = data.pageBy;

    if (!page) return null;

    return {
      id: page.id,
      title: page.title,
      content: page.content,
      slug: page.slug,
      featuredImage: page.featuredImage?.node ? {
        url: page.featuredImage.node.sourceUrl,
        alt: page.featuredImage.node.altText || page.title,
      } : undefined,
    };
  } catch (error) {
    console.error('Error fetching about page:', error);
    return null;
  }
}

export default async function About() {
  const aboutPage = await getAboutPage();

  if (!aboutPage) {
    return (
      <Layout>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-6xl">
                About Sweet Crumbs
              </h1>
              <p className="mt-6 text-lg leading-8 text-amber-700">
                Welcome to Sweet Crumbs, where every cookie tells a story of passion, tradition, and irresistible flavor.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-4xl">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-amber-900">Our Story</h2>
                  <p className="mt-4 text-amber-700">
                    Founded in 2020, Sweet Crumbs began as a small home bakery with a simple mission:
                    to create the most delicious, freshly baked cookies using only the finest ingredients.
                    What started in our kitchen has grown into a beloved local bakery that brings joy to
                    cookie lovers throughout the community.
                  </p>
                  <p className="mt-4 text-amber-700">
                    Every cookie is handcrafted with care, using time-honored recipes passed down through
                    generations, combined with innovative flavors that surprise and delight.
                  </p>
                </div>

                <div>
                  <img
                    src="/api/placeholder/500/400"
                    alt="Sweet Crumbs bakery interior"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <div className="mt-16">
                <h2 className="text-2xl font-bold tracking-tight text-amber-900 mb-8">Our Values</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-amber-900">Made with Love</h3>
                    <p className="mt-2 text-amber-700">
                      Every cookie is crafted with passion and attention to detail.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-amber-900">Quality Ingredients</h3>
                    <p className="mt-2 text-amber-700">
                      We source only the finest, freshest ingredients for our recipes.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-amber-900">Community First</h3>
                    <p className="mt-2 text-amber-700">
                      We're proud to be part of this community and give back whenever we can.
                    </p>
                  </div>
                </div>
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
              {aboutPage.title}
            </h1>
          </div>

          {aboutPage.featuredImage && (
            <div className="mx-auto mt-16 max-w-4xl">
              <img
                src={aboutPage.featuredImage.url}
                alt={aboutPage.featuredImage.alt}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="mx-auto mt-16 max-w-4xl">
            <div
              className="prose prose-lg prose-amber max-w-none"
              dangerouslySetInnerHTML={{ __html: aboutPage.content }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}