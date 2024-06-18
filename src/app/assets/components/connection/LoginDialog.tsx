import { signIn } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/lib/validation";

interface LoginDialogProps {
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signIn("google");
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  const onSubmit = async (data: any) => {
    // Handle form submission logic (e.g., API call)
    console.log("Submitted data:", data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
        <div className="px-6 py-8">
          <div className="flex justify-center">
            <div className="flex items-center justify-center h-20 w-20 bg-blue-100 rounded-full">
              <Image
                src="/padlock.svg"
                alt="Hero"
                width={80}
                height={80}
                className="h-12 w-12"
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Vous connecter
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  {...register("email")}
                />
                {typeof errors.email === "string" && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:
                </label>
                <input
                  id="password"
                  type="password"
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  {...register("password")}
                />
                {typeof errors.password === "string" && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
          <div className="mt-5 flex justify-center">
            {/* Bouton de connexion avec Google */}
            <form onSubmit={handleSignIn}>
              <button type="submit" className="elevated-button">
                <Image
                  className="h-20 rounded-xl hover:transform rotate-30 hover:bg-yellow-200"
                  src="/google.svg"
                  width="80"
                  height="80"
                  alt="Google"
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

export default LoginDialog;
