# Sweet Crumbs - Cookie Shop Website

A modern, responsive cookie shop website built with Next.js 14, TailwindCSS, and WordPress as a headless CMS.

## 🍪 Features

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: TailwindCSS with custom bakery theme (browns, creams, pastels)
- **CMS**: Headless WordPress with WPGraphQL + ACF
- **Pages**: Home, About, Menu, Blog, Contact
- **SEO**: Dynamic meta tags, structured data, sitemap
- **Forms**: Contact form with validation and API route
- **Performance**: ISR (Incremental Static Regeneration)
- **Analytics**: Google Analytics integration
- **Responsive**: Mobile-first design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- WordPress installation with required plugins

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd sweet-crumbs

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Update the environment variables (see [Environment Variables](#environment-variables) section).

### 3. WordPress Setup

Follow the detailed [WordPress Setup Guide](./WORDPRESS_SETUP.md) to configure your WordPress backend.

### 4. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# WordPress GraphQL API
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/graphql

# Optional: WordPress Authentication (for private content)
WORDPRESS_AUTH_REFRESH_TOKEN=your_refresh_token_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://sweetcrumbs.com
NEXT_PUBLIC_SITE_NAME=Sweet Crumbs

# Google Analytics (optional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Google Site Verification (optional)
GOOGLE_SITE_VERIFICATION=your_verification_code

# Facebook App ID (optional, for Open Graph)
FACEBOOK_APP_ID=your_facebook_app_id

# Contact Form (optional - for email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=hello@sweetcrumbs.com
```

## 📁 Project Structure

```
sweet-crumbs/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── about/             # About page
│   │   ├── blog/              # Blog pages
│   │   │   └── [slug]/        # Individual blog post
│   │   ├── contact/           # Contact page
│   │   ├── menu/              # Menu page
│   │   ├── api/               # API routes
│   │   │   └── contact/       # Contact form handler
│   │   ├── globals.css        # Global styles & theme
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── robots.ts          # Robots.txt
│   │   └── sitemap.ts         # Sitemap
│   ├── components/            # React components
│   │   ├── layout/            # Layout components
│   │   ├── sections/          # Page sections
│   │   └── ui/                # UI components
│   ├── lib/                   # Utilities
│   │   ├── graphql.ts         # GraphQL client
│   │   ├── queries.ts         # GraphQL queries
│   │   └── metadata.ts        # SEO helpers
│   └── types/                 # TypeScript types
├── public/                    # Static assets
├── WORDPRESS_SETUP.md         # WordPress configuration guide
├── EXAMPLE_QUERIES.md         # GraphQL query examples
└── README.md                  # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Amber shades (amber-600, amber-700, amber-800)
- **Background**: Cream tones (#fffbf5, #fef7ed)
- **Text**: Warm browns (#7c2d12, #92400e)
- **Accents**: Soft pastels (rose, emerald, orange)

### Typography
- **Sans Serif**: Inter (body text, UI)
- **Serif**: Playfair Display (headings, branding)

### Components
- Responsive navigation with mobile menu
- Product cards with hover effects
- Blog post cards with featured images
- Contact form with validation
- Hero section with call-to-action
- Featured products carousel

## 📱 Pages Overview

### Home Page (`/`)
- Hero section with bakery branding
- Featured products carousel (from WordPress)
- Call-to-action banner
- SEO optimized with structured data

### About Page (`/about`)
- Dynamic content from WordPress "About" page
- Fallback content if WordPress is unavailable
- Company values and story section

### Menu Page (`/menu`)
- All products from WordPress Products CPT
- Category filtering (Classic, Chocolate, Seasonal, etc.)
- Product cards with images, descriptions, prices
- Loading and error states

### Blog (`/blog`)
- Blog post index from WordPress
- Individual post pages (`/blog/[slug]`)
- Featured images and author information
- SEO optimized for each post

### Contact Page (`/contact`)
- Contact information and business hours
- Contact form with validation
- Form submission via Next.js API route
- Success/error feedback

## 🛠 WordPress Configuration

### Required Plugins
1. **WPGraphQL** - GraphQL API
2. **Advanced Custom Fields (ACF)** - Custom fields
3. **WPGraphQL for Advanced Custom Fields** - Expose ACF to GraphQL

### Custom Post Types
- **Products** - Cookie products with custom fields
  - Name, Description, Price, Image, Category

### Custom Fields (ACF)
- Product Fields Group for Products CPT
- Fields: name, description, price, image, category

### Sample Data
- 6+ sample cookie products
- 3+ blog posts about baking
- About page content
- Navigation menu

See [WordPress Setup Guide](./WORDPRESS_SETUP.md) for detailed instructions.

## 📊 SEO & Performance

### SEO Features
- Dynamic meta tags from WordPress content
- Open Graph and Twitter Card support
- Structured data (JSON-LD) for:
  - Local Business (bakery)
  - Products
  - Blog posts
  - Breadcrumbs
- XML sitemap generation
- Robots.txt optimization

### Performance Optimizations
- ISR (Incremental Static Regeneration)
- Image optimization with Next.js Image component
- CSS optimization with TailwindCSS
- Font optimization with next/font
- GraphQL query optimization

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Configure Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env.local`
   - Redeploy if needed

### Netlify Deployment

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. **Environment Variables**
   - Add variables in Netlify dashboard
   - Site Settings → Environment Variables

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔧 Development

### Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Adding New Features

1. **New Page**: Add to `src/app/[page-name]/page.tsx`
2. **New Component**: Add to `src/components/`
3. **New API Route**: Add to `src/app/api/`
4. **GraphQL Query**: Add to `src/lib/queries.ts`

### Styling Guidelines

- Use Tailwind utility classes
- Follow the established color palette
- Maintain responsive design patterns
- Use custom CSS variables for theme colors

## 🧪 Testing

### Manual Testing Checklist

- [ ] All pages load correctly
- [ ] Navigation works on desktop and mobile
- [ ] Contact form submits successfully
- [ ] Products display from WordPress
- [ ] Blog posts render correctly
- [ ] SEO meta tags are present
- [ ] Images load and display properly
- [ ] Responsive design works on all screen sizes

### GraphQL Testing

Test your WordPress GraphQL endpoint:

1. Visit `your-wordpress-site.com/graphql`
2. Use GraphiQL interface to test queries
3. Reference [Example Queries](./EXAMPLE_QUERIES.md)

## 🐛 Troubleshooting

### Common Issues

**GraphQL Connection Errors**
- Verify WordPress URL in environment variables
- Check that WPGraphQL plugin is activated
- Ensure CORS is configured if needed

**Styling Issues**
- Clear browser cache
- Check Tailwind configuration
- Verify custom CSS variables

**Build Errors**
- Check TypeScript errors: `npm run lint`
- Verify all environment variables are set
- Check for missing dependencies

**WordPress Issues**
- Follow [WordPress Setup Guide](./WORDPRESS_SETUP.md)
- Check plugin compatibility
- Verify ACF field configuration

### Debug Mode

Enable debug logging:

```typescript
// In lib/graphql.ts
export const graphqlClient = new GraphQLClient(endpoint, {
  headers: { /* ... */ },
  fetch: (...args) => {
    console.log('GraphQL Request:', args);
    return fetch(...args);
  }
});
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [WPGraphQL Documentation](https://www.wpgraphql.com/docs)
- [Advanced Custom Fields](https://www.advancedcustomfields.com/resources/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Check the [WordPress Setup Guide](./WORDPRESS_SETUP.md)
- Review [Example Queries](./EXAMPLE_QUERIES.md)
- Open an issue on GitHub
- Contact: support@sweetcrumbs.com

---

Built with ❤️ by the Sweet Crumbs team
