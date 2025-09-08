import { Product } from '@/models/Product';

export class ProductService {
  private static readonly BASE_URL = 'https://fakestoreapi.com';

  // Simular produtos em promoção com descontos aleatórios
  private static addPromotions(products: Product[]): Product[] {
    return products.map(product => {
      // 60% dos produtos terão desconto
      const hasDiscount = Math.random() > 0.4;
      
      if (hasDiscount) {
        // Desconto entre 10% e 70%
        const discountPercentage = Math.floor(Math.random() * 60) + 10;
        const originalPrice = product.price;
        const discountedPrice = originalPrice * (1 - discountPercentage / 100);
        
        return {
          ...product,
          originalPrice,
          price: Math.round(discountedPrice * 100) / 100,
          discountPercentage,
          isOnSale: true
        };
      }
      
      return {
        ...product,
        isOnSale: false
      };
    });
  }

  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/products`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const products: Product[] = await response.json();
      return this.addPromotions(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/products/category/${category}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const products: Product[] = await response.json();
      return this.addPromotions(products);
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw new Error(`Failed to fetch products for category: ${category}`);
    }
  }

  static async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/products/categories`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const categories: string[] = await response.json();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  static sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
      case 'discount':
        return sorted.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  }
}