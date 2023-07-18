import { useRouter } from "next/router";
import { api } from "~/utils/api";

function PartyDetail({}) {
  const router = useRouter();
  const { id } = router.query;

  const { data } = api.parties.getById.useQuery({ id: id as string });

  if (data) {
    return (
      <div>
        <h1>Party {data.name}</h1>
        <p>Party ID: {data.id}</p>
        <p>
          Active until: {data.endDate.toLocaleDateString()},{" "}
          {data.endDate.toLocaleTimeString()}
        </p>
        {data.orders.map((order) => (
          <div key={order.id}>
            <h2>{order.drink.name}</h2>
            <p>{order.status}</p>
            <p>{order.createdAt.toDateString()}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default PartyDetail;
