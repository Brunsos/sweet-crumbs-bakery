# Example GraphQL Queries for Sweet Crumbs

This document contains example GraphQL queries that you can use with your WordPress backend.

## Products Queries

### Get All Products
```graphql
query GetProducts($first: Int = 100) {
  products(first: $first) {
    nodes {
      id
      databaseId
      title
      content
      slug
      date
      productFields {
        name
        description
        price
        category
        image {
          url
          altText
          title
          description
          mediaItemUrl
          sourceUrl
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

### Get Product by Slug
```graphql
query GetProductBySlug($slug: String!) {
  productBy(slug: $slug) {
    id
    databaseId
    title
    content
    slug
    date
    productFields {
      name
      description
      price
      category
      image {
        url
        altText
        title
        description
        mediaItemUrl
        sourceUrl
      }
    }
  }
}
```

### Get Products by Category
```graphql
query GetProductsByCategory($category: String!, $first: Int = 100) {
  products(
    first: $first
    where: {
      metaQuery: {
        metaArray: [
          {
            key: "category"
            value: $category
            compare: EQUAL_TO
          }
        ]
      }
    }
  ) {
    nodes {
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
}
```

### Get Featured Products (First 6)
```graphql
query GetFeaturedProducts {
  products(first: 6) {
    nodes {
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
}
```

## Blog Posts Queries

### Get All Posts
```graphql
query GetPosts($first: Int = 10) {
  posts(first: $first, where: { status: PUBLISH }) {
    nodes {
      id
      databaseId
      title
      excerpt
      content
      slug
      date
      modified
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          title
          description
          mediaDetails {
            width
            height
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

### Get Post by Slug
```graphql
query GetPostBySlug($slug: String!) {
  postBy(slug: $slug) {
    id
    databaseId
    title
    content
    excerpt
    slug
    date
    modified
    author {
      node {
        name
        slug
        description
        avatar {
          url
        }
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
        title
        description
        mediaDetails {
          width
          height
        }
      }
    }
    categories {
      nodes {
        name
        slug
        description
      }
    }
    tags {
      nodes {
        name
        slug
        description
      }
    }
    seo {
      title
      metaDesc
      focuskw
      metaKeywords
      metaRobotsNoindex
      metaRobotsNofollow
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
      }
      twitterTitle
      twitterDescription
      twitterImage {
        sourceUrl
      }
    }
  }
}
```

### Get Recent Posts
```graphql
query GetRecentPosts($first: Int = 5) {
  posts(
    first: $first
    where: {
      status: PUBLISH
      orderby: { field: DATE, order: DESC }
    }
  ) {
    nodes {
      id
      title
      excerpt
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
```

## Pages Queries

### Get Page by Slug
```graphql
query GetPageBySlug($slug: String!) {
  pageBy(slug: $slug) {
    id
    databaseId
    title
    content
    slug
    date
    modified
    featuredImage {
      node {
        sourceUrl
        altText
        title
        description
        mediaDetails {
          width
          height
        }
      }
    }
    seo {
      title
      metaDesc
      focuskw
      metaKeywords
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
      }
    }
  }
}
```

### Get About Page
```graphql
query GetAboutPage {
  pageBy(slug: "about") {
    id
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
```

## Navigation Queries

### Get Menu Items
```graphql
query GetMenuItems($location: MenuLocationEnum!) {
  menuItems(where: { location: $location }) {
    nodes {
      id
      label
      url
      target
      title
      cssClasses
      description
      parentId
      order
      children {
        nodes {
          id
          label
          url
          target
          title
          cssClasses
          description
          order
        }
      }
    }
  }
}
```

### Get Primary Menu
```graphql
query GetPrimaryMenu {
  menuItems(where: { location: PRIMARY }) {
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
```

## Site Settings Queries

### Get General Settings
```graphql
query GetGeneralSettings {
  generalSettings {
    title
    description
    url
    email
    timezone
    dateFormat
    timeFormat
    language
  }
}
```

### Get Site Logo
```graphql
query GetSiteLogo {
  generalSettings {
    title
    description
  }
  customLogo {
    node {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
}
```

## Advanced Queries

### Search Products and Posts
```graphql
query SearchContent($search: String!, $first: Int = 10) {
  products: products(first: $first, where: { search: $search }) {
    nodes {
      __typename
      id
      title
      slug
      productFields {
        name
        description
        price
        image {
          url
          altText
        }
      }
    }
  }
  posts: posts(first: $first, where: { search: $search }) {
    nodes {
      __typename
      id
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
}
```

### Get Products with Pagination
```graphql
query GetProductsWithPagination($first: Int = 12, $after: String) {
  products(first: $first, after: $after) {
    nodes {
      id
      title
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
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

### Get All Categories (for filtering)
```graphql
query GetProductCategories {
  products {
    nodes {
      productFields {
        category
      }
    }
  }
}
```

## Using Variables

When using these queries in your application, you can pass variables like this:

```javascript
// Example with graphql-request
import { graphqlClient } from '@/lib/graphql';
import { GET_PRODUCTS } from '@/lib/queries';

const getProducts = async () => {
  const variables = {
    first: 10,
    category: 'chocolate'
  };

  const data = await graphqlClient.request(GET_PRODUCTS, variables);
  return data.products.nodes;
};
```

## Query Fragments

You can create reusable fragments for common fields:

```graphql
fragment ProductFields on Product {
  id
  title
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

fragment PostFields on Post {
  id
  title
  excerpt
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
```

Then use them in your queries:

```graphql
query GetProductsWithFragment {
  products(first: 10) {
    nodes {
      ...ProductFields
    }
  }
}
```

## Error Handling

Always handle potential errors in your GraphQL queries:

```javascript
try {
  const data = await graphqlClient.request(query, variables);
  return data;
} catch (error) {
  console.error('GraphQL Error:', error);
  // Handle error appropriately
  return null;
}
```

## Performance Tips

1. **Only request needed fields**: Don't fetch unnecessary data
2. **Use pagination**: For large datasets, implement proper pagination
3. **Cache results**: Implement caching strategy for frequently accessed data
4. **Optimize images**: Request appropriate image sizes
5. **Batch requests**: Combine multiple queries when possible

## Testing Queries

You can test these queries in:

1. **GraphiQL** (if enabled): `yourwordpresssite.com/graphql`
2. **GraphQL Playground**: External tool for testing
3. **Postman**: HTTP client with GraphQL support
4. **Your application**: Direct integration testing