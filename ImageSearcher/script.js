
const search = document.getElementById('search')
const button = document.getElementById('button')
const client_id = '2GGyu597SMOntUXtNAsdqlD98VvWnVgEXphY9tcAxhk'
const photos = document.querySelectorAll('.photo')

function main(){
    const search_val = search.value
    if (search_val != '') {
        fetcher(search_val)
        .then(urls => {imagePlacer(urls)})
    }
}

button.onclick = (e) => {
    e.preventDefault()
    main()
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        main()
    }
});


async function fetcher(search_val) {
    try{
        let res = await fetch(`https://api.unsplash.com/search/photos?query=${search_val}&client_id=${client_id}`)
        let data = await res.json()
        data = data.results.map(val => val.urls.regular)
        return data
    }
    catch(e){
        document.querySelector('.photos').innerHTML += '<h1>Sorry! We are unable to proceed</h2>'
    }
}

function imagePlacer(urls) {
    photos.forEach((photo, i)=>{
        photo.innerHTML = `<img src="${urls[i]}">`
    })
}