console.info("TV Search script now logging...")

const searchForm = document.querySelector('#searchForm');

searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchCrit = searchForm.elements.query.value;
    if (!searchCrit) {
        console.error("invalid search input", searchCrit);
        alert("You MUST enter a search string!")
    } else {
        console.log(searchCrit);
        const config = { params: { q: searchCrit } }
        const res = await axios.get('http://api.tvmaze.com/search/shows', config);
        displayResults(res.data);
        searchForm.elements.query.value = '';
    }
})

const displayResults = (shows) => {
    for (result of shows) {
        if (result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
}