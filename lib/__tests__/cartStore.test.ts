import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../store/cartStore';

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it('يضيف منتج إلى السلة', () => {
    useCartStore.getState().addItem({
      id: 1, name: 'منتج تجريبي', price: 50, quantity: 1, image: '/test.jpg'
    });
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it('يزيد الكمية عند إضافة نفس المنتج', () => {
    useCartStore.getState().addItem({
      id: 1, name: 'منتج تجريبي', price: 50, quantity: 1, image: '/test.jpg'
    });
    useCartStore.getState().addItem({
      id: 1, name: 'منتج تجريبي', price: 50, quantity: 1, image: '/test.jpg'
    });
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it('يزيل منتج من السلة', () => {
    useCartStore.getState().addItem({
      id: 1, name: 'منتج تجريبي', price: 50, quantity: 1, image: '/test.jpg'
    });
    useCartStore.getState().removeItem(1);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('يحسب المجموع الفرعي بشكل صحيح', () => {
    useCartStore.getState().addItem({
      id: 1, name: 'منتج 1', price: 100, quantity: 2, image: '/test.jpg'
    });
    useCartStore.getState().addItem({
      id: 2, name: 'منتج 2', price: 50, quantity: 1, image: '/test.jpg'
    });
    expect(useCartStore.getState().subtotal()).toBe(250);
  });

  it('يفرغ السلة بالكامل', () => {
    useCartStore.getState().addItem({
      id: 1, name: 'منتج تجريبي', price: 50, quantity: 1, image: '/test.jpg'
    });
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
