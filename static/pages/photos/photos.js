window.onload = function() {
    let total = 34;
    // LOAD PICTURES TO THE PAGE
    let container = document.getElementsByClassName('gallery')[0];
    // let path = "../../assets/photos/";
    let path = "https://ik.imagekit.io/indspirit/";
    let bl = ".jpg?tr=bl-10,h-250px";
    let jpg = ".jpg?tr=h-400";
    let preview = ".jpg?tr=h-12:h-250";

    //LOAD A PICTURE

    function create_image() {
        let createImg = document.createElement('img');
        let random_number = Math.floor(Math.random() * total);
        createImg.src = path + random_number + jpg;
        createImg.alt = "photo didn't load";
        createImg.classList.add('photo');
        createImg.id = random_number;
        container.append(createImg);
    }


    //NEXT PICTURE 

    function next_image() {
        let current = document.getElementsByClassName('photo')[0];
        let index = parseInt(current.id, 10) + 1;
        if (index >= total) {
            index = 1;
        }
        current.src = path + index + jpg;
        current.id = index;
    }

    //CREATE PLACEHOLDERS
    function create_placeholders() {
        for (let i = 1; i < total; i++) {
            let placeholder = document.createElement('img');
            placeholder.src = path + i + preview;
            placeholder.setAttribute('data-src', `${path + i + jpg}`);
            placeholder.classList.add('opacity')
            placeholder.alt = "photo";
            placeholder.id = i;
            container.append(placeholder);
            setTimeout(function() {
                placeholder.classList.remove('opacity')
            }, 1000);
        }
    }

    //LOAD SEVERAL PICTURES
    function create_images() {
        for (let i = 1; i < total; i++) {
            let img = document.createElement('img');
            let placeholder = document.getElementById(i);
            console.log(placeholder);
            img.src = path + i + jpg;
            img.onload = function() {
                // add a small timeout to allow the transition when the image is already in memory
                setTimeout(() => {
                    // replace the placeholder src with the full image src
                    placeholder.src = img.src;
                    placeholder.removeAttribute("data-src");
                    setTimeout(() => {
                        placeholder.style.transition = '0s';
                    }, 1000);
                }, 200);
                // container.append(createImg);
            }
        }
    }

    //SOME PICTURES IN A ROW WITH OPACITY CHANGE

    function opacity_style() {
        let collection = container.children;
        let collection_size = collection.length;
        let first = collection[collection_size - 1];
        let second = collection[collection_size - 2];
        let third = collection[collection_size - 3];
        // console.log(container, collection, second, collection_size);

        second.style.setProperty('opacity', '70%');
        second.style.setProperty('margin-left', '-70px');
        second.style.setProperty('margin-top', '-70px');

        third.style.setProperty('opacity', '20%');
        third.style.setProperty('margin-left', '-140px');
        third.style.setProperty('margin-top', '-140px');
    }


    create_placeholders();
    create_images();
}