import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  email: z.email({ message: "Por favor, insira um e-mail válido." }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." }),
});

export const loginSchema = z.object({
  email: z.email({ message: "Por favor, insira um e-mail válido." }),

  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

export const calculatorInputSchema = z.object({
  contaminant: z.string().min(1, { message: "Selecione um contaminante." }),
  C: z.number().positive({ message: "C deve ser um número positivo." }),
  IR: z.number().positive({ message: "IR deve ser um número positivo." }),
  EF: z.number().positive({ message: "EF deve ser um número positivo." }),
  ED: z.number().positive({ message: "ED deve ser um número positivo." }),
  BW: z.number().positive({ message: "BW deve ser um número positivo." }),
  AT: z.number().positive({ message: "AT deve ser um número positivo." }),
});
