import { Link } from "react-router-dom";

export default function SearchCards({
	title,
	image,
	setSelectedId,
	slug,
	id,
	toggleDropdown,
}) {
	const saveGameId = (id) => {
		setSelectedId(id);
		toggleDropdown();
	};

	return (
		<Link to={`/shop/${slug}`} id={id} onClick={() => saveGameId(id)}>
			<article className="search-card">
				{image !== null ? (
					<img src={image} alt={title} />
				) : (
					<img src="/placeholder.png" alt="pleaceholder" />
				)}
				<h3>{title}</h3>
				<i className="fa-solid fa-chevron-right"></i>
			</article>
		</Link>
	);
}
