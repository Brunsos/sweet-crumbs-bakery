// Mock data for production deployment when WordPress isn't available
export const mockHomepageContent = {
  heroTitle: "Welcome to Sweet Crumbs Bakery",
  heroSubtitle: "Artisanal breads, pastries, and desserts baked fresh daily with love and the finest ingredients",
  heroBgImage: {
    node: {
      sourceUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
      altText: "Beautiful bakery display case with fresh pastries"
    }
  },
  featuredProductsSectionTitle: "Our Signature Treats"
};

export const mockProducts = [
  {
    id: "1",
    name: "Fresh Croissants",
    description: "Buttery, flaky croissants made fresh every morning using traditional French techniques. Each croissant is hand-rolled and baked to golden perfection.",
    price: 3.25,
    image: {
      url: "https://images.unsplash.com/photo-1555507036-ab794f677db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Fresh golden croissants"
    },
    category: "Pastries",
    slug: "fresh-croissants"
  },
  {
    id: "2",
    name: "Artisan Sourdough",
    description: "Our signature sourdough bread, fermented for 24 hours to develop complex flavors. Made with organic flour and our century-old starter.",
    price: 6.50,
    image: {
      url: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Rustic sourdough bread loaf"
    },
    category: "Breads",
    slug: "artisan-sourdough"
  },
  {
    id: "3",
    name: "Chocolate Eclairs",
    description: "Delicate choux pastry filled with vanilla cream and topped with rich chocolate glaze. A classic French pastry made to perfection.",
    price: 4.75,
    image: {
      url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Chocolate eclairs with glossy chocolate topping"
    },
    category: "Desserts",
    slug: "chocolate-eclairs"
  },
  {
    id: "4",
    name: "Cinnamon Rolls",
    description: "Soft, fluffy cinnamon rolls swirled with brown sugar and spices, topped with cream cheese frosting. Perfect for breakfast or afternoon treats.",
    price: 4.25,
    image: {
      url: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Freshly baked cinnamon rolls with icing"
    },
    category: "Pastries",
    slug: "cinnamon-rolls"
  },
  {
    id: "5",
    name: "Fruit Tarts",
    description: "Seasonal fruit tarts with pastry cream and fresh berries. Made with the finest seasonal fruits and our signature pastry cream.",
    price: 5.25,
    image: {
      url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Beautiful fruit tarts with fresh berries"
    },
    category: "Desserts",
    slug: "fruit-tarts"
  },
  {
    id: "6",
    name: "Whole Wheat Bread",
    description: "Hearty whole wheat bread made with stone-ground flour. Perfect for sandwiches or toast, packed with nutrition and flavor.",
    price: 5.75,
    image: {
      url: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Sliced whole wheat bread"
    },
    category: "Breads",
    slug: "whole-wheat-bread"
  }
];

export const mockPosts = [
  {
    id: "1",
    title: "The Art of Sourdough: A Baker's Journey",
    excerpt: "Discover the ancient craft of sourdough baking and how we've perfected our techniques over the years.",
    content: "Sourdough baking is both an art and a science...",
    slug: "art-of-sourdough",
    date: "2024-01-15",
    author: { node: { name: "Sarah Johnson" } },
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        altText: "Baker kneading sourdough"
      }
    }
  },
  {
    id: "2",
    title: "Seasonal Specials: Winter Warmth",
    excerpt: "Cozy up with our winter menu featuring spiced breads, holiday cookies, and warming pastries.",
    content: "As winter approaches, we're excited to introduce...",
    slug: "seasonal-winter-specials",
    date: "2024-01-10",
    author: { node: { name: "Mike Chen" } },
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        altText: "Winter pastries and hot drinks"
      }
    }
  }
];

export const mockAboutPage = {
  title: "About Sweet Crumbs",
  content: `
    <h2>Our Story</h2>
    <p>Sweet Crumbs Bakery was born from a simple dream: to bring authentic, artisanal baked goods to our community. Founded in 2020 by master baker Sarah Johnson, we've grown from a small home kitchen operation to your favorite neighborhood bakery.</p>

    <p>Every morning at 4 AM, our team begins the careful process of mixing, kneading, and shaping dough using time-honored techniques passed down through generations. We source our flour from local mills, our butter from nearby dairy farms, and our seasonal fruits from regional growers.</p>

    <h2>Our Mission</h2>
    <p>To create exceptional baked goods that bring joy to everyday moments, while supporting our local community and maintaining the highest standards of quality and sustainability.</p>
  `,
  featuredImage: {
    node: {
      sourceUrl: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Sweet Crumbs bakery interior"
    }
  }
};