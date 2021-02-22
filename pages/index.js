import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from "react";


function Home(props) {

    const [base, setBase] = useState(props.data)
    const [query,setQuery] = useState("")
    const [select, setSelect] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [modalInfo, setModalInfo] = useState(null)
    const  okHandler = async (e) => {
        setQuery(e)
        const res = await fetch(`http://localhost:4200/results?q=${query}`)
        const data = await res.json()
        setBase(data)
    }
    const selectHandler = e => {
        setSelect(e)
        console.log(select)
     
    }

    useEffect(() => {
        setBase(
            props.data.filter(el => el.genres.some(elem => elem === select))
        )
        console.log(base)

    },[select] )

    useEffect(() => {
        setBase(props.data)
    },[])

    function getGenres() {
        const genres = []
        props.data.map(el => {
            genres.push(...el.genres)
        })
        genres.sort()
        const arr = genres.filter((el,id) => el !== genres[id+1])
        return arr
    }







  return (
        <div className="wrapper">
            <div className="header">
                <input type="text" onChange={() => okHandler(event.target.value)}></input>
                <select onChange={() => selectHandler(event.target.value)}>
                    {getGenres().map((el,id) => <option id={id} value={el}>{el}</option>)}
                </select>
              
            </div>
            <div className="glass">   
                {base.map(item => {
                    return (
                        <div key={item.name} className="card-item">
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
                           </div>
            <div className="circle1"></div>
    <div className="circle2"></div>
         </div>


  )
}

export async function getStaticProps(context) {
    console.log(context)
    const res = await fetch(`http://localhost:4200/results`)
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {data}
    }
}


export default Home
