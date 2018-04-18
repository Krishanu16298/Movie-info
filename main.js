let input = document.getElementById('movin');
let input2 = document.getElementById('movie');
input.addEventListener('submit',(e)=> {
    console.log(input2.value);
    let t = input2.value;
    let output ='';
    let title = '';
    let year = '';
    let img = '';
    let id = '';
    if(t !== null){
        fetch('http://www.omdbapi.com/?s='+t+'&apikey=f9b9ce80')
        .then((res) => res.json())
        .then((data) => {
            console.log(data.Search.length);
            for(let i = 0; i < data.Search.length; i++){
                console.log(data.Search[i].Title);
                title = data.Search[i].Title;
                year = data.Search[i].Year;
                img = data.Search[i].Poster;
                id = data.Search[i].imdbID;
                output += `
                    <div class="col-md-3">
                        <div class="card">
                            <img src="${img}" class="card-img-top">
                            <div class="card-body">
                                <div class="card-title">
                                    <h3>${title}</h3>
                                    <small>${year}</small>
                                </div>
                                <div class="card-text">
                                    <button onclick="modinit('${id}')" data-toggle="modal" data-target=".bd-example-modal-lg" id="info" class="btn btn-outline-primary">Read more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            document.getElementById('output').innerHTML = output;
        });
    }
    e.preventDefault();
});

function modinit(str){
    fetch('http://www.omdbapi.com/?i=' + str +'&apikey=f9b9ce80')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        document.getElementById('modbod').innerHTML = `
        <div class="row">
            <div class="col-6" id="img">
            <img src="${data.Poster}">
            </div>
            <div class="col-6" id="content">
                <div class="row">
                    <div class="col-3">
                        <p>Title</p>    
                    </div>
                    <div class="col-9">
                        <p>: ${data.Title}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <p>Year</p>
                    </div>
                    <div class="col-9">
                        <p>: ${data.Year}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <p>Cast</p>
                    </div>
                    <div class="col-9">
                        <p>: ${data.Actors}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <p>Plot</p>
                    </div>
                    <div class="col-9">
                        <p>: ${data.Plot}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <p>Director</p>
                    </div>
                    <div class="col-9">
                        <p>: ${data.Director}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <p>Imdb Rating</p>
                    </div>
                    <div class="col-9">
                        <p>: ${data.imdbRating}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <p>Duration</p>
                    </div>
                    <div class="col-9">
                        <p>: ${data.Runtime}</p>
                    </div>
                </div>
            </div>
        </div>`
        ;
    });
}