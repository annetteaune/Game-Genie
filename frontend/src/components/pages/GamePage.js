import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchSanityGame } from "../../sanity/gameServices";
import FavBtn from "../FavBtn";
import Breadcrumbs from "../Breadcrumbs";
import WordCloud from "../WordCloud";

export default function GamePage({
	getGame,
	selectedGame,
	setMyGame,
	myGame,
	user,
	login,
	setUser,
	userId,
	getShops,
	stores,
	storeNoURL,
}) {
	const { slug } = useParams();
	const location = useLocation();

	const [description, setDescription] = useState([])

	//hente enkelt spill fra sanity
	const getMyGame = useCallback(
		async (slug) => {
			const data = await fetchSanityGame(slug);
			setMyGame(data[0]);
		},
		[setMyGame]
	);

	//hente api-info, oppdatere om slug endrer seg ifht search
	useEffect(() => {
		getGame();
		getShops();
		////kilde split: https://stackoverflow.com/questions/21895233/how-to-split-string-with-newline-n-in-node
		setDescription(selectedGame?.description_raw?.split("\n"));
	}, [slug, getGame, getShops, selectedGame.description_raw]);
	//console.log("loopsjekk:",selectedGame)
	console.log(description)

	//hente sanity-info, men bare om man ikke befinner seg i /shop
	useEffect(() => {
		if (location.pathname.startsWith("/my-games")) {
			getMyGame(slug);
		}
	}, [slug, getMyGame, location.pathname]);

	/* Kombinere arrays med info om stores med og uten url, slik at de kan mappes gjennom  
		Kilde: https://stackoverflow.com/questions/46849286/merge-two-array-of-objects-based-on-a-key
		Resultatene i begge svar-arrayer returneres i APIet i samme rekkefølge hver gang, så velger 
		å benytte det øverste svaret i linken. 
		*/
	let completeStore = storeNoURL?.map((item, i) =>
		Object.assign({}, item, stores[i])
	);

	return (
		<>
			<Breadcrumbs slug={slug} />
			<article className="game-page">
				{login === true && location.pathname.startsWith("/my-games") ? (
					<FavBtn
						user={user}
						myGame={myGame}
						userId={userId}
						login={login}
						setUser={setUser}
					/>
				) : null}

				<h1 className="game-page-title">{selectedGame?.name}</h1>
				<section className="info-area list-bckg">
					{location.pathname.startsWith("/my-games") ? (
						<h2>
							Playtime: <span>{myGame?.hoursplayed} hours</span>
						</h2>
					) : null}

					<h2>
						Release date: <span>{selectedGame?.released}</span>
					</h2>
					<h2>
						Genres:
						{selectedGame.genres?.map((gen) => (
							<span key={gen.id}> {gen.name} </span>
						))}{" "}
					</h2>
					<h2>
						Rating: <span>{selectedGame?.metacritic}</span>
					</h2>
					<h2>
						Developers:
						{selectedGame.developers?.map((dev) => (
							<span key={dev.id}> {dev.name} </span>
						))}
					</h2>
					<h2>
						Published by:
						{selectedGame.publishers?.map((pub) => (
							<span key={pub.id}> {pub.name} </span>
						))}{" "}
					</h2>
				</section>
				<section className="wordcloud">
					<WordCloud tags={selectedGame?.tags} />
				</section>
				<section className="platform-area list-bckg">
					<div>
						<h3>Avaliable platforms:</h3>
						{selectedGame.platforms?.map((plat, index) => (
							<span key={index}>{plat.platform.name}</span>
						))}
					</div>
					<div>
						<h3>Avaliable to purchase from:</h3>
						{completeStore?.map((store) => (
							<a href={store.url} key={store.id} target="blank">
								{store.store.name}
							</a>
						))}
					</div>
				</section>
				{selectedGame.background_image !== null ? (
					<section className="img-area">
						<img src={selectedGame?.background_image} alt={selectedGame.name} />
						<img
							src={selectedGame?.background_image_additional}
							alt={selectedGame?.name}
						/>
					</section>
				) : null}

				<section className="plot-area list-bckg">
					{description?.map((desc, i) => (
						<p key={i}>{desc}</p>
					))}
				</section>
			</article>
		</>
	);
}
