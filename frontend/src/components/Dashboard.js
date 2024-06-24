import GameShop from "./GameShop";
import MyGames from "./MyGames";
import MyFavourites from "./MyFavourites";
import { useEffect } from "react";

export default function Dashboard({
	shopGames,
	setSelectedId,
	myGamesArray,
	getGamesForShop,
	getMyGames,
	user,
	login,
	favourites,
	setFavourites,
}) {
	useEffect(() => {
		getGamesForShop();
	}, [getGamesForShop]);
	useEffect(() => {
		getMyGames();
	}, [getMyGames]);

	return (
		<div className="grid-container">
			<div className="dash-container">
				<GameShop shopGames={shopGames} setSelectedId={setSelectedId} />
				<MyGames setSelectedId={setSelectedId} myGamesArray={myGamesArray} />
			</div>
			<MyFavourites
				user={user}
				login={login}
				setSelectedId={setSelectedId}
				setFavourites={setFavourites}
				favourites={favourites}
				myGamesArray={myGamesArray}
			/>
		</div>
	);
}
