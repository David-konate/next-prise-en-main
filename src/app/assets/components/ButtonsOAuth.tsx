import Image from "next/image";
import { signIn } from "../../lib/auth";

export const GoogleButton = () => {
  return (
    <form
      action={async () => {
        await signIn("google");
      }}
    >
      <button type="submit">
        {" "}
        <Image
          className="h-20"
          src="/hero.svg"
          width={100}
          height={100}
          alt="Hero"
        />
      </button>
    </form>
  );
};
