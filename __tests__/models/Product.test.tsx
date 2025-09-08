import { ProductFormatter } from '@/models/Product';

describe('ProductFormatter', () => {
  describe('formatPrice', () => {
    it('formats price to BRL currency correctly', () => {
      expect(ProductFormatter.formatPrice(29.99)).toBe('R$ 29,99');
      expect(ProductFormatter.formatPrice(100)).toBe('R$ 100,00');
      expect(ProductFormatter.formatPrice(1234.56)).toBe('R$ 1.234,56');
    });

    it('handles zero and negative prices', () => {
      expect(ProductFormatter.formatPrice(0)).toBe('R$ 0,00');
      expect(ProductFormatter.formatPrice(-10.50)).toBe('-R$ 10,50');
    });
  });

  describe('truncateTitle', () => {
    it('returns original title if shorter than max length', () => {
      const title = 'Short title';
      expect(ProductFormatter.truncateTitle(title, 50)).toBe(title);
    });

    it('truncates title if longer than max length', () => {
      const longTitle = 'This is a very long product title that exceeds the maximum length';
      const result = ProductFormatter.truncateTitle(longTitle, 20);
      
      expect(result).toHaveLength(23); // 20 characters + '...'
      expect(result.endsWith('...')).toBe(true);
      expect(result.startsWith('This is a very long')).toBe(true);
    });

    it('uses default max length of 50 characters', () => {
      const longTitle = 'This is a very long product title that definitely exceeds fifty characters in total length';
      const result = ProductFormatter.truncateTitle(longTitle);
      
      expect(result.length).toBeLessThanOrEqual(53); // 50 + '...'
      expect(result.endsWith('...')).toBe(true);
    });
  });

  describe('formatRating', () => {
    it('formats rating with one decimal place and star emoji', () => {
      expect(ProductFormatter.formatRating(4.5)).toBe('4.5 ⭐');
      expect(ProductFormatter.formatRating(3)).toBe('3.0 ⭐');
      expect(ProductFormatter.formatRating(4.99)).toBe('5.0 ⭐');
    });

    it('handles edge cases', () => {
      expect(ProductFormatter.formatRating(0)).toBe('0.0 ⭐');
      expect(ProductFormatter.formatRating(5)).toBe('5.0 ⭐');
    });
  });
});