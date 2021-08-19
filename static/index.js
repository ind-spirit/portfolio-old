window.onload = () => {
    const ifMobile = window.matchMedia('screen and (max-aspect-ratio: 8/11)').matches;
    console.log(ifMobile);
    console.log(document.body.style.height, window.innerHeight);
    if (ifMobile) {
        // document.body.style.height = window.innerHeight;
        document.body.style.height = `${window.innerHeight}px`;
        
    }
    console.log(document.body.style.height, window.innerHeight);
    console.log(document.body.style, document.body.offsetHeight);
    console.log(document.body.offsetHeight);






}