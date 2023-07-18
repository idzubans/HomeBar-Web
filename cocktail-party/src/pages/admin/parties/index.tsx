import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { SyncLoader } from "react-spinners";
import { Button } from "~/components/shared/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
      <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-t from-indigo-100">
        <SyncLoader color={"#4338ca"} size={20} aria-label="Loading Spinner" />
      </div>
    );
  }
  if (status === "authenticated") {
    return (
      <div className="p-8">
        <h1 className="pb-2 text-center text-2xl font-semibold text-purple-950">
          Your parties
        </h1>
        <div className="flex flex-col gap-4">
          {parties?.map((party) => (
            <Link key={party.id} href={`parties/${party.id}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{party.name}</CardTitle>
                  <CardDescription>{party.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  {" "}
                  Active until: {party.endDate.toLocaleDateString()},{" "}
                  {party.endDate.toLocaleTimeString()}
                </CardContent>
                {/* <CardHeader>
                  {party.name}
                </CardHeader>
                <CardTitle>
                  Active until: {party.endDate.toLocaleDateString()},{" "}
                  {party.endDate.toLocaleTimeString()}
                </CardTitle>
                <CardContent>Party ID: {party.id}</CardContent> */}
              </Card>
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
