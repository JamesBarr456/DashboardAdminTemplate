import { Product, fakeProducts } from '@/constants/product-mock-api';
import { create } from 'zustand';

// --- Store con Zustand ---
export interface SaleItem {
  product: Product;
  size: string;
  unit_price: number;
  quantity: number;
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
  addToSale: (product: Product, quantity: number, selectedSize: string) => void;
  removeFromSale: (productId: string, size: string) => void;
  updateSaleQuantity: (
    productId: string,
    size: string,
    quantity: number
  ) => void;
  clearSale: () => void;
  completeSale: (
    paymentMethod: 'cash' | 'card' | 'qr',
    discount?: number
  ) => void;
  updateProductStock: (
    productId: string,
    size: string,
    newStock: number
  ) => void;
  addMovement: (movement: Omit<Movement, 'id' | 'timestamp'>) => void;
}

export const usePOSStore = create<POSState>((set, get) => ({
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

  addToSale: (product, quantity, selectedSize: string) =>
    set((state) => {
      const existingItem = state.currentSale.find(
        (item) => item.product.id === product.id && item.size === selectedSize
      );

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
          subtotal: (existingItem.quantity + quantity) * existingItem.unit_price
        };

        return {
          currentSale: state.currentSale.map((item) =>
            item.product.id === product.id && item.size === selectedSize
              ? updatedItem
              : item
          )
        };
      }

      return {
        currentSale: [
          ...state.currentSale,
          {
            product,
            size: selectedSize,
            quantity,
            unit_price: product.sale_price,
            subtotal: product.sale_price * quantity
          }
        ]
      };
    }),

  removeFromSale: (productId, size) =>
    set((state) => ({
      currentSale: state.currentSale.filter(
        (item) => !(item.product.id === +productId && item.size === size)
      )
    })),

  updateSaleQuantity: (productId, size, quantity) =>
    set((state) => ({
      currentSale: state.currentSale.map((item) =>
        item.product.id === +productId && item.size === size
          ? {
              ...item,
              quantity,
              subtotal: item.unit_price * quantity
            }
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

      // actualizar stock restando por talle
      const updatedProducts = state.products.map((product) => {
        const saleItems = state.currentSale.filter(
          (item) => item.product.id === product.id
        );

        if (!saleItems.length) return product;

        const updatedStock = { ...product.stock };

        for (const saleItem of saleItems) {
          if (updatedStock[saleItem.size] !== undefined) {
            updatedStock[saleItem.size] = Math.max(
              0,
              (updatedStock[saleItem.size] ?? 0) - saleItem.quantity
            );
          }
        }

        return { ...product, stock: updatedStock };
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

  updateProductStock: (productId, size, newStock) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === +productId
          ? { ...p, stock: { ...p.stock, [size]: newStock } }
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
