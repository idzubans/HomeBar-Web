import { useRouter } from "next/router";

function PartyDetail() {
  const router = useRouter();
  const { id } = router.query;
  return ( 
    <div>
      <h1>Party {id}</h1>
    </div>
   );
}

export default PartyDetail;