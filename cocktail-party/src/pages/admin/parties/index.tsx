import Link from "next/link";
import { Button } from "~/components/shared/Button";
import { api } from "~/utils/api";

function Parties() {
  const { data: parties, isLoading } = api.parties.getAll.useQuery();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
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

export default Parties;
