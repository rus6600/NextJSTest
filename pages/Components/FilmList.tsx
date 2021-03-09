import Link from "next/link";

export default function FilmList(props) {
  return props.base.map((item, id) => {
    return (
      <Link
        key={id}
        href={{
          pathname: `/films/${item.id}`,
          query: `${item.name.replace(/\W/g, "_")}`,
        }}
      >
        <div key={item.id} className="card-item">
          <img src={item.img} alt="" />
          <div className="card-info">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        </div>
      </Link>
    );
  });
}
