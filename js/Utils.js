const apiCall = (userName) => {
	showLoading(true);
	fetch(`https://api.github.com/users/${userName}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.message === "Not Found") {
				showLoading(false);
				showError();
				return false;
			}

			showProfile(data);
			fetch(`https://api.github.com/users/${userName}/repos?sort=created`)
				.then((response) => response.json())
				.then((repos) => showRepos(repos))
				.catch((error) => console.log(error));
			showLoading(false);
		})
		.catch((error) => console.log(error));
};

const showProfile = (APIdata) => {
	const username = APIdata.login;
	const fullName = APIdata.name;
	const bio = APIdata.bio;
	const avatar = APIdata.avatar_url;
	const containerData = document.getElementById("container-data");

	const templateUser = `
                    <div class="container-data__info">
                        <img class="container-data__img" src="${avatar}" alt="">
                        <div class="container-data__containerInfoUser">
                            <span class="container-data__username">@${username}</span>
                            <h2 class="container-data__fullname">${fullName}</h2>
                            <span class="container-data__bio">${bio}</span>
                        </div>
                    </div>`;

	containerData.insertAdjacentHTML("afterbegin", templateUser);
};

const showRepos = (APIdata) => {
    const containerRepositories = document.getElementById("container-data");
	let templateReposHeader = `<div id="container-data__repositories" class="container-data__repositories">
                        <h4 class="container-data__title">Repositories</h4>`;

	containerRepositories.innerHTML += templateReposHeader;

	for (const repo in APIdata) {
		let templateRepos = `
                    <div class="container-data__fetch">
                        <span class="container-data__repoTitle">${APIdata[repo].name}</span>
                        <div class="container-data__counters">
                            <span><i class="fas fa-star container-data__repoIcon"></i>${APIdata[repo].stargazers_count}</span>
                            <span><i class="fas fa-code-branch container-data__repoIcon"></i>${APIdata[repo].forks_count}</span>
                        </div>
                    </div>
                </div>`;
		containerRepositories.innerHTML += templateRepos;
	}
};

const showLoading = (boolean) => {
	const loading = document.getElementById("container-form__loading");
	boolean
		? (loading.style.display = "block")
		: (loading.style.display = "none");
};

const showError = () => {
	const errorContent = `
        <div class="container-form__error">
            <p>Does not exist.</p>
        </div>`;

	form.insertAdjacentHTML("beforeend", errorContent);

	setTimeout(() => {
		form.removeChild(form.lastChild);
	}, 3000);
};

export {apiCall, showLoading, showProfile, showRepos, showError}