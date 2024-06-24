import { useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import SearchResults from "./SearchResults";

export default function Navbar({
	login,
	searchResult,
	setSearchResult,
	setSelectedId,
}) {
	const [isActive, setIsActive] = useState(true);
	const [openDropdown, setOpenDropDown] = useState(false);
	function toggleMenu() {
		setIsActive((current) => !current);
	}
	function toggleDropdown() {
		setOpenDropDown((current) => !current);
	}

	return (
		<nav className="navbar">
			<div className="logo">
				<NavLink to="/">
					<img src="/logo.png" alt="game genie" />
				</NavLink>
			</div>
			<Search
				setSearchResult={setSearchResult}
				setOpenDropDown={setOpenDropDown}
			/>
			<div
				className={`search-dropdown ${openDropdown === true ? "hide" : "show"}`}
			>
				<SearchResults
					searchResult={searchResult.results}
					setSelectedId={setSelectedId}
					toggleDropdown={toggleDropdown}
					setOpenDropDown={setOpenDropDown}
					openDropdown={openDropdown}
				/>
			</div>
			<button className="nav-icon" onClick={toggleMenu}>
				{isActive === true ? (
					<i className="fa-solid fa-bars"></i>
				) : (
					<i className="fa-solid fa-x"></i>
				)}
			</button>
			<div className={`nav-links ${isActive === true ? "hide" : "show"}`}>
				<ul>
					<li>
						<NavLink to="/" onClick={toggleMenu}>
							Home
						</NavLink>
					</li>

					<li>
						<NavLink to="/shop" onClick={toggleMenu}>
							Shop
						</NavLink>
					</li>

					<li>
						{" "}
						<NavLink to="/my-games" onClick={toggleMenu}>
							My Games
						</NavLink>
					</li>

					<li>
						<NavLink to="/favourites" onClick={toggleMenu}>
							Favourites
						</NavLink>
					</li>

					{login === false ? (
						<li>
							<NavLink to="/login" onClick={toggleMenu}>
								Log in
							</NavLink>
						</li>
					) : (
						<li>
							<NavLink to="/profile" onClick={toggleMenu}>
								Account
							</NavLink>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
}
