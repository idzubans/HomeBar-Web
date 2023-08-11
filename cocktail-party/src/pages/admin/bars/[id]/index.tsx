import { useRouter } from "next/router";
import { Button } from "~/components/shared/Button";
import { api } from "~/utils/api";

function BarDetail({}) {
  const router = useRouter();
  const { id } = router.query;

  const { data } = api.bars.getById.useQuery({ id: id as string });

  if (data) {
    return (
      <div>
        <h1>Bar name: {data.name}</h1>
        <p>Bar ID: {data.id}</p>
        {data.order.map((order) => (
          <div key={order.id}>
            <h2>{order.drink.name}</h2>
            <p>{order.status}</p>
            <p>{order.createdAt.toDateString()}</p>
          </div>
        ))}
        <Button isPrimary onClick={() => router.push(router.asPath + "/ingredients")}>
          Manage ingredients
        </Button>
      </div>
    );
  }
}

export default BarDetail;
