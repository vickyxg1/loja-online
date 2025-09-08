import { formatCurrency, truncateText, slugify, formatRating } from '@/utils/formatters';

describe('Formatter utilities', () => {
  describe('formatCurrency', () => {
    it('formats currency to BRL correctly', () => {
      expect(formatCurrency(29.99)).toBe('R$ 29,99');
      expect(formatCurrency(1000)).toBe('R$ 1.000,00');
      expect(formatCurrency(0)).toBe('R$ 0,00');
    });
  });

  describe('truncateText', () => {
    it('returns original text if shorter than max length', () => {
      expect(truncateText('Short text', 20)).toBe('Short text');
    });

    it('truncates text properly', () => {
      const longText = 'This is a very long text that needs to be truncated';
      const result = truncateText(longText, 20);
      expect(result).toBe('This is a very long...');
      expect(result.length).toBe(23);
    });
  });

  describe('slugify', () => {
    it('converts text to URL-friendly slug', () => {
      expect(slugify('Product Name')).toBe('product-name');
      expect(slugify('Special Characters! @#$%')).toBe('special-characters');
      expect(slugify('Açaí com Açúcar')).toBe('acai-com-acucar');
    });

    it('handles edge cases', () => {
      expect(slugify('')).toBe('');
      expect(slugify('   ')).toBe('');
      expect(slugify('---test---')).toBe('test');
    });
  });

  describe('formatRating', () => {
    it('formats rating to one decimal place', () => {
      expect(formatRating(4.567)).toBe('4.6');
      expect(formatRating(3)).toBe('3.0');
      expect(formatRating(0)).toBe('0.0');
    });
  });
});