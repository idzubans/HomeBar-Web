import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/shared/Button";
import { SyncLoader } from "react-spinners";
import { NavigationBox } from "~/components/shared/NavigationBox";
import { Heading } from "~/components/shared/Heading";

function Admin() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <Button isPrimary onClick={() => signIn()}>
        Sign in
      </Button>
    );
  }
  if (status === "loading") {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-t from-indigo-100">
        <SyncLoader color={"#4338ca"} size={20} aria-label="Loading Spinner" />
      </div>
    );
  }
  if (status === "authenticated") {
    return (
      <div>
        <div className="m-auto flex min-h-screen flex-col items-center justify-center gap-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 to-gray-300 pt-8">
          <Button isPrimary onClick={() => signOut()}>
            Sign out
          </Button>
          <NavigationBox reversed link="admin/bars">
            <Heading isWhite>Bars</Heading>
          </NavigationBox>

          <NavigationBox reversed link="admin/ingredients">
            <Heading isWhite>Ingredients</Heading>
          </NavigationBox>
        </div>
      </div>
    );
  }
}

export default Admin;
