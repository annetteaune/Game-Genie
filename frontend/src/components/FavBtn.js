import { useCallback, useEffect, useState } from "react";
import { writeClient } from "../sanity/client";
import { fetchUserById } from "../sanity/userServices";

export default function FavBtn({ user, myGame, userId, login, setUser }) {
	//state for å sjekke om spillet er i favoritter
	const [isFaved, setIsFaved] = useState(false);
	//state for melding om favoritter
	const [message, setMessage] = useState("Click to toggle");

	//hente bruker for lagring på riktig sted
	const getUserById = useCallback(async () => {
		const userData = await fetchUserById(userId);
		setUser(userData);
	}, [userId, setUser]);

	useEffect(() => {
		getUserById();
	}, [getUserById]);

	//oppdatere sanity og legge til favoritt ved klikk, om man er logget inn
	//kilde: https://webtricks.blog/oppdatere-et-array-felt-i-en-innholdstype-i-sanity-fra-et-react-grensesnitt/
	//kilde: https://github.com/toremake/UIN2023_sanity_create/blob/main/frontend/src/components/Show.js
	const gameReference = {
		_type: "reference",
		_ref: myGame._id,
		_key: myGame.title,
	};

	function addFave(event) {
		event.preventDefault();
		if (login === true) {
			writeClient
				.patch(user._id)
				.setIfMissing({ favourites: [] })
				.append("favourites", [gameReference])
				.commit({ autoGenerateKeys: true })
				.then(
					() => getUserById(),
					setMessage(`${myGame.title} has been added to your favourites!`)
				)
				.catch((error) => {
					console.log(error.message);
				});
		} else {
			setMessage("You must be logged in to add favourites.");
		}
	}
	//fjerne favoritt
	function removeFave(event) {
		event.preventDefault();
		if (login === true) {
			const updatedFavourites = user.favourites.filter(
				(fav) => fav._ref !== myGame._id
			);
			writeClient
				.patch(user._id)
				.set({ favourites: updatedFavourites })
				.commit({ autoGenerateKeys: true })
				.then(
					() => getUserById(),
					setMessage(`${myGame.title} has been removed from your favourites!`)
				)
				.catch((error) => {
					console.log(error.message);
				});
		}
	}
	//sette state som faved om spillet fins i favoritt-listen
	useEffect(() => {
		if (user.favourites && myGame._id) {
			const gameFaved = user.favourites.find((fav) => fav._ref === myGame._id);
			if (gameFaved) {
				setIsFaved(true);
			} else {
				setIsFaved(false);
			}
		}
	}, [user, myGame]);

	return (
		<section className="fav-button-area">
			{isFaved === true ? (
				<button className="heart-btn" onClick={removeFave}>
					<img src="/fav.png" alt="red heart icon" />
				</button>
			) : (
				<button className="heart-btn" onClick={addFave}>
					<img src="/nofav.png" alt="empty heart icon" />
				</button>
			)}
			<span className="fav-msg">{message}</span>
		</section>
	);
}
