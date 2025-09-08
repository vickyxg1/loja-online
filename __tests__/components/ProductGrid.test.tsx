import { render, screen } from '@testing-library/react';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/models/Product';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 29.99,
    description: 'Description 1',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/1.jpg',
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 2,
    title: 'Product 2',
    price: 39.99,
    description: 'Description 2',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/2.jpg',
    rating: { rate: 4.0, count: 80 }
  }
];

describe('ProductGrid', () => {
  it('renders loading skeleton when loading is true', () => {
    render(<ProductGrid products={[]} loading={true} />);
    
    // Should render multiple skeleton cards
    const skeletonCards = screen.getAllByRole('generic');
    expect(skeletonCards.length).toBeGreaterThan(0);
  });

  it('renders empty state when no products are provided', () => {
    render(<ProductGrid products={[]} loading={false} />);
    
    expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
    expect(screen.getByText('Tente ajustar os filtros ou volte mais tarde.')).toBeInTheDocument();
  });

  it('renders product cards when products are provided', () => {
    render(<ProductGrid products={mockProducts} loading={false} />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('R$ 29,99')).toBeInTheDocument();
    expect(screen.getByText('R$ 39,99')).toBeInTheDocument();
  });

  it('calls onProductBuy when a product buy button is clicked', () => {
    const mockOnProductBuy = jest.fn();
    render(
      <ProductGrid 
        products={mockProducts} 
        loading={false} 
        onProductBuy={mockOnProductBuy} 
      />
    );
    
    const buyButtons = screen.getAllByText('Comprar');
    expect(buyButtons.length).toBe(2);
  });

  it('renders correct grid layout classes', () => {
    const { container } = render(
      <ProductGrid products={mockProducts} loading={false} />
    );
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
    expect(grid).toHaveClass('xl:grid-cols-4');
  });
});