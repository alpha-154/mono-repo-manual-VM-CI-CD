import { client } from "@repo/db/client";

export default async function Home() {
  const user = await client.user.findFirst();

  return (
    <div>
      <h1>is my first ci/cd is working ?</h1>
      {user?.username}
      {user?.password}
      <br />
      <div>hi there</div>
    </div>
  );
}
