import { Product, fakeProducts } from '@/constants/product-mock-api';

import { create } from 'zustand';

// --- Store con Zustand ---
export interface SaleItem {
  product: Product;
  sizes: { [size: string]: number }; // Ejemplo: { M: 5, L: 7 }
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
  addToSale: (product: Product, quantity: number, selectedSize: string) => void;
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
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // si ya existe el producto, sumamos al talle correspondiente
        const updatedSizes = {
          ...existingItem.sizes,
          [selectedSize]: (existingItem.sizes[selectedSize] || 0) + quantity
        };

        const newSubtotal =
          Object.values(updatedSizes).reduce((sum, qty) => sum + qty, 0) *
          existingItem.unit_price;

        return {
          currentSale: state.currentSale.map((item) =>
            item.product.id === product.id
              ? { ...item, sizes: updatedSizes, subtotal: newSubtotal }
              : item
          )
        };
      }

      // si no existe el producto, lo creamos con el primer talle
      return {
        currentSale: [
          ...state.currentSale,
          {
            product,
            sizes: { [selectedSize]: quantity },
            unit_price: product.sale_price,
            subtotal: product.sale_price * quantity
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
      // calcular el total sumando todos los talles de todos los productos
      const total = state.currentSale.reduce((sum, item) => {
        const totalQty = Object.values(item.sizes).reduce(
          (acc, qty) => acc + qty,
          0
        );
        return sum + totalQty * item.unit_price;
      }, 0);

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
        const saleItem = state.currentSale.find(
          (item) => item.product.id === product.id
        );

        if (!saleItem) return product;

        // si tu Product ya maneja stock por talle:
        const updatedStock = { ...product.stock };

        for (const [size, qty] of Object.entries(saleItem.sizes)) {
          if (updatedStock[size] !== undefined) {
            updatedStock[size] = Math.max(0, (updatedStock[size] ?? 0) - qty);
          } else {
            // si no existe el talle en stock, lo restamos del "default"
            updatedStock.default = Math.max(
              0,
              (updatedStock.default ?? 0) - qty
            );
          }
        }

        return {
          ...product,
          stock: updatedStock
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
