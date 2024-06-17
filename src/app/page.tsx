"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

const Home = () => {
  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signIn("google");
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <div>
      <Link href="/heroes">Héros</Link>
      <Link href="/heroes/1">Héro</Link>
      <form onSubmit={handleSignIn}>
        <button type="submit">Se connecter avec Google</button>
      </form>
    </div>
  );
};

export default Home;
