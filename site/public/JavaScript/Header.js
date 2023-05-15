const header = document.getElementById('header')
const headerUser = document.getElementById('headerUser')

window.addEventListener('scroll', (e) => {
    const { innerHeight, scrollY } = window
    const activePoint = innerHeight * 0.98

    if(scrollY > activePoint){
        header.classList.add("header-background")
        headerUser.src = "./IMG/user-black.png"
    }
    if(scrollY < activePoint){
        header.classList.remove("header-background")
        headerUser.src = "./IMG/user-white.png"
    }
})