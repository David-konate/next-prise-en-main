import { z } from "zod";

const IS_REQUIRED_MESSAGE = "Ce champ est requis";
const IS_NOT_REGEX_VALID_MESSAGE = "Le format de l'email est invalide";
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const loginSchema = z.object({
  email: z.string()
    .regex(EMAIL_REGEX, { message: IS_NOT_REGEX_VALID_MESSAGE })
    .min(1, { message: IS_REQUIRED_MESSAGE }),

  password: z.string()
    .min(8, { message: "Le mot de passe doit comporter au moins 8 caractères" })
    .max(32, { message: "Le mot de passe ne peut pas dépasser 32 caractères" })
    .min(1, { message: IS_REQUIRED_MESSAGE }),
});

export const registerSchema = loginSchema.extend({
  username: z.string()
    .min(3, { message: "Le nom d'utilisateur doit comporter au moins 3 caractères" })
    .max(20, { message: "Le nom d'utilisateur ne peut pas dépasser 20 caractères" })
    .min(1, { message: IS_REQUIRED_MESSAGE }),
  
  confirmPassword: z.string()
    .min(8, { message: "Le mot de passe de confirmation doit comporter au moins 8 caractères" })
    .max(32, { message: "Le mot de passe de confirmation ne peut pas dépasser 32 caractères" })
    .min(1, { message: IS_REQUIRED_MESSAGE }),


  email: z.string()
    .regex(EMAIL_REGEX, { message: IS_NOT_REGEX_VALID_MESSAGE })
    .min(1, { message: IS_REQUIRED_MESSAGE }),
});
