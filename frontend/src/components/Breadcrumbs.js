import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs({ slug }) {
	//kilde oppsett: https://www.makeuseof.com/create-breadcrumbs-in-reactjs/
	const location = useLocation();
	return (
		<nav>
			<Link to="/" className="breadcrumb-active">
				Home <i className="fa-solid fa-chevron-right"></i>
			</Link>
			<Link
				to="/shop"
				className={
					location.pathname.startsWith("/shop")
						? "breadcrumb-active"
						: "breadcrumb-not-active"
				}
			>
				Shop <i className="fa-solid fa-chevron-right"></i>
			</Link>
			<Link
				to="/my-games"
				className={
					location.pathname.startsWith("/my-games")
						? "breadcrumb-active"
						: "breadcrumb-not-active"
				}
			>
				My Games <i className="fa-solid fa-chevron-right"></i>
			</Link>
			<Link
				to="/favourites"
				className={
					location.pathname.startsWith("/favourites")
						? "breadcrumb-active"
						: "breadcrumb-not-active"
				}
			>
				Favourites
				<i className="fa-solid fa-chevron-right"></i>
			</Link>
			<Link
				to="/my-games/:slug"
				className={
					location.pathname === `/my-games/${slug}`
						? "breadcrumb-active"
						: "breadcrumb-not-active"
				}
			>
				{slug}
			</Link>
			<Link
				to="/shop/:slug"
				className={
					location.pathname === `/shop/${slug}`
						? "breadcrumb-active"
						: "breadcrumb-not-active"
				}
			>
				{slug}
			</Link>
		</nav>
	);
}
