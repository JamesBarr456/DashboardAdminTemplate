// src/lib/translation.ts
// Funciones utilitarias para traducción de valores internos a textos legibles

export function translatePaymentMethod(method: string): string {
  switch (method) {
    case 'cash':
      return 'Efectivo';
    case 'transfer':
      return 'Transferencia';
    default:
      return method;
  }
}

export function translateDeliveryOption(option: string): string {
  switch (option) {
    case 'delivery':
      return 'Envío';
    case 'pickup':
      return 'Retiro';
    default:
      return option;
  }
}

export function translateMovementType(type: string): string {
  switch (type) {
    case 'sale':
      return 'Venta';
    case 'return':
      return 'Devolución';
    case 'expense':
      return 'Egreso';
    case 'income':
      return 'Ingreso';
    case 'opening':
      return 'Apertura';
    default:
      return type;
  }
}
