import { describe, it, expect, beforeEach } from 'vitest';
import { useWishlistStore } from '../store/wishlistStore';

describe('Wishlist Store', () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: [] });
  });

  it('يضيف منتج إلى المفضلة', () => {
    useWishlistStore.getState().toggleItem({
      id: 1, name: 'منتج تجريبي', image: '/test.jpg', price: '50 ₪'
    });
    expect(useWishlistStore.getState().items).toHaveLength(1);
  });

  it('يزيل منتج من المفضلة عند الضغط مرة أخرى', () => {
    useWishlistStore.getState().toggleItem({
      id: 1, name: 'منتج تجريبي', image: '/test.jpg', price: '50 ₪'
    });
    useWishlistStore.getState().toggleItem({
      id: 1, name: 'منتج تجريبي', image: '/test.jpg', price: '50 ₪'
    });
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });

  it('يتحقق إذا كان المنتج في المفضلة', () => {
    useWishlistStore.getState().toggleItem({
      id: 1, name: 'منتج تجريبي', image: '/test.jpg', price: '50 ₪'
    });
    expect(useWishlistStore.getState().isFavorite(1)).toBe(true);
    expect(useWishlistStore.getState().isFavorite(2)).toBe(false);
  });

  it('يفرغ المفضلة بالكامل', () => {
    useWishlistStore.getState().toggleItem({
      id: 1, name: 'منتج 1', image: '/test.jpg', price: '50 ₪'
    });
    useWishlistStore.getState().toggleItem({
      id: 2, name: 'منتج 2', image: '/test.jpg', price: '30 ₪'
    });
    useWishlistStore.getState().clearWishlist();
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });
});
