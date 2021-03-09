import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import Header from "../Components/Header";
import FilmList from "../Components/FilmList";

function Films(props) {
  const [base, setBase] = useState(props.data);
  const [query, setQuery] = useState("");
  return (
    <div className="wrapper">
      <Head>
        <title>Welcome to Imdb-clone!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="This is a beta-database of the most popular released films "
        />
        <meta name="keywords" content={base.map((el) => el.name)} />
        <meta http-equiv="content-language" content="en-us" />
        <html lang="ru" />
      </Head>
      <Header
        props={props}
        setQuery={setQuery}
        query={query}
        base={setBase}
        setBase={setBase}
      />
      <div className="container">
        <FilmList base={base} />
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:4200/results`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

export default Films;
