import { useState } from "react";
import { writeClient } from "../../sanity/client";
import { Link } from "react-router-dom";

export default function Register({ getUsers, users }) {
	//state for å lagre brukernavn
	const [username, setUsername] = useState("");
	//state for å lagre epost
	const [useremail, setUseremail] = useState("");
	//state for å sette melding om opprettet bruker
	const [created, setCreated] = useState(false);

	//skrive til sanity
	//kilde oppsett:
	//https://github.com/toremake/UIN2023_sanity_create/blob/main/frontend/src/components/AddShow.js

	function saveUser(event) {
		event.preventDefault();

		//sjekke om eposten allerede er registret
		const userExists = users.find((users) => users.useremail === useremail);
		if (userExists) {
			alert("A user with this email already exists!");
			return;
		}

		// sjekke om epost er valid
		//kilde regex: https://www.w3resource.com/javascript/form/email-validation.php
		const isValid = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(useremail);
		if (!isValid) {
			alert("Please enter a valid email address!");
			return;
		}
		console.log(username, useremail);
		writeClient.create({
			_type: "user",
			username: username,
			useremail: useremail,
		});
		setCreated(true);
		getUsers();
	}
	if (created === false) {
		return (
			<section className="login-page list-bckg">
				<h2 className="page-title">Create an account:</h2>
				<form>
					<label htmlFor="username">Your name:</label>
					<input
						name="username"
						id="username"
						type="text"
						placeholder="Your Name"
						onChange={(event) => {
							setUsername(event.target.value);
						}}
						value={username}
					></input>
					<label htmlFor="email">Your email:</label>
					<input
						name="email"
						id="email"
						type="text"
						placeholder="your@email.com"
						onChange={(event) => {
							setUseremail(event.target.value);
						}}
						value={useremail}
					></input>

					<button type="submit" onClick={saveUser} className="login-btn">
						Create User
					</button>
				</form>
			</section>
		);
	} else {
		return (
			<section className="login-page list-bckg">
				<h2 className="page-title">Your user account has been created!</h2>
				<Link to="/login">
					<button className="login-btn">Log in</button>
				</Link>
			</section>
		);
	}
}
