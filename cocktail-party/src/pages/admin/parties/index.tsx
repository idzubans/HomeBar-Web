import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { SyncLoader } from "react-spinners";
import { Button } from "~/components/shared/Button";
import { api } from "~/utils/api";

function Parties() {
  const { status } = useSession();
  const { data: parties, isLoading } = api.parties.getAllByBartender.useQuery();

  if (status === "unauthenticated") {
    return (
      <Button isPrimary onClick={() => signIn()}>
        Sign in
      </Button>
    );
  }
  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-t from-indigo-100 flex items-center justify-center">
        <SyncLoader color={"#4338ca"} size={20} aria-label="Loading Spinner" />
      </div>
    );
  }
  if (status === "authenticated") {
    return (
      <div className="p-8">
        <h1>Parties</h1>
        <div>
          {parties?.map((party) => (
            <Link key={party.id} href={`parties/${party.id}`}>
              <div className="my-4 flex flex-col gap-2 rounded-lg border-2 border-purple-300 p-4 shadow-lg">
                <h2>{party.name}</h2>
                <p>{party.endDate.toString()}</p>
                <p>{party.id}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="parties/create">
          <Button isPrimary>Create a party</Button>
        </Link>
      </div>
    );
  }
}

export default Parties;
