'use client';

import Image from 'next/image';
import { Product, ProductFormatter } from '@/models/Product';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Percent } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onBuyClick?: (product: Product) => void;
}

export default function ProductCard({ product, onBuyClick }: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const { addItem } = useCart();

  const handleBuyClick = () => {
    // Add to cart
    addItem(product);
    
    // Call the optional callback
    if (onBuyClick) {
      onBuyClick(product);
    }
  };

  return (
    <Card className="group h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 shadow-lg">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={product.image}
            alt={`Imagem do produto ${product.title}`}
            fill
            className={`object-contain p-4 transition-opacity duration-300 group-hover:scale-110 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge 
              variant="secondary" 
              className="bg-white/90 text-gray-700 hover:bg-white text-xs"
            >
              {product.category}
            </Badge>
            {product.isOnSale && product.discountPercentage && (
              <Badge 
                className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1"
              >
                <Percent className="w-3 h-3" />
                {product.discountPercentage}% OFF
              </Badge>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {ProductFormatter.truncateTitle(product.title, 60)}
          </h2>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {ProductFormatter.formatRating(product.rating.rate)} ({product.rating.count})
            </span>
          </div>

          {/* Price Section */}
          <div className="mt-auto">
            <div className="mb-3">
              {product.isOnSale && product.originalPrice ? (
                <div className="space-y-1">
                  {/* Original Price (crossed out) */}
                  <div className="text-sm text-gray-500 line-through">
                    De: {ProductFormatter.formatPrice(product.originalPrice)}
                  </div>
                  {/* Current Price (highlighted) */}
                  <div className="text-2xl font-bold text-red-600">
                    Por: {ProductFormatter.formatPrice(product.price)}
                  </div>
                  {/* Savings */}
                  <div className="text-sm text-green-600 font-medium">
                    Economize {ProductFormatter.formatPrice(product.originalPrice - product.price)}
                  </div>
                </div>
              ) : (
                <div className="text-2xl font-bold text-green-600">
                  {ProductFormatter.formatPrice(product.price)}
                </div>
              )}
            </div>

            {/* Buy Button */}
            <Button
              onClick={handleBuyClick}
              className={`w-full font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                product.isOnSale 
                  ? 'bg-red-600 hover:bg-red-700 group-hover:bg-red-800' 
                  : 'bg-blue-600 hover:bg-blue-700 group-hover:bg-green-600'
              } text-white`}
              aria-label={`Comprar ${product.title} por ${ProductFormatter.formatPrice(product.price)}`}
            >
              <ShoppingCart className="w-4 h-4" />
              {product.isOnSale ? 'Aproveitar Oferta' : 'Comprar'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}