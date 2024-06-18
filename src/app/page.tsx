"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
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
        <button type="submit" className="elevated-button">
          <Image
            className="h-20 hover:bg-blue-100 rounded-xl"
            src="/google.svg"
            width="100"
            height="100"
            alt="Hero"
          />
        </button>
      </form>
    </div>
  );
};

export default Home;
