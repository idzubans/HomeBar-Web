import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "~/components/shared/Button";
import { SyncLoader } from "react-spinners";

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
      <div className="min-h-screen w-screen bg-gradient-to-t from-indigo-100 flex justify-center items-center">
        <SyncLoader
          color={"#4338ca"}
          size={20}
          aria-label="Loading Spinner"
        />
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
          <Link className="w-11/12" href="admin/parties">
            <div className="flex h-28 content-center items-center rounded-3xl bg-white bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-center shadow-xl">
              <h3 className="flex w-full justify-center text-4xl font-extrabold text-white">
                Parties
              </h3>
            </div>
          </Link>
          <Link className="w-11/12" href="admin/ingredients">
            <div className="flex h-28 content-center items-center rounded-3xl bg-white bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-center shadow-xl">
              <h3 className="flex w-full justify-center text-4xl font-extrabold text-white">
                Ingredients
              </h3>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Admin;
