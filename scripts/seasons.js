

//Grab the selected show season that was passed from the form in show-info-page
const urlParams = new URLSearchParams(window.location.search);
const selectedSeason = urlParams.get('selected-season');
const showId = urlParams.get('showId');


//Fetch the specific season
fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
.then( result => result.json())
.then( episodes => {
    console.log(episodes);
    const filteredEpisodes = episodes.filter(episode => episode.season === parseInt(selectedSeason));

    //Display the episode number and the summary
    const episodeList = document.querySelector('.episode-list');
    for(let i = 0; i < filteredEpisodes.length; i++){
        const newLi= document.createElement('li');
        const newH3 = document.createElement('h3');
        const newDiv = document.createElement('div');

        newH3.setAttribute('class', 'episode-header');
        newLi.setAttribute('class', 'episode');

        newH3.innerText = "Episode " + (i + 1) + ": " + filteredEpisodes[i].name;
        newDiv.innerHTML = filteredEpisodes[i].summary;

        episodeList.appendChild(newH3);
        episodeList.appendChild(newDiv);




    }
})
.catch( error => console.error(error));