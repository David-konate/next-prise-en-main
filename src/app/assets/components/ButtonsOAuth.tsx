import { signIn } from "../../lib/auth"

export const GoogleButton = () => {

    return (   
        <form
        action={async () => {
          await signIn("google")
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>

    )

}