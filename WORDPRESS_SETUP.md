# WordPress Setup Guide for Sweet Crumbs

This guide will help you set up WordPress as a headless CMS for the Sweet Crumbs cookie shop website.

## Prerequisites

- WordPress installation (self-hosted or managed hosting)
- Admin access to WordPress
- Basic understanding of WordPress plugins and custom post types

## Required Plugins

### 1. WPGraphQL
Install and activate the WPGraphQL plugin to enable GraphQL API.

```bash
# Via WordPress Admin
1. Go to Plugins → Add New
2. Search for "WPGraphQL"
3. Install and activate WPGraphQL by WPGraphQL
```

### 2. Advanced Custom Fields (ACF)
Install ACF for custom fields management.

```bash
# Via WordPress Admin
1. Go to Plugins → Add New
2. Search for "Advanced Custom Fields"
3. Install and activate Advanced Custom Fields
```

### 3. WPGraphQL for Advanced Custom Fields
This plugin exposes ACF fields to the GraphQL API.

```bash
# Via WordPress Admin
1. Go to Plugins → Add New
2. Search for "WPGraphQL for Advanced Custom Fields"
3. Install and activate
```

## Custom Post Type Setup

### Products Custom Post Type

Add this code to your theme's `functions.php` file or create a custom plugin:

```php
<?php
// Register Products Custom Post Type
function create_products_post_type() {
    register_post_type('products',
        array(
            'labels' => array(
                'name' => __('Products'),
                'singular_name' => __('Product'),
                'menu_name' => __('Products'),
                'add_new' => __('Add New Product'),
                'add_new_item' => __('Add New Product'),
                'edit_item' => __('Edit Product'),
                'new_item' => __('New Product'),
                'view_item' => __('View Product'),
                'search_items' => __('Search Products'),
                'not_found' => __('No products found'),
                'not_found_in_trash' => __('No products found in trash')
            ),
            'public' => true,
            'has_archive' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_nav_menus' => true,
            'show_in_admin_bar' => true,
            'menu_position' => 5,
            'menu_icon' => 'dashicons-food',
            'capability_type' => 'post',
            'hierarchical' => false,
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => 'product',
            'graphql_plural_name' => 'products',
        )
    );
}
add_action('init', 'create_products_post_type');
?>
```

## Advanced Custom Fields Configuration

### Product Fields Group

1. Go to **Custom Fields → Field Groups** in WordPress admin
2. Click **Add New**
3. Title: "Product Fields"
4. Add the following fields:

#### Field 1: Product Name
- Field Label: `Name`
- Field Name: `name`
- Field Type: `Text`
- Required: Yes

#### Field 2: Description
- Field Label: `Description`
- Field Name: `description`
- Field Type: `Textarea`
- Required: Yes

#### Field 3: Price
- Field Label: `Price`
- Field Name: `price`
- Field Type: `Number`
- Required: Yes
- Min: 0
- Step: 0.01

#### Field 4: Image
- Field Label: `Image`
- Field Name: `image`
- Field Type: `Image`
- Required: Yes
- Return Format: `Image Array`

#### Field 5: Category
- Field Label: `Category`
- Field Name: `category`
- Field Type: `Select`
- Required: Yes
- Choices:
  ```
  classic : Classic
  chocolate : Chocolate
  seasonal : Seasonal
  gluten-free : Gluten Free
  vegan : Vegan
  specialty : Specialty
  ```

### Location Rules
Set location rules to show these fields only for the Products post type:
- Show this field group if **Post Type** is equal to **Products**

### Settings
- Show in GraphQL: **Yes**
- GraphQL Field Name: `productFields`

## Sample Products Data

Create sample products with the following data:

### Product 1: Chocolate Chip Classic
- **Title**: Chocolate Chip Classic
- **Content**: Our signature chocolate chip cookie made with premium Belgian chocolate chips and Madagascar vanilla.
- **Product Fields**:
  - Name: Chocolate Chip Classic
  - Description: Our signature chocolate chip cookie made with premium Belgian chocolate chips and Madagascar vanilla. Perfectly crispy on the outside, chewy on the inside.
  - Price: 2.99
  - Image: Upload a chocolate chip cookie image
  - Category: Classic

### Product 2: Double Chocolate Fudge
- **Title**: Double Chocolate Fudge
- **Content**: Rich chocolate cookie loaded with chocolate chunks for the ultimate chocolate experience.
- **Product Fields**:
  - Name: Double Chocolate Fudge
  - Description: Rich chocolate cookie loaded with chocolate chunks for the ultimate chocolate experience. Made with Dutch cocoa powder.
  - Price: 3.49
  - Image: Upload a double chocolate cookie image
  - Category: Chocolate

### Product 3: Oatmeal Raisin
- **Title**: Oatmeal Raisin
- **Content**: Traditional oatmeal cookie with plump raisins and warm cinnamon spice.
- **Product Fields**:
  - Name: Oatmeal Raisin
  - Description: Traditional oatmeal cookie with plump raisins and warm cinnamon spice. Made with organic oats and sun-dried raisins.
  - Price: 2.79
  - Image: Upload an oatmeal raisin cookie image
  - Category: Classic

