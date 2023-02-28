export const fetchPartyDetail = async (partyId: string) => {
  const response = await fetch(`localhost:5001/parties/${partyId}`);
  if (response.status === 200) {
    return response.json();
  }
  else {
    throw new Error("Failed to fetch party detail");
  }
};

export const findParty = async (pin: string) => {
  const response = await fetch(`localhost:5001/parties/find/${pin}`);
  if (response.status === 200) {
    return response.json();
  }
  else {
    throw new Error("Failed to find a party");
  }
};

export const joinParty = async (partyId: string, name: string) => {
  const response = await fetch(`localhost:5001/parties/join`, {
    method: "POST",
    body: JSON.stringify({id: partyId, name: name}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (response.status === 201) {
    return response.json();
  }
  else {
    throw new Error("Failed to join the party");
  }
};