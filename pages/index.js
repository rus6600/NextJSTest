import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from "react";
import Header from "./Components/Header"
import FilmList from './Components/FilmList';

function Home(props) {
	const [base, setBase] = useState(props.data)
	const [query,setQuery] = useState('')
	return (	
			<div className="wrapper">
					<Header 
					props={props} 
					setQuery={setQuery}
					query={query}
					base={setBase}
					setBase={setBase}
					/>
					<div className="glass">
							<FilmList base={base}/>
					</div>
					<div className="circle"></div>
					<div className="circle"></div>
				</div>
)
}

export async function getStaticProps(context) {
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
