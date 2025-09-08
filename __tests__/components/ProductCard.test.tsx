import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/models/Product';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'A test product for testing purposes',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 4.5,
    count: 120
  }
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('R$ 29,99')).toBeInTheDocument();
    expect(screen.getByText("men's clothing")).toBeInTheDocument();
    expect(screen.getByText('4.5 (120)')).toBeInTheDocument();
  });

  it('renders product image with correct alt text', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Imagem do produto Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });

  it('calls onBuyClick when buy button is clicked', () => {
    const mockOnBuyClick = jest.fn();
    render(<ProductCard product={mockProduct} onBuyClick={mockOnBuyClick} />);

    const buyButton = screen.getByRole('button', { 
      name: /comprar test product por r\$ 29,99/i 
    });
    fireEvent.click(buyButton);

    expect(mockOnBuyClick).toHaveBeenCalledWith(mockProduct);
  });

  it('has accessible buy button with proper aria-label', () => {
    render(<ProductCard product={mockProduct} />);

    const buyButton = screen.getByRole('button', { 
      name: /comprar test product por r\$ 29,99/i 
    });
    expect(buyButton).toBeInTheDocument();
    expect(buyButton).toHaveAttribute('aria-label');
  });

  it('truncates long product titles', () => {
    const longTitleProduct: Product = {
      ...mockProduct,
      title: 'This is a very long product title that should be truncated to fit the card layout properly'
    };

    render(<ProductCard product={longTitleProduct} />);
    
    // Should show truncated title with ellipsis
    const titleElement = screen.getByRole('heading', { level: 2 });
    expect(titleElement.textContent?.includes('...')).toBe(true);
  });
});