import { z } from "zod";

// Esquema para o formulário de Cadastro (Sign Up)
export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  email: z.email({ message: "Por favor, insira um e-mail válido." }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." }),
});

// Esquema para o formulário de Login (Sign In)
export const loginSchema = z.object({
  email: z.email({ message: "Por favor, insira um e-mail válido." }),
  // No login, apenas verificamos se a senha não está vazia.
  // A validação de "senha correta" é feita no servidor.
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});
