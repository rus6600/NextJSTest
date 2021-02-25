export default function FilmList(props) {
    return (
        <>
            {props.base.map(item => {
        return (
            <div key={item.id} className="card-item">
                <img src={item.img}/>
                <div className="card-info">
                    <h1>{item.name}</h1>
                    <p>{item.length}</p>
                    <p>{item.rate}</p>
                    <p>{item.genres.join(" ")}</p>
                    <p>{item.description}</p>
                </div>
            </div>
        )
    })}
        </>
    )
}