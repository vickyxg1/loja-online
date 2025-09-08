export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  isOnSale?: boolean;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'discount' | 'name';
}

export class ProductFormatter {
  static formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  static formatRating(rating: number): string {
    return `⭐ ${rating.toFixed(1)}`;
  }

  static truncateTitle(title: string, maxLength: number): string {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength).trim() + '...';
  }

  static calculateDiscount(originalPrice: number, currentPrice: number): number {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }
}