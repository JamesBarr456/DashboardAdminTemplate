import { Product, fakeProducts } from '@/constants/product-mock-api';

import { create } from 'zustand';

// --- Store con Zustand ---
export interface SaleItem {
  product: Product;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  tax: number;
  paymentMethod: 'cash' | 'card' | 'qr';
  cashier: string;
  timestamp: Date;
  discount?: number;
}

export interface Movement {
  id: string;
  type: 'sale' | 'return' | 'expense' | 'income';
  amount: number;
  description: string;
  cashier: string;
  timestamp: Date;
}

export interface CashRegister {
  isOpen: boolean;
  initialAmount: number;
  currentAmount: number;
  openedAt?: Date;
  closedAt?: Date;
  cashier: string;
}
interface POSState {
  cashRegister: CashRegister;
  products: Product[];
  currentSale: SaleItem[];
  sales: Sale[];
  movements: Movement[];

  // acciones
  fetchProducts: () => Promise<void>;

  openRegister: (initialAmount: number, cashier: string) => void;
  closeRegister: () => void;
  addToSale: (product: Product, quantity: number) => void;
  removeFromSale: (productId: string) => void;
  updateSaleQuantity: (productId: string, quantity: number) => void;
  clearSale: () => void;
  completeSale: (
    paymentMethod: 'cash' | 'card' | 'qr',
    discount?: number
  ) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  addMovement: (movement: Omit<Movement, 'id' | 'timestamp'>) => void;
}

export const usePOSStore = create<POSState>((set) => ({
  cashRegister: {
    isOpen: false,
    initialAmount: 0,
    currentAmount: 0,
    cashier: 'Sistema'
  },
  products: [],
  currentSale: [],
  sales: [],
  movements: [],

  fetchProducts: async () => {
    const res = await fakeProducts.getAll({});
    if (res) {
      set({ products: res });
    }
  },
  openRegister: (initialAmount, cashier) => {
    set((state) => ({
      cashRegister: {
        isOpen: true,
        initialAmount,
        currentAmount: initialAmount,
        openedAt: new Date(),
        cashier
      },
      movements: [
        ...state.movements,
        {
          id: Date.now().toString(),
          type: 'income',
          amount: initialAmount,
          description: 'Apertura de caja',
          cashier,
          timestamp: new Date()
        }
      ]
    }));
  },

  closeRegister: () =>
    set((state) => ({
      cashRegister: {
        ...state.cashRegister,
        isOpen: false,
        closedAt: new Date()
      }
    })),

  addToSale: (product, quantity) =>
    set((state) => {
      const existingItem = state.currentSale.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          currentSale: state.currentSale.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  subtotal: (item.quantity + quantity) * item.product.sale_price
                }
              : item
          )
        };
      }

      return {
        currentSale: [
          ...state.currentSale,
          {
            product,
            quantity,
            subtotal: product.sale_price * quantity,
            unit_price: product.sale_price
          }
        ]
      };
    }),

  removeFromSale: (productId) =>
    set((state) => ({
      currentSale: state.currentSale.filter(
        (item) => item.product.id !== +productId
      )
    })),

  updateSaleQuantity: (productId, quantity) =>
    set((state) => ({
      currentSale: state.currentSale.map((item) =>
        item.product.id === +productId
          ? { ...item, quantity, subtotal: item.product.sale_price * quantity }
          : item
      )
    })),

  clearSale: () => set({ currentSale: [] }),

  completeSale: (paymentMethod, discount = 0) =>
    set((state) => {
      const total = state.currentSale.reduce(
        (sum, item) => sum + item.subtotal,
        0
      );
      const finalTotal = total - discount;
      const tax = finalTotal * 0.18;

      const sale: Sale = {
        id: Date.now().toString(),
        items: state.currentSale,
        total: finalTotal,
        tax,
        paymentMethod,
        cashier: state.cashRegister.cashier,
        timestamp: new Date(),
        discount
      };

      const movement: Movement = {
        id: (Date.now() + 1).toString(),
        type: 'sale',
        amount: finalTotal,
        description: `Venta #${sale.id}`,
        cashier: state.cashRegister.cashier,
        timestamp: new Date()
      };

      const updatedProducts = state.products.map((product) => {
        const saleItem = state.currentSale.find(
          (item) => item.product.id === product.id
        );

        if (!saleItem) return product;

        return {
          ...product,
          stock: {
            ...product.stock,
            default: (product.stock.default ?? 0) - saleItem.quantity
          }
        };
      });

      return {
        sales: [sale, ...state.sales],
        movements: [movement, ...state.movements],
        currentSale: [],
        products: updatedProducts,
        cashRegister: {
          ...state.cashRegister,
          currentAmount:
            paymentMethod === 'cash'
              ? state.cashRegister.currentAmount + finalTotal
              : state.cashRegister.currentAmount
        }
      };
    }),

  updateProductStock: (productId, newStock) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === +productId
          ? { ...p, stock: { ...p.stock, default: newStock } }
          : p
      )
    })),

  addMovement: (movement) =>
    set((state) => ({
      movements: [
        {
          ...movement,
          id: Date.now().toString(),
          timestamp: new Date()
        },
        ...state.movements
      ],
      cashRegister: {
        ...state.cashRegister,
        currentAmount:
          movement.type === 'income'
            ? state.cashRegister.currentAmount + movement.amount
            : state.cashRegister.currentAmount - movement.amount
      }
    }))
}));
