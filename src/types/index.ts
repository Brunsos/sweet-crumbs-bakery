export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
    alt: string;
  };
  category: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  date: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
  author: {
    name: string;
  };
}

export interface Page {
  id: string;
  title: string;
  content: string;
  slug: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  children?: MenuItem[];
}