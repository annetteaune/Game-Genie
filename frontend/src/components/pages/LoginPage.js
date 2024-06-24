import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage({
	setLogin,
	login,
	users,
	getUsers,
	setUser,
}) {
	//state for feilmedling
	const [message, setMessage] = useState("");
	//lagre inputvalue for sjekk mot brukerarray
	const [inputValue, setInputValue] = useState("");
	//lagre inputvalue ved endring
	function handleInputChange(event) {
		setInputValue(event.target.value);
	}
	//refreshe users i tilfelle ny registering
	useEffect(() => {
		getUsers();
	}, [getUsers]);

	//sjekke om brukeren fins og handle deretter
	function handleSubmit(event) {
		event.preventDefault();
		const user = users.find((user) => user.useremail === inputValue);
		if (user) {
			setLogin(!login);
			setUser(user);
			setMessage("");
			let path = `/`;
			navigate(path);
		} else {
			setMessage("User not found");
		}
	}
	//for å redirecte til profilside ved login,
	//kilde: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
	let navigate = useNavigate();

	return (
		<article className="login-page list-bckg">
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Registered e-mail:</label>
				<input
					name="email"
					id="email"
					type="text"
					placeholder="annettla@hiof.no"
					value={inputValue}
					onChange={handleInputChange}
				></input>
				<button type="submit" onClick={handleSubmit} className="login-btn">
					Login
				</button>
			</form>
			<p>{message}</p>
			<p>
				Not registered? Register <Link to="/register">here!</Link>
			</p>
		</article>
	);
}
