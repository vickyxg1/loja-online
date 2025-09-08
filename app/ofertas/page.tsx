'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product, ProductFilters } from '@/models/Product';
import { ProductService } from '@/services/productService';
import Banner from '@/components/Banner';
import ProductGrid from '@/components/ProductGrid';
import ProductFiltersComponent from '@/components/ProductFilters';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

export default function OfertasPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({});

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          ProductService.getAllProducts(),
          ProductService.getCategories()
        ]);
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Erro ao carregar produtos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price filters
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice!);
    }

    // Search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered = ProductService.sortProducts(filtered, filters.sortBy);
    }

    setFilteredProducts(filtered);
  }, [products, filters]);

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleProductBuy = (product: Product) => {
    const message = product.isOnSale 
      ? `🎉 Oferta aproveitada! ${product.title} adicionado ao carrinho!`
      : `${product.title} adicionado ao carrinho!`;
    
    const description = product.isOnSale && product.originalPrice
      ? `Preço promocional: R$ ${product.price.toFixed(2).replace('.', ',')} (Economia: R$ ${(product.originalPrice - product.price).toFixed(2).replace('.', ',')})`
      : `Preço: R$ ${product.price.toFixed(2).replace('.', ',')}`;

    toast.success(message, { description });
  };

  // Calculate statistics
  const totalProducts = filteredProducts.length;
  const productsOnSale = filteredProducts.filter(p => p.isOnSale).length;
  const averageDiscount = productsOnSale > 0 
    ? Math.round(filteredProducts
        .filter(p => p.isOnSale && p.discountPercentage)
        .reduce((sum, p) => sum + (p.discountPercentage || 0), 0) / productsOnSale)
    : 0;

  return (
    <>
      <Banner 
        title="Ofertas da Semana"
        subtitle={`${productsOnSale} produtos em promoção com até ${Math.max(...filteredProducts.map(p => p.discountPercentage || 0))}% de desconto`}
        backgroundImage="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
        </div>

        <ProductFiltersComponent
          categories={categories}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />

        {/* Statistics Bar */}
        {!loading && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-blue-600">{totalProducts}</span>
                <span className="text-gray-600">produtos encontrados</span>
              </div>
              {productsOnSale > 0 && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-red-600">{productsOnSale}</span>
                    <span className="text-gray-600">em promoção</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-600">{averageDiscount}%</span>
                    <span className="text-gray-600">desconto médio</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <section aria-label="Lista de produtos em oferta">
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            onProductBuy={handleProductBuy}
          />
        </section>
      </main>
    </>
  );
}