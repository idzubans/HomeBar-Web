import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/shared/Button";

function Admin() {
  const { data: session, status } = useSession();

  if(status === "unauthenticated"){
    return <Button isPrimary onClick={() => signIn()}>Sign in</Button>;
  }
  if(status === "loading"){
    return <div>LOADING ANIMATION</div>
  }
  if(status === "authenticated"){
    return (<div>
      <Button isPrimary onClick={() => signOut()}>Sign out</Button>
      <div>MENU for {session.user.name}</div>
    </div>)
  }
}

export default Admin;
