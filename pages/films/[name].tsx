import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

type pageProps = {
  film: ExampleObject;
  allfilms: ExampleObject;
};

interface ExampleObject {
  [key: string]: any;
}

function Page(props: pageProps) {
  console.log(props);
  const router = useRouter();
  const { film, allfilms } = props;
  const result = allfilms.reduce((acc: Object, el: any) => {
    let counter = 0;
    film.genres.forEach((element: string) => {
      el.genres.forEach((item: string) => {
        if (element === item && film.name !== el.name)
          acc[el.name] = null || { id: el.id, count: counter++ };
      });
    });
    return acc;
  }, {});
  const suggests = Object.entries(result)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  function Hours() {
    let hours = film.length.split(" ")[0][0];
    const text_forms = ["час", "часа", "часов"];
    hours = Math.abs(hours) % 100;
    let n1 = hours % 10;
    if (hours > 10 && hours < 20) {
      return `${hours} ${text_forms[2]}`;
    }
    if (n1 > 1 && n1 < 5) {
      return `${hours} ${text_forms[1]}`;
    }
    if (n1 == 1) {
      return `${hours} ${text_forms[0]}`;
    }
    return `${hours} ${text_forms[2]}`;
  }

  function Minutes() {
    const text_forms = ["минута", "минуты", "минут"];
    let minutes: any = film.length
      .split(" ")[1]
      .substring(0, film.length.split(" ")[1].length - 4);
    minutes = Math.abs(minutes) % 100;
    let n1 = minutes % 10;
    if (minutes > 10 && minutes < 20) {
      return `${minutes} ${text_forms[2]}`;
    }
    if (n1 > 1 && n1 < 5) {
      return `${minutes} ${text_forms[1]}`;
    }
    if (n1 == 1) {
      return `${minutes} ${text_forms[0]}`;
    }
    return `${minutes} ${text_forms[2]}`;
  }

  return (
    <div className="film-wrapper">
      <Head>
        <title>Смотреть информацию о фильме {film.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={film.description} />
        <meta name="keywords" content={film.genres.join(" ")} />
        <meta name="author" content="RK23"/>
      </Head>
      <img src={film.img}></img>
      <div className="film-info">
        <h1>Название : {film.name}</h1>
        <h2>Продолжительность : {`${Hours()} ${Minutes()}`}</h2>
        <h2>Рейтинг : {film.rate}</h2>
        <h2>Жанры : {film.genres.join(" ")}</h2>
        <ul>
          Похожие фильмы :
          {suggests.map((item, index) => {
            return (
              <Link
                key={index}
                href={{
                  pathname: `/films/${item[1].id}`,
                  query: `${item[0].replace(/\W/g, "_")}`,
                }}
              >
                <a>{item[0]}</a>
              </Link>
            );
          })}
        </ul>
        <button onClick={() => router.back()}>Back to previous Page</button>
        <Link href={"/films"}>
          <button>Main page</button>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:4200/results`);
  const films = await res.json();
  const paths = films.map((film) => ({
    params: { name: String(film.id) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:4200/results/${params.name}`);
  const film = await res.json();
  const res2 = await fetch(`http://localhost:4200/results/`);
  const allfilms = await res2.json();
  return { props: { film, allfilms } };
}

export default Page;
