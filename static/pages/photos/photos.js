window.onload = function() {
    let total = 34;
    // LOAD PICTURES TO THE PAGE
    let container = document.getElementById('photo-container');
    let path = "../../assets/photos/";
    let jpg = ".jpg"

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
        let index = parseInt(current.id, 10);
        if (index + 1 >= total) {
            index = 0;
        }
        current.src = path + index++ + jpg;
        current.id = index++;
    }

    //LOAD SEVERAL PICTURES
    function create_images() {
        for (let i = 30; i < 31; i++) {
            let createImg = document.createElement('img');
            createImg.src = path + i + jpg;
            createImg.alt = "photo didn't load";
            container.append(createImg);
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

    let next_btn = document.getElementsByClassName('next')[0]; 
    next_btn.addEventListener('click', function () {
        next_image();
    });
    create_image();
}