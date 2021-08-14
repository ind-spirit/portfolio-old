    window.onload = function() {
        let total = 36;
        let gallery = document.getElementsByClassName('gallery')[0];
        let root_styles = getComputedStyle(document.body);
        let height = parseInt(root_styles.getPropertyValue('--height'));
        let ratio = parseFloat(root_styles.getPropertyValue('--ratio'));
        let fullscreen_size = parseFloat(root_styles.getPropertyValue('--fullscreen-size'));
        let grid_size = parseInt(root_styles.getPropertyValue('--grid-size'));
        let width = height * ratio;
        let path = "https://ik.imagekit.io/indspirit/";
        let jpg = `.jpg?tr=h-${grid_size},w-${grid_size * ratio},fo-auto`;
        let preview = `.jpg?tr=h-5:h-${height},w-${width}`;
        let fullscreen_src = `.jpg?tr=w-${fullscreen_size},h-${fullscreen_size},c-at_max`;
        let cubic;
        let cubic1;

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
            let images_in_line = parseFloat(gallery.offsetWidth / width);

            //IF THERE IS A LOT OF FREE SPACE LEFT
            if (parseFloat(images_in_line - Math.trunc(images_in_line)) >= 0.7) {
                //WE PUT ONE MORE IMAGE IN A LINE
                width = parseFloat(((gallery.offsetWidth - (5.5 * parseInt(images_in_line))) / parseInt(images_in_line + 1)));
                document.documentElement.style.setProperty('--height', `${parseFloat(width/ratio)}px`);
                alert('if')
            } else if (0.7 > parseFloat(images_in_line - Math.trunc(images_in_line))) {
                //IF NOT - WE RESIZE WHAT WE HAVE TO FIT THE WIDTH OF THE GALLERY
                width = parseFloat(((gallery.offsetWidth - (5.5 * parseInt(images_in_line))) / parseInt(images_in_line)));
                document.documentElement.style.setProperty('--height', `${parseFloat(width/ratio)}px`);
            }
        }

        //OPEN IMAGE ON A FULLSREEN ONCLICK
        function fullscreen_onclick() {
            let collection = gallery.children;
            let arr = Array.prototype.slice.call(collection);
            let fs = document.getElementsByClassName('fs')[0];
            let fs_image = document.getElementsByClassName('fs-image')[0];
            let back = document.getElementsByClassName('back')[0];

            for (let i = 0; i < arr.length; i++) {
                arr[i].addEventListener('click', function() {
                    fs_image.src = `${path + (i + 1) + fullscreen_src}`;
                    gallery.classList.add('flip-animation');
                    gallery.addEventListener("transitionend", () => {
                        gallery.classList.add('none')
                        back.classList.remove('none')
                        fs.classList.remove('none')
                        setTimeout(function() {
                            fs.classList.add('flip-back-animation');
                        }, 1);
                    }, { once: true });
                    
                    fs.addEventListener("transitionend", () => {
                        cubic = window.getComputedStyle(fs, null).getPropertyValue("transition");
                        console.log(cubic);
                        console.log(window.getComputedStyle(gallery, null).getPropertyValue("transition"));
                        fs.style.transition = window.getComputedStyle(gallery, null).getPropertyValue("transition");
                        console.log(window.getComputedStyle(gallery, null).getPropertyValue("transition"));
                        gallery.style.transition = cubic;
                    }, { once: true })
                });
            };
        }

        //RETURN TO GRID LAYOUT
        function back_to_grid() {
            let back = document.getElementsByClassName('back')[0];
            let fs = document.getElementsByClassName('fs')[0];
            back.addEventListener('click', function(e) {
                fs.addEventListener("transitionend", () => {
                    fs.classList.add('none')
                    gallery.classList.remove('none')
                    setTimeout(function() {
                        gallery.classList.remove('flip-animation');
                    }, 1);
                }, { once: true });

                gallery.addEventListener("transitionend", () => {
                    cubic = window.getComputedStyle(fs, null).getPropertyValue("transition");
                    console.log(cubic);
                    console.log(window.getComputedStyle(gallery, null).getPropertyValue("transition"));
                    fs.style.transition = window.getComputedStyle(gallery, null).getPropertyValue("transition");
                    console.log(window.getComputedStyle(gallery, null).getPropertyValue("transition"));
                    gallery.style.transition = cubic;
                }, { once: true })
                
                back.addEventListener('transitionend', () => {
                    back.classList.add('none');
                    back.classList.remove('opacity')
                }, { once: true });

                back.classList.add('opacity')
                fs.classList.remove('flip-back-animation');
            });
        };


        adapth_images_width();
        create_placeholders();
        create_images();
        fullscreen_onclick();
        back_to_grid();
    }