import { getCookie } from "cookies-next";
import { AnimatePresence, motion } from "framer-motion";
import { GetServerSideProps } from "next";
import router from "next/router";
import { useState } from "react";
import FindParty from "~/components/FindParty/FindParty";
import JoinPartyForm from "~/components/JoinPartyForm";
import { Heading } from "~/components/shared/Heading";
import { NavigationBox } from "~/components/shared/NavigationBox";
import { Party } from "~/model";
import { prisma } from "~/server/db";
import { getPartyById } from "~/server/domain/party";

interface Props {
  party?: Party;
}

export default function Landing({ party }: Props) {
  const onPartyFound = (partyData: Party) => {
    setParty(partyData);
  };

  const onPartyJoined = () => {
    router.push(`/party/${partyFound?.id}`);
  };

  const [partyFound, setParty] = useState<Party | undefined>(undefined);

  return (
    <div className="m-auto flex min-h-screen flex-col items-center justify-center gap-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 to-gray-300 pt-8">
      {party ? (
        <NavigationBox link={`/party/${party.id}`}>
          <Heading>{party.name}</Heading>
        </NavigationBox>
      ) : (
        <NavigationBox>
          <AnimatePresence mode="wait" initial={false}>
            {partyFound ? (
              <motion.div
                className="flex flex-col items-center justify-center gap-4"
                key={partyFound.id}
                transition={{ duration: 0.4 }}
                initial={{ x: 200 }}
                animate={{ x: 0 }}
                exit={{ x: -400 }}
              >
                <Heading>Join a party</Heading>

                <JoinPartyForm
                  partyJoined={onPartyJoined}
                  partyModel={partyFound}
                />
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center gap-4"
                key="find-party"
                transition={{ duration: 0.4 }}
                initial={{ x: 200 }}
                animate={{ x: 0 }}
                exit={{ x: -400 }}
              >
                <Heading>Find a party</Heading>
                <FindParty onPartyFound={onPartyFound} />
              </motion.div>
            )}
          </AnimatePresence>
        </NavigationBox>
      )}
      <NavigationBox>
        <Heading>Browse drinks</Heading>
      </NavigationBox>
      <NavigationBox link="admin" reversed>
        <Heading isWhite>Bartender portal</Heading>
      </NavigationBox>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const partyId = getCookie("partyId", { req, res });
  if (partyId) {
    const party = await getPartyById(prisma, partyId.toString());
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
