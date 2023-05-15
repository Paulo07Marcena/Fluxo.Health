let leftBarOpen = true

function modifyLeftBar(){
    const bar = document.getElementsByClassName('modifyLeftBar')
    const image = document.getElementsByClassName('modifyImage')
    const options = [...document.getElementsByClassName('modifyOption')]
    const hamburger = document.getElementsByClassName('modifyHamburger')

    if(leftBarOpen){
        options.map(option => option.setAttribute('id','closeOption'))
        image[0].setAttribute('id','closeImage')
        bar[0].setAttribute('id','closeBar')
        hamburger[0].setAttribute('id','closeHamburger')
    }
    else{
        options.map(option => option.removeAttribute('id','closeOption'))
        image[0].removeAttribute('id','closeImage')
        bar[0].removeAttribute('id','closeBar')
        hamburger[0].removeAttribute('id','closeHamburger')
    }

    leftBarOpen = !leftBarOpen
}