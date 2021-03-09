import { useRouter } from "next/router";

function Home(props) {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push("/films");
  }
  return <div></div>;
}
export default Home;
