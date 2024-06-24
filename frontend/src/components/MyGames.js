import { Link } from "react-router-dom";
import GameCard from "./GameCard";

export default function MyGames({ setSelectedId, myGamesArray }) {
	//ny games-array for å kun hente ut tre stk
	//kilde: https://www.w3schools.com/jsref/jsref_slice_array.asp
	const dashGames = myGamesArray.slice(0, 3);

	return (
		<section className="my-games list-bckg">
			<div className="header-title">
				<h2>My Games</h2>
				<Link to="/my-games">
					See all {myGamesArray.length} games{" "}
					<i className="fa-solid fa-chevron-right"></i>
				</Link>
			</div>
			{dashGames.map((game, index) => (
				<GameCard
					key={index}
					title={game.title}
					image={game.imageUrl}
					slug={game.slug}
					id={game.apiid}
					setSelectedId={setSelectedId}
					genres={game.genre}
				/>
			))}
		</section>
	);
}
