import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import FindParty from "~/components/FindParty/FindParty";
import { Party } from "~/model";
import { getPartyById } from "~/server/domain/party";

interface Props {
  party?: Party;
}

export default function Landing({ party }: Props) {
  return (
    <div className="m-auto flex h-screen flex-col items-center justify-center gap-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 to-gray-300 pt-8">
      {party ? (
        <Link className="w-11/12" href={`/party/${party.id}`}>
          <div className="flex w-full items-center justify-center rounded-3xl bg-white p-6 text-center drop-shadow-md">
            <h3 className="flex w-full justify-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-4xl font-extrabold text-transparent">
              {party.name}
            </h3>
          </div>
        </Link>
      ) : (
        <div className="flex w-11/12 items-center justify-center rounded-3xl bg-white p-6 text-center drop-shadow-md">
          <div className="flex w-4/5 flex-col items-center justify-center gap-4">
            <h3 className="flex w-full justify-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-4xl font-extrabold text-transparent">
              Join a party
            </h3>
            <FindParty />
          </div>
        </div>
      )}
      <div className="flex h-28 w-11/12 content-center items-center rounded-3xl bg-white text-center shadow-xl">
        <h3 className="flex w-full justify-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-4xl font-extrabold text-transparent">
          Browse drinks
        </h3>
      </div>
      <Link className="w-11/12" href="admin">
        <div className="flex h-28 content-center items-center rounded-3xl bg-white bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-center shadow-xl">
          <h3 className="flex w-full justify-center text-4xl font-extrabold text-white">
            Bartender portal
          </h3>
        </div>
      </Link>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const partyId = getCookie("partyId", { req, res });
  if (partyId) {
    const party = await getPartyById(partyId.toString());
    if (party) {
      return {
        props: {
          party: JSON.parse(JSON.stringify(party)),
        },
      };
    }
  }
  return {
    props: {},
  };
};
