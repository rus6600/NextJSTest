function Header(props) {
  const searchHandler = async (e) => {
    props.setQuery(e);
    const res = await fetch(`http://localhost:4200/results?q=${props.query}`);
    const data = await res.json();
    if (data.length) {
      props.setQuery(e.replace(/\s/g, ""));
    }
    props.setBase(data);
  };

  const selectHandler = (e) => {
    props.setBase(
      props.props.data.filter((el) => el.genres.some((elem) => elem === e))
    );
  };

  function getGenres() {
    return props.props.data.reduce((acc, val) => {
      acc.push(...val.genres);
      return Array.from(new Set(acc.sort()));
    }, []);
  }

  return (
    <div className="header">
      <input
        type="text"
        onChange={() => searchHandler(event.target.value)}
      ></input>
      <select className="decorated" onChange={() => selectHandler(event.target.value)}>
        {getGenres().map((el, index, arr) => (
          <option key={`genre_${index}`} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Header;
