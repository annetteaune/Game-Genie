import { Link } from "react-router-dom";

export default function GameCard({
	title,
	image,
	slug,
	id,
	setSelectedId,
	genres,
}) {
	const saveGameId = (id) => {
		setSelectedId(id);
	};

	/* filter for å bestemme om det er shop- eller mygame-kort som returneres.
		API-et returnerer en array for sjangere, mens sanity returnerer et objekt, så jeg bruker
		disse for å differensiere mellom dem. Kunne brukt state her isteden.
		Kilder:
		https://www.w3schools.com/jsref/jsref_isarray.asp
		https://www.w3schools.com/js/js_typeof.asp 
	*/
	if (Array.isArray(genres)) {
		return (
			<article className="game-card">
				<Link to={`/shop/${slug}`} id={id} onClick={() => saveGameId(id)}>
					{image !== null ? (
						<img src={image} alt={title} />
					) : (
						<img src="/placeholder.png" alt="pleaceholder" />
					)}
					<div className="card-genre">
						{genres.map((gen) => (
							<span key={gen.id}>{gen.name}</span>
						))}
					</div>
					<h3 className="card-title">{title}</h3>
					<span className="card-view">View</span>
				</Link>
			</article>
		);
	} else if (typeof genres === "object" && genres !== null) {
		return (
			<article className="game-card">
				<Link
					to={`/my-games/${slug.current}`}
					id={id}
					onClick={() => saveGameId(id)}
				>
					{image !== null ? (
						<img src={image} alt={title} />
					) : (
						<img src="/placeholder.png" alt="pleaceholder" />
					)}
					<div className="card-genre">
						<span key={genres.id}>{genres.title}</span>
					</div>
					<h3 className="card-title">{title}</h3>
					<span className="card-view">View</span>
				</Link>
			</article>
		);
	}
}
