import { useEffect, useState } from "react";
import GameCard from "../GameCard";
import Breadcrumbs from "../Breadcrumbs";

export default function ShopPage({ setSelectedId }) {
	//state for å lagre nye spill
	const [newGames, setNewGames] = useState([]);
	//hente spill til shop fra api
	const getNewGames = async () => {
		const response = await fetch(
			`https://api.rawg.io/api/games?key=58b2b216076c4896b0055f655cd83168&genres=83&ordering=-released&page=1&page_size=6`
		);

		const data = await response.json();
		setNewGames(data.results);
	};
	useEffect(() => {
		getNewGames();
	}, []);

	//state for å lagre populære spill
	const [trendingGames, setTrendingGames] = useState([]);
	//hente spill til shop fra api
	const getTrendingGames = async () => {
		const response = await fetch(
			`https://api.rawg.io/api/games?key=58b2b216076c4896b0055f655cd83168&dates=2023-01-01,2023-12-31&ordering=-added&stores=1&page=1&page_size=6`
		);

		const data = await response.json();
		setTrendingGames(data.results);
	};
	useEffect(() => {
		getTrendingGames();
	}, []);

	return (
		<>
			<Breadcrumbs />
			<h1 className="page-title">Shop</h1>
			<section className="games-list list-bckg">
				<h2 className="under-title">New & Upcoming Platformer Games</h2>
				{newGames.map((game, index) => (
					<GameCard
						key={index}
						title={game.name}
						image={game.background_image}
						slug={game.slug}
						id={game.id}
						setSelectedId={setSelectedId}
						genres={game.genres}
					/>
				))}
			</section>
			<section className="games-list list-bckg">
				<h2 className="under-title">Trending games</h2>
				{trendingGames.map((game, index) => (
					<GameCard
						key={index}
						title={game.name}
						image={game.background_image}
						slug={game.slug}
						id={game.id}
						setSelectedId={setSelectedId}
						genres={game.genres}
					/>
				))}
			</section>
		</>
	);
}
