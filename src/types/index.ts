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

// GraphQL Response Types
export interface GraphQLPostsResponse {
  posts: {
    nodes: Array<{
      id: string;
      title: string;
      excerpt: string;
      content: string;
      slug: string;
      date: string;
      author: {
        node: {
          name: string;
        };
      };
      featuredImage?: {
        node: {
          sourceUrl: string;
          altText: string;
        };
      };
    }>;
  };
}

export interface GraphQLProductsResponse {
  products?: {
    nodes: Array<{
      id: string;
      title: string;
      content: string;
      slug: string;
      productFields?: {
        name: string;
        description: string;
        price: number;
        category: string;
        image?: {
          url: string;
          altText: string;
        };
      };
    }>;
  };
  posts?: {
    nodes: Array<{
      id: string;
      title: string;
      content: string;
      slug: string;
      featuredImage?: {
        node: {
          sourceUrl: string;
          altText: string;
        };
      };
    }>;
  };
}

export interface GraphQLPostResponse {
  postBy: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    date: string;
    author: {
      node: {
        name: string;
      };
    };
    featuredImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
  } | null;
}

export interface GraphQLHomepageResponse {
  pageBy: {
    title: string;
    homepageContent: {
      heroTitle: string;
      heroSubtitle: string;
      heroBgImage?: {
        node: {
          sourceUrl: string;
          altText: string;
        };
      };
      featuredProductsSectionTitle: string;
    };
  } | null;
}

export interface GraphQLAboutResponse {
  pageBy: {
    id: string;
    title: string;
    content: string;
    slug: string;
    featuredImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
  } | null;
}