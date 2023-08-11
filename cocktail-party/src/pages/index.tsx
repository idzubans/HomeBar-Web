import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import router from "next/router";
import { useState } from "react";
import FindBarForm from "~/components/FindBarForm/FindBarForm";
import JoinPartyForm from "~/components/JoinPartyForm";
import { Heading } from "~/components/shared/Heading";
import { NavigationBox } from "~/components/shared/NavigationBox";
import { Bar } from "~/model";
import { prisma } from "~/server/db";
import { getBarById } from "~/server/domain/bar";

interface Props {
  bar?: Bar;
}

export default function Landing({ bar }: Props) {
  return (
    <div className="m-auto flex min-h-screen flex-col items-center justify-center gap-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 to-gray-300 pt-8">
      {bar ? (
        <NavigationBox link={`/bar/${bar.id}`}>
          <Heading>{bar.name}</Heading>
        </NavigationBox>
      ) : (
        <NavigationBox>
          <div
            className="flex flex-col items-center justify-center gap-4">
            <Heading>Find a bar</Heading>
            <FindBarForm />
          </div>
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
  const barId = getCookie("barId", { req, res });
  if (barId) {
    const bar = await getBarById(prisma, barId.toString());
    if (bar) {
      return {
        props: {
          bar: JSON.parse(JSON.stringify(bar)),
        },
      };
    }
  }
  return {
    props: {},
  };
};
