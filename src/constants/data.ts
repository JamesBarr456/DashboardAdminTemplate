import { NavItem } from '@/types';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Panel General',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },

  {
    title: 'Ventas',
    url: '/dashboard/sales',
    icon: 'shoppingCart',
    isActive: false,
    shortcut: ['s', 's'],
    items: []
  },
  {
    title: 'Movimiento de Caja',
    url: '/dashboard/cash-history',
    icon: 'history',
    isActive: false,
    shortcut: ['m', 'm'],
    items: []
  },
  {
    title: 'Producto',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Pedidos',
    url: '/dashboard/order',
    icon: 'order',
    shortcut: ['o', 'o'],
    isActive: false,
    items: [] // No child items
  }
];
