import SearchCards from "./SearchCards";
import { useRef } from "react";

export default function SearchResults({
	searchResult,
	setSelectedId,
	toggleDropdown,
	setOpenDropDown,
	openDropdown,
}) {
	//lukke dropdown ved klikk utenfor komponentet
	//Kilde: https://stackoverflow.com/questions/63359138/react-closing-a-dropdown-when-click-outside
	const openSearch = useRef(null);

	const closeDropdown = (event) => {
		if (
			openSearch.current &&
			openDropdown &&
			!openSearch.current.contains(event.target)
		) {
			setOpenDropDown(true);
		}
	};
	document.addEventListener("mousedown", closeDropdown);

	if (searchResult?.length >= 3) {
		return (
			<section className="search-results" ref={openSearch}>
				{searchResult?.map((res, index) => (
					<SearchCards
						key={index}
						title={res.name}
						image={res.background_image}
						slug={res.slug}
						id={res.id}
						setSelectedId={setSelectedId}
						toggleDropdown={toggleDropdown}
					/>
				))}
				<i className="fa-solid fa-angles-up" onClick={toggleDropdown}></i>
			</section>
		);
	}
}
