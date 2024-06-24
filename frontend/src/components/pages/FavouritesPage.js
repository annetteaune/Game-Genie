import { Link } from "react-router-dom";
import GameCard from "../GameCard";
import Breadcrumbs from "../Breadcrumbs";

export default function FavouritesPage({ setSelectedId, login, favourites }) {
	if (login === true) {
		return (
			<>
				<Breadcrumbs />
				<h1 className="page-title">Favourites</h1>
				<section className="games-list">
					{favourites.map((game, index) => (
						<GameCard
							key={index}
							title={game.title}
							image={game.imageUrl}
							slug={game.slug}
							id={game.apiid}
							setSelectedId={setSelectedId}
							genres={game.genre}
							_id={game._id}
						/>
					))}
				</section>
			</>
		);
	} else {
		return (
			<article className="mustlogin page-title ">
				<h1 className="page-title">Favourites</h1>
				<p>You must be logged in to see your favourites.</p>
				<Link to="/login">
					<button className="login-btn">To Login</button>
				</Link>
			</article>
		);
	}
}