### Product 4: Snickerdoodle
- **Title**: Snickerdoodle
- **Content**: Soft and chewy cinnamon sugar cookie rolled in our special spice blend.
- **Product Fields**:
  - Name: Snickerdoodle
  - Description: Soft and chewy cinnamon sugar cookie rolled in our special spice blend. A timeless favorite with warm, comforting flavors.
  - Price: 2.89
  - Image: Upload a snickerdoodle cookie image
  - Category: Classic

### Product 5: Gluten-Free Almond
- **Title**: Gluten-Free Almond
- **Content**: Delicious gluten-free cookie made with almond flour and real vanilla extract.
- **Product Fields**:
  - Name: Gluten-Free Almond
  - Description: Delicious gluten-free cookie made with almond flour and real vanilla extract. Perfect for those with gluten sensitivities.
  - Price: 3.99
  - Image: Upload a gluten-free almond cookie image
  - Category: Gluten Free

### Product 6: Seasonal Pumpkin Spice
- **Title**: Seasonal Pumpkin Spice
- **Content**: Limited time fall favorite with real pumpkin puree and autumn spices.
- **Product Fields**:
  - Name: Seasonal Pumpkin Spice
  - Description: Limited time fall favorite with real pumpkin puree and autumn spices. Available September through November.
  - Price: 3.29
  - Image: Upload a pumpkin spice cookie image
  - Category: Seasonal

## Blog Posts Setup

Create sample blog posts:

### Post 1: "The Art of Cookie Making"
- **Title**: The Art of Cookie Making
- **Content**: Detailed post about cookie making techniques
- **Excerpt**: Learn the secrets behind perfect cookies
- **Featured Image**: Upload a baking process image
- **Author**: Sweet Crumbs Team

### Post 2: "Ingredient Spotlight: Madagascar Vanilla"
- **Title**: Ingredient Spotlight: Madagascar Vanilla
- **Content**: Post about premium vanilla ingredients
- **Excerpt**: Why we choose Madagascar vanilla for our cookies
- **Featured Image**: Upload a vanilla beans image
- **Author**: Sweet Crumbs Team

### Post 3: "Seasonal Cookie Flavors"
- **Title**: Seasonal Cookie Flavors
- **Content**: Post about seasonal offerings
- **Excerpt**: Discover our rotating seasonal cookie menu
- **Featured Image**: Upload seasonal cookies image
- **Author**: Sweet Crumbs Team

## About Page Setup

Create an About page:

1. Go to **Pages → Add New**
2. **Title**: About
3. **Slug**: about
4. **Content**: Add your bakery's story and information
5. **Featured Image**: Upload a bakery image
6. **Publish** the page

## Navigation Menu Setup

1. Go to **Appearance → Menus**
2. Create a new menu called "Main Navigation"
3. Add the following items:
   - Home (Custom Link: /)
   - About (Page: About)
   - Menu (Custom Link: /menu)
   - Blog (Custom Link: /blog)
   - Contact (Custom Link: /contact)
4. Assign to "Primary Menu" location (if your theme supports it)

## GraphQL Settings

1. Go to **GraphQL → Settings** in WordPress admin
2. **GraphQL Endpoint**: `/graphql` (default)
3. **Enable GraphiQL**: Yes (for testing)
4. **Enable Query Batching**: Yes
5. **Enable Query Caching**: Yes (if available)

## CORS Configuration

If you're hosting WordPress separately from your Next.js app, you may need to configure CORS. Add this to your WordPress theme's `functions.php`:

```php
<?php
// Enable CORS for GraphQL
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
}
add_action('init','add_cors_http_header');
?>
```

## Security Considerations

1. **Use HTTPS**: Ensure your WordPress site uses HTTPS
2. **Limit Query Depth**: Configure query depth limits in WPGraphQL settings
3. **Authentication**: Set up proper authentication if needed
4. **Rate Limiting**: Consider implementing rate limiting for the GraphQL endpoint

## Testing Your Setup

1. Navigate to `yoursite.com/graphql` in your browser
2. You should see the GraphiQL interface
3. Test with this sample query:

```graphql
query GetProducts {
  products(first: 10) {
    nodes {
      id
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

## Troubleshooting

### Common Issues:

1. **GraphQL endpoint not working**: Ensure WPGraphQL plugin is activated
2. **Custom fields not showing**: Check that WPGraphQL for ACF is installed
3. **Products not appearing**: Verify the custom post type is registered with GraphQL support
4. **CORS errors**: Add the CORS headers mentioned above

### Useful WP-CLI Commands:

```bash
# Flush rewrite rules
wp rewrite flush

# Check active plugins
wp plugin list

# Regenerate thumbnails
wp media regenerate
```

## Next Steps

Once WordPress is set up:

1. Update your `.env.local` file with the WordPress GraphQL endpoint
2. Test the GraphQL queries in your Next.js application
3. Add more sample content as needed
4. Configure any additional ACF fields for enhanced functionality

## Support Resources

- [WPGraphQL Documentation](https://www.wpgraphql.com/docs)
- [Advanced Custom Fields Documentation](https://www.advancedcustomfields.com/resources/)
- [WordPress Custom Post Types](https://developer.wordpress.org/plugins/post-types/)