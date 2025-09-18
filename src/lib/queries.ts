import { gql } from 'graphql-request';

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int = 100) {
    posts(first: $first) {
      nodes {
        id
        databaseId
        title
        content
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_HOMEPAGE_CONTENT = gql`
  query GetHomepageContent {
    pageBy(uri: "/homepage/") {
      title
      homepageContent {
        heroTitle
        heroSubtitle
        heroBgImage {
          node {
            sourceUrl
            altText
          }
        }
        featuredProductsSectionTitle
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    productBy(slug: $slug) {
      id
      databaseId
      title
      content
      slug
      productFields {
        name
        description
        price
        category
        image {
          url
          altText
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($first: Int = 10) {
    posts(first: $first) {
      nodes {
        id
        databaseId
        title
        excerpt
        content
        slug
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      databaseId
      title
      content
      slug
      date
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: String!) {
    pageBy(slug: $slug) {
      id
      databaseId
      title
      content
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const GET_MENU_ITEMS = gql`
  query GetMenuItems($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }) {
      nodes {
        id
        label
        url
        parentId
        children {
          nodes {
            id
            label
            url
          }
        }
      }
    }
  }
`;