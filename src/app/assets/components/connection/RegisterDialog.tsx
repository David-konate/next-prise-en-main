import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/app/lib/validation";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterDialogProps {
  onClose: () => void;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du compte");
      }

      console.log("Compte créé avec succès");
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signIn("google");
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
        <div className="px-6 py-8">
          <div className="flex justify-center">
            <div className="flex items-center justify-center h-20 w-20 bg-blue-100 rounded-full">
              <Image
                src="/padlock.svg"
                alt="Icone de sécurité"
                width={80}
                height={80}
                className="h-12 w-12"
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Création de compte
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pseudo:
                </label>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.username ? "border-red-500" : ""
                  }`}
                  style={{ color: "black" }}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  style={{ color: "black" }}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe:
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  style={{ color: "black" }}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmer le mot de passe:
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  style={{ color: "black" }}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>

          <div className="mt-5 flex justify-center">
            {/* Bouton de connexion avec Google */}
            <form onSubmit={handleSignIn}>
              <button type="submit" className="elevated-button">
                <Image
                  className="h-20 hover:bg-yellow-200 rounded-xl"
                  src="/google.svg"
                  width="80"
                  height="80"
                  alt="Facebook"
                />
              </button>
            </form>
          </div>
          <div className="mt-4 text-center">
            <div className="border-b"></div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => onClose()}
              className="inline-block text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterDialog;
