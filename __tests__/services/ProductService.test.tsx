import { ProductService } from '@/services/productService';
import { Product } from '@/models/Product';

// Mock fetch globally
global.fetch = jest.fn();

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('fetches and returns all products successfully', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          title: 'Product 1',
          price: 29.99,
          description: 'Description 1',
          category: "men's clothing",
          image: 'https://fakestoreapi.com/img/1.jpg',
          rating: { rate: 4.5, count: 120 }
        }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const result = await ProductService.getAllProducts();

      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
      expect(result).toEqual(mockProducts);
    });

    it('throws error when fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(ProductService.getAllProducts()).rejects.toThrow(
        'Failed to fetch products'
      );
    });

    it('throws error when network request fails', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(ProductService.getAllProducts()).rejects.toThrow(
        'Failed to fetch products'
      );
    });
  });

  describe('getProductsByCategory', () => {
    it('fetches and returns products by category successfully', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          title: 'Electronics Product',
          price: 99.99,
          description: 'An electronic device',
          category: 'electronics',
          image: 'https://fakestoreapi.com/img/1.jpg',
          rating: { rate: 4.2, count: 50 }
        }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const result = await ProductService.getProductsByCategory('electronics');

      expect(fetch).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products/category/electronics'
      );
      expect(result).toEqual(mockProducts);
    });

    it('throws error when category fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

      await expect(
        ProductService.getProductsByCategory('invalid-category')
      ).rejects.toThrow('Failed to fetch products for category: invalid-category');
    });
  });

  describe('getCategories', () => {
    it('fetches and returns all categories successfully', async () => {
      const mockCategories = ['electronics', "men's clothing", "women's clothing", 'jewelery'];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      });

      const result = await ProductService.getCategories();

      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/categories');
      expect(result).toEqual(mockCategories);
    });

    it('throws error when categories fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(ProductService.getCategories()).rejects.toThrow(
        'Failed to fetch categories'
      );
    });
  });
});