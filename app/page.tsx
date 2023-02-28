"use client";

import { fetchPartyDetail } from "@/api/party";
import { Party } from "@/model/party";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";

export default function Home() {
  const [party, setParty] = useState<Party>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getPartyDetail = async (partyId: string) => {
      const partyDetail = fetchPartyDetail(partyId);
      setParty(await partyDetail);
      setLoaded(true);
    };

    const partyId = getCookie("partyId");
    if (partyId) {
      getPartyDetail(partyId.toString());
    } else {
      setLoaded(true);
    }
  }, []);

  const element = party ? party.name : "No party";

  return <div className="container mx-auto flex justify-center">{loaded ? element : "Loading"}
    <Button isPrimary={true}>Tlacitko</Button>
    <Input name={"test Input"} label={"test"} placeHolder={"input"}></Input>
  </div>;
}
