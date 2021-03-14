// Using jQuery

// $('.search-button').on('click', ()=> {
//     $.ajax({
//         url: 'https://www.omdbapi.com/?apikey=415a8604&s=' + $('.input-keyword').val(),
//         success: results => {
//             $('.input-keyword').val('');
//             const movie = results.Search;
//             let cards = '';
//             movie.forEach(mv => {
//                 cards += tampilFilm(mv);
//             });
//             $('.movie-container').html(cards);
    
//             $('.modal-detail-button').on('click', function() {
//                 $.ajax({
//                     url: 'https://www.omdbapi.com/?apikey=415a8604&i=' + $(this).data('imdbid'),
//                     success: md => {
//                         const modal = tampilModal(md);
//                         $('.modal-body').html(modal);
//                     },
//                     error: e => {
//                         console.log(e.responseText);
//                     }
//                 })
//             })
//         },
//         error: e => {
//             console.log(e.responseText);
//         }
//     })
// })



// Using Fetch 

const btnTrigger = document.querySelector('.search-button');
btnTrigger.addEventListener('click', ()=> {

    const inputKeyword = document.querySelector('.input-keyword');
    fetch('https://www.omdbapi.com/?apikey=415a8604&s=' + inputKeyword.value)
        .then(response => response.json())
        .then(response => {

            const movies = response.Search;
            let card = '';
            movies.forEach( mv=> card += tampilFilm(mv) );
            const movieContainer = document.querySelector('.movie-container')
            movieContainer.innerHTML = card;

            const mdButton = document.querySelectorAll('.modal-detail-button');
            mdButton.forEach(btn=> {
                btn.addEventListener('click', function() {
                    fetch('https://www.omdbapi.com/?apikey=415a8604&i=' + this.dataset.imdbid)
                        .then(response=> response.json())
                        .then(mb=> {
                            const viewModal = tampilModal(mb);
                            const modalBody = document.querySelector('.modal-body');
                            modalBody.innerHTML = viewModal;
                        })
                })
            })
        })
})



function tampilFilm(mv) {
    return `<div class="col-md-4 my-5">
                <div class="card">
                    <img src="${mv.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${mv.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${mv.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#modal-movie" data-imdbid="${mv.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
}

function tampilModal(md) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${md.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h4>${md.Title} ${md.Year}</h4>
                            </li>
                            <li class="list-group-item"><strong>Director : </strong>${md.Director}
                            </li>
                            <li class="list-group-item"><strong>Actors : </strong>${md.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong>${md.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong> <br>${md.Plot} mempunyai
                                kekuatan
                                untuk menguasai Bumi</li>
                        </ul>
                    </div>
                </div>
            </div>`
}