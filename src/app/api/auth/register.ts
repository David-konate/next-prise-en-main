import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, email, password, confirmPassword } = req.body;

    // Validation de l'entrée utilisateur
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
    }

    // Hacher le mot de passe en toute sécurité
    const hashedPassword = await hash(password, 10);

    try {
      const createdUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      // Gérer la création réussie de l'utilisateur (par exemple, envoyer un e-mail de confirmation)
      res.status(200).json({ message: "Utilisateur créé avec succès !" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
  } else {
    // Gérer d'autres méthodes HTTP (facultatif)
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
