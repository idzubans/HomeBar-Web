import { useSession } from "next-auth/react";
import { Party } from "~/model";
import useSWR from "swr";
import Link from "next/link";
import { Button } from "~/components/shared/Button";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

function Parties() {
  const { data: session, status } = useSession();

  const { data: parties, isLoading } = useSWR<Party[]>(
    () => session && `/api/admin/parties?userId=${session?.user.id}`,
    fetcher
  );

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="p-8">
      <h1>Parties</h1>
      <div>
        {parties?.map((party) => (
          <Link
            key={party.id}
            href={`parties/${party.id}`}
          >
            <div className="flex flex-col gap-2 my-4 p-4 shadow-lg rounded-lg border-2 border-purple-300">
              <h2>{party.name}</h2>
              <p>{party.endDate.toString()}</p>
              <p>{party.id}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link href="parties/create" >
        <Button isPrimary>Create a party</Button>
      </Link>

    </div>
  );
}

export default Parties;
