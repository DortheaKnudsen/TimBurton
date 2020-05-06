//Insaet slut del af URl foer ? tegn via Id From Url

let Youtube = {
    getIdFromUrl: function (videoIdorUrl) {
        if (videoIdorUrl.indexOf('http') == 0) {
            return videoIdorUrl.split('v=')[1];
        } else {
            return videoIdorUrl;
        }
    },

    generateEmbedUrl: function (videoIdorUrl) {
        return 'https://www.youtube.com/embed/' + Youtube.getIdFromUrl(videoIdorUrl);
    }
};


let movies =
    [
        {

            "Title": "The Nightmare Before Christmas",
            "YoutubeID": "jv8lGa_ZXao"
        },
        {
            "Title": "Corpse Bride",
            "YoutubeID": "AGACeWVdFqo"
        },
        {
            "Title": "Charlie And The Chocolate Factory",
            "YoutubeID": "OFVGCUIXJls"
        },
        {
            "Title": "Mars Attacks!",
            "YoutubeID": "DqtjHWlM4lQ"

        },
        {
            "Title": "Alice In Wonderland",
            "YoutubeID": "9POCgSRVvf0&t=4s"
        },
        {
            "Title": "Sleepy Hollow",
            "YoutubeID": "6RsKwn_Je1k"
        }
    ];

const app = document.getElementById('film');


//container element

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

movies.forEach(movie => {


    let url = 'http://www.omdbapi.com/?t=' + movie.Title + '&apikey=50f7f345';

    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';


    fetch(proxyUrl + url)



        .then(response => {
            return response.json();
        })
        .then(data => {

            console.log('data', +data);

            const card = document.createElement('div');
            card.setAttribute('class', 'box')

            const h2 = document.createElement('h2');
            h2.setAttribute('class', 'movieTitle')
            h2.textContent = movie.Title;

            const youtube = document.createElement('iframe');
            youtube.setAttribute('src', Youtube.generateEmbedUrl(movie.YoutubeID));


            const p = document.createElement('p');
            p.setAttribute('class', 'moviePlot')
            p.textContent = data.Plot;

            const rateM = document.createElement('p');
            rateM.setAttribute('class', 'meta')
            rateM.textContent = 'METASCORE: ' + data.Metascore;

            const rateImb = document.createElement('p');
            rateImb.setAttribute('class', 'Imb')
            rateImb.textContent = 'IMDB-Rating: ' + data.imdbRating;

            const age = document.createElement('p');
            let date = new Date();
            let year = date.getFullYear();
            let HowOld = year - data.Year;
            age.textContent = 'AGE: ' + HowOld + ' years';


            card.appendChild(h2);

            card.appendChild(youtube);

            card.appendChild(p);

            card.appendChild(rateImb);

            card.appendChild(age);

            card.appendChild(rateM);


            container.appendChild(card);

        })
        .catch(err => {


                const errorMessage = document.createElement('mistake');
                errorMessage.textContent = `Error from JS`;
                app.appendChild(errorMessage);
            }

        )
});

