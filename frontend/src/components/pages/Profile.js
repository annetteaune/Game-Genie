import { Link } from "react-router-dom";

export default function Profile({ user, login }) {

	if (login === true) {
		return (
			<section className="profile-page list-bckg">
				<div className="image-wrapper">
					{user.imageUrl == null ? (
						<img src="fav.png" alt="User avatar placeholder" />
					) : (
						<img src={user.imageUrl} alt="User avatar" />
					)}
				</div>
				<h2>Welcome, {user.username}!</h2>
				<span>{user.useremail}</span>
			</section>
		);
	} else {
		return (
			<section className="profile-page">
				<h2>You must be logged in to see your profile</h2>
				<Link to="/login">
					<button className="login-btn">Log in</button>
				</Link>
			</section>
		);
	}
}
