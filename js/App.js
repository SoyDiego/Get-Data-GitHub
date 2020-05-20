import "../sass/styles.scss";
import "../sass/responsive.scss";
import { apiCall } from "./Utils.js";

const form = document.getElementById("form");

const getUser = (e) => {
	const containerRepositories = document.getElementById("container-data");
	const inputUsername = document.getElementById("inputUsername").value;

	e.preventDefault();
	apiCall(inputUsername);

	form.reset();
	containerRepositories.innerText = "";
};

document.addEventListener("DOMContentLoaded", () => {
	form.addEventListener("submit", getUser);
});