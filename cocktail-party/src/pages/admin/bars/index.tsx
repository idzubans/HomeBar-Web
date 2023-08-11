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

function Bars() {
  const { status } = useSession();
  const { data: bars, isLoading } = api.bars.getAllByBartender.useQuery();

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
          Your Bars
        </h1>
        <div className="flex flex-col gap-4">
          {bars?.map((bar) => (
            <Link key={bar.id} href={`bars/${bar.id}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{bar.name}</CardTitle>
                  <CardDescription>{bar.id}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
        <Link href="bars/create">
          <Button isPrimary>Create a bar</Button>
        </Link>
      </div>
    );
  }
}

export default Bars;
