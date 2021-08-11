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
        let gallery = document.getElementsByClassName('gallery')[0];
        let root_styles = getComputedStyle(document.body);
        let height = parseInt(root_styles.getPropertyValue('--height'));
        let ratio = parseFloat(root_styles.getPropertyValue('--ratio'));
        let grid_size = parseInt(root_styles.getPropertyValue('--grid-size'));
        let width = height * ratio;
        console.log(height, ratio, width);
        let path = "https://ik.imagekit.io/indspirit/";
        let jpg = `.jpg?tr=h-${grid_size},w-${grid_size * ratio},fo-auto`;
        let preview = `.jpg?tr=h-5:h-${height},w-${width}`;

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

        //RECALCULATE GALLERY WIDTH
        function adapth_images_width() {
            //let offsetright = parseInt(gallery.offsetWidth - img.offsetLeft - img.offsetWidth);
            let images_in_line = parseFloat(gallery.offsetWidth / width);
            console.log(gallery.offsetWidth, width, images_in_line);
            console.log(parseFloat(images_in_line - Math.trunc(images_in_line)));
            if (parseFloat(images_in_line - Math.trunc(images_in_line)) > 0.7) {
                console.log((width * (parseInt(images_in_line) + 1)));
                width = parseFloat((gallery.offsetWidth - 20) / parseInt(images_in_line + 1));
                console.log('width and float width / ratio:', width, parseFloat(width / ratio));
                document.documentElement.style.setProperty('--height', `${parseFloat(width/ratio)}px`);
            } else if (parseFloat(images_in_line - Math.trunc(images_in_line)) < 0.6) {
                width = parseFloat((gallery.offsetWidth - 20) / parseInt(images_in_line));
                document.documentElement.style.setProperty('--height', `${parseFloat(width/ratio)}px`);
            }
        }

        adapth_images_width();
        create_placeholders();
        create_images();
    }