'use client';

import { useState, useEffect } from 'react';
import { graphqlClient } from '@/lib/graphql';
import { GET_PRODUCTS } from '@/lib/queries';
import { Product } from '@/types';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';

const MenuPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await graphqlClient.request(GET_PRODUCTS);
        const transformedProducts: Product[] = data.products.nodes.map((product: any) => ({
          id: product.id,
          name: product.productFields?.name || product.title,
          description: product.productFields?.description || product.content?.replace(/<[^>]*>/g, '').substring(0, 150),
          price: product.productFields?.price || 0,
          image: {
            url: product.productFields?.image?.url || '',
            alt: product.productFields?.image?.altText || product.productFields?.name || product.title,
          },
          category: product.productFields?.category || 'Cookie',
          slug: product.slug,
        }));

        setProducts(transformedProducts);
        setFilteredProducts(transformedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const categories = ['All', ...Array.from(new Set(products.map(product => product.category)))];

  if (loading) {
    return (
      <Layout>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-6xl">
                Our Menu
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
                Our Menu
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

  if (products.length === 0) {
    return (
      <Layout>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-6xl">
                Our Menu
              </h1>
              <p className="mt-6 text-lg leading-8 text-amber-700">
                Our delicious cookie menu will be displayed here once connected to WordPress.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-4xl">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="group relative bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-64 w-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-sm">Sample Cookie {i}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-amber-900">
                          Sample Cookie {i}
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                          Classic
                        </span>
                      </div>
                      <p className="text-amber-700 text-sm mb-4">
                        A delicious sample cookie that will be replaced with real content from WordPress.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-amber-600">
                          ${(2.99 + i * 0.50).toFixed(2)}
                        </span>
                        <button className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
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
              Our Menu
            </h1>
            <p className="mt-6 text-lg leading-8 text-amber-700">
              Discover our handcrafted cookies, made fresh daily with the finest ingredients.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && selectedCategory !== 'All' && (
              <div className="text-center py-12">
                <p className="text-lg text-amber-700">
                  No cookies found in the {selectedCategory} category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MenuPage;