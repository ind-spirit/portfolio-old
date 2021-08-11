    //MOVES ELEMENT IN ARRAY IN A NEW POSITION
    function move(arr, old_index, new_index) {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
    }

    window.onload = function() {
        let total = 34;
        // LOAD PICTURES TO THE PAGE
        let gallery = document.getElementsByClassName('gallery')[0];
        // let path = "../../assets/photos/";
        let path = "https://ik.imagekit.io/indspirit/";
        let bl = ".jpg?tr=bl-10,h-250px";
        let jpg = ".jpg?tr=h-400";
        let preview = ".jpg?tr=h-12:h-250";

        //CREATE PLACEHOLDERS
        function create_placeholders() {
            for (let i = 1; i < total; i++) {
                let placeholder = document.createElement('img');
                placeholder.src = path + i + preview;
                placeholder.setAttribute('data-src', `${path + i + jpg}`);
                placeholder.classList.add('opacity')
                placeholder.alt = "photo";
                placeholder.id = i;
                gallery.append(placeholder);
                setTimeout(function() {
                    placeholder.classList.remove('opacity')
                }, 1000);
            }
        }

        //RESIZE SOME OF THE IMAGES
        function resize() {
            for (let i = 1; i < total; i++) {
                let img = document.getElementById(i);
                console.log(img, parseInt(img.offsetWidth), parseInt(img.offsetHeight));
                if ((img.offsetWidth / img.offsetHeight) > 1.7 || (img.offsetWidth / img.offsetHeight) < 0.7) {
                    img.style.height = `${(parseInt(img.offsetHeight) * 2)}px`;
                    //document.body.prepend(img);
                    console.log(true);
                }
            }
        }

        //MOVE SMALL PHOTOS TO THE END
        function move_small() {
            let collection = gallery.children;
            var arr = Array.prototype.slice.call(collection);
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].offsetWidth < 200) {
                    gallery.append(arr[i]);
                    move(arr, i, arr.length - 1)
                }
            }
        }

        //CALCULATE EMPTY SPACES TO FILL THEM
        function fill_with_photos() {
            let countRows = 0;

            for (let i = 1; i < total - 1; i++) {
                let img = document.getElementById(i);
                let second = document.getElementById(`${i + 1}`)
                let img_before_empty;

                let offsetright = parseInt(gallery.offsetWidth - img.offsetLeft - img.offsetWidth);

                // IF THE MARGIN FROM THE LAST PICTURE IN THE LINE TO THE RIGHT END OF THE PAGE IS TOO BIG WE DO SMTH 
                if (parseFloat(img.offsetTop) < parseFloat(second.offsetTop)) {
                    countRows++;
                    if (offsetright > 200) {
                        //console.log(offsetright, img, "row:", countRows);
                        img_before_empty = img;
                        //WE SEARCH FOR THE IMAGE WITH WIDTH LESS THEN MARGIN TO MOVE IN
                        for (i = i + 1; i < total; i++) {
                            let img = document.getElementById(i);

                            if (img.offsetWidth < (offsetright - 30)) {
                                console.log('img fit:', i, img, img.offsetWidth, offsetright);
                                img_before_empty.after(img);
                                i--;
                                break;
                            }
                        }
                    }
                }
            }
        }

        //LOAD SEVERAL PICTURES
        function create_images() {
            for (let i = 1; i < total; i++) {
                let img = document.createElement('img');
                let placeholder = document.getElementById(i);
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
                }
            }
        }

        create_placeholders();
        create_images();
    }