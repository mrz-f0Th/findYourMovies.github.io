$('.search-button').on('click', ()=> {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=415a8604&s=' + $('.input-keyword').val(),
        success: results => {
            $('.input-keyword').val('');
            const movie = results.Search;
            let cards = '';
            movie.forEach(mv => {
                cards += tampilFilm(mv);
            });
            $('.movie-container').html(cards);
    
            $('.modal-detail-button').on('click', function() {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=415a8604&i=' + $(this).data('imdbid'),
                    success: md => {
                        let modal = tampilModal(md);
                        $('.modal').html(modal);
                    },
                    error: e => {
                        console.log(e.responseText);
                    }
                })
            })
        },
        error: e => {
            console.log(e.responseText);
        }
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
    return `<div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-movieLabel">${md.Title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-3">
                                    <img src="${md.Poster}" class="img-fluid">
                                </div>
                                <div class="col-md">
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            <h4>Avengers (2022)</h4>
                                        </li>
                                        <li class="list-group-item"><strong>Director : </strong>${md.Title} ${md.Year}</li>
                                        <li class="list-group-item"><strong>Actors : </strong>${md.Director}</li>
                                        <li class="list-group-item"><strong>Writer : </strong>${md.Actors}</li>
                                        <li class="list-group-item"><strong>Plot : </strong> <br>${md.Plot} mempunyai
                                            kekuatan
                                            untuk menguasai Bumi</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>`
}