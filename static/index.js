window.onload = () => {
    const ifMobile = window.matchMedia('screen and (max-aspect-ratio: 8/11)').matches;
    if (ifMobile) {
        document.body.style.height = `${window.innerHeight}px`;
    }
}