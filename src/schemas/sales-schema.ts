import { z } from 'zod';

export const cashRegisterOpeningSchema = z.object({
  initialAmount: z.coerce.number().min(0, 'El monto no puede ser negativo')
});

export type CashRegisterOpening = z.infer<typeof cashRegisterOpeningSchema>;
