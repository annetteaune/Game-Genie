import { Link } from "react-router-dom";
import FaveCards from "./FaveCards";
import { useEffect } from "react";

export default function MyFavourites({
	user,
	login,
	setSelectedId,
	setFavourites,
	favourites,
	myGamesArray,
}) {
	/*Ettersom favoritt-listen kun er referanser til de faktiske spillene, bruker jeg .find for å 
	"slå de sammen" med arrayen med de komplette objektene basert på id, slik at de blir brukbare objekter. 
	Putter det hele i en useEffect, da jeg kun vil at dette skal skje når visse ting oppdateres, og kun når
	en bruker er logget inn. */
	useEffect(() => {
		if (login === true && user.favourites != null) {
			const favGames = user.favourites.map((obj) => {
				const refId = obj._ref;
				const matchingObj = myGamesArray.find((o) => o._id === refId);
				return matchingObj;
			});
			setFavourites(favGames);
		}
	}, [login, myGamesArray, setFavourites, user.favourites]);

	if (login === true) {
		return (
			<section className="favourites list-bckg">
				<div className="header-title">
					<h2>
						My <img src="/fav.png" alt="red heart icon" /> Favourites
					</h2>
					{favourites?.length < 1 ? (
						<Link to="/favourites">Add some favourites! </Link>
					) : (
						<Link to="/favourites">
							See all {favourites.length} games{" "}
							<i className="fa-solid fa-chevron-right"></i>
						</Link>
					)}
				</div>
				{favourites?.map((game, index) => (
					<FaveCards
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
		);
	} else {
		return (
			<section className="favourites list-bckg">
				<div className="header-title">
					<h2>My Favourites</h2>
				</div>
				<span className="login-msg">Log in to see your favourites</span>
			</section>
		);
	}
}
