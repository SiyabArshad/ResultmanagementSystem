import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/main.css";

export default function HomeScreen() {
    const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<h3>Student Result Managment system</h3>
			<nav ref={navRef}>
				<Link to="/">Home</Link>
				<Link to="/Students">Students</Link>
				<Link to="/Results">Results</Link>
				<Link to="/Courses">Courses</Link>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}
