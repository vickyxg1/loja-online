'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link href="/carrinho">
      <Button variant="outline" size="sm" className="relative">
        <ShoppingCart className="w-4 h-4" />
        {itemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </Badge>
        )}
        <span className="sr-only">Carrinho com {itemCount} itens</span>
      </Button>
    </Link>
  );
}