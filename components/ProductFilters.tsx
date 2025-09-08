'use client';

import { useState } from 'react';
import { ProductFilters } from '@/models/Product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, ArrowUpDown } from 'lucide-react';

interface ProductFiltersProps {
  categories: string[];
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
}

export default function ProductFiltersComponent({ 
  categories, 
  filters, 
  onFiltersChange, 
  onClearFilters 
}: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({ ...filters, searchTerm: searchTerm || undefined });
  };

  const handleCategoryChange = (category: string) => {
    onFiltersChange({ 
      ...filters, 
      category: category === 'all' ? undefined : category 
    });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({ 
      ...filters, 
      sortBy: sortBy === 'default' ? undefined : sortBy as ProductFilters['sortBy']
    });
  };

  const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice || filters.searchTerm || filters.sortBy;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* First Row: Search and Sort */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>

            {/* Sort By */}
            <Select value={filters.sortBy || 'default'} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full lg:w-64">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Padrão</SelectItem>
                <SelectItem value="price-asc">Menor preço</SelectItem>
                <SelectItem value="price-desc">Maior preço</SelectItem>
                <SelectItem value="rating">Melhor avaliação</SelectItem>
                <SelectItem value="discount">Maior desconto</SelectItem>
                <SelectItem value="name">Nome A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Second Row: Category and Clear */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Category Filter */}
            <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                onClick={onClearFilters}
                className="flex items-center gap-2 lg:w-auto"
              >
                <X className="w-4 h-4" />
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary" className="text-xs">
                  Categoria: {filters.category}
                </Badge>
              )}
              {filters.searchTerm && (
                <Badge variant="secondary" className="text-xs">
                  Busca: "{filters.searchTerm}"
                </Badge>
              )}
              {filters.sortBy && (
                <Badge variant="secondary" className="text-xs">
                  Ordenação: {
                    filters.sortBy === 'price-asc' ? 'Menor preço' :
                    filters.sortBy === 'price-desc' ? 'Maior preço' :
                    filters.sortBy === 'rating' ? 'Melhor avaliação' :
                    filters.sortBy === 'discount' ? 'Maior desconto' :
                    filters.sortBy === 'name' ? 'Nome A-Z' : 'Padrão'
                  }
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}