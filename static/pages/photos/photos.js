    window.onload = function() {
        let total = 36,
            gallery = document.getElementsByClassName('gallery')[0],
            collection,
            arr,
            back_wrapper = $('.back-wrapper')[0],
            root_styles = getComputedStyle(document.body),
            height = parseInt(root_styles.getPropertyValue('--height')),
            ratio = parseFloat(root_styles.getPropertyValue('--ratio')),
            fs_size = parseFloat(root_styles.getPropertyValue('--fullscreen-size')),
            grid_size = parseInt(root_styles.getPropertyValue('--grid-size')),
            width = height * ratio,
            path = "https://ik.imagekit.io/indspirit/",
            jpg = `.jpg?tr=h-${grid_size},w-${grid_size * ratio},fo-auto`,
            preview = `.jpg?tr=h-5:h-${height},w-${width}`,
            fs_src = `.jpg?tr=w-${fs_size},h-${fs_size},c-at_max`,
            //!!
            fs_preview = `.jpg?tr=w-${fs_size},h-${fs_size},c-at_max`,
            upend_btn = document.getElementsByClassName('upend-btn')[0];

        upend_btn.addEventListener('click', () => {
            upend();
        });

        //CREATE PLACEHOLDERS
        function create_placeholders() {
            for (let i = 1; i < total; i++) {
                let placeholder = document.createElement('img');
                placeholder.src = path + i + preview;
                placeholder.setAttribute('data-src', `${path + i + jpg}`);
                placeholder.alt = "photo";
                placeholder.id = i;
                gallery.append(placeholder);
            }
        }

        //LOAD SEVERAL PICTURES
        function create_images() {
            for (let i = 1; i < total; i++) {
                let img = document.createElement('img');
                let placeholder = document.getElementById(i);
                img.src = path + i + jpg;
                img.onload = () => {
                    // add a small timeout to allow the transition when the image is already in memory
                    setTimeout(() => {
                        // replace the placeholder src with the full image src
                        placeholder.src = img.src;
                        placeholder.removeAttribute("data-src");
                    }, 1);
                }
            }
            collection = gallery.children;
            arr = Array.prototype.slice.call(collection);
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
            let fs_image = document.getElementsByClassName('fs-image')[0];
            for (let i = 0; i < arr.length; i++) {
                arr[i].addEventListener('click', function() {
                    fs_image.src = `${path + (i + 1) + fs_src}`;
                    upend();
                });
            };
        }

        //UPEND GALLERY
        function upend() {
            $(upend_btn).addClass('unclickable');
            $(gallery).one('animationend', () => {
                $(gallery).toggleClass('visible')
                $(back_wrapper).toggleClass('visible')
                $(gallery).removeClass('unclickable');
                $(upend_btn).removeClass('unclickable');
            });

            if (gallery.classList.contains('visible')) {
                back_wrapper.classList.add('animation')
                gallery.classList.add('animation')
                $(gallery).addClass('unclickable');
            } else {
                gallery.classList.add('reverse-animation')
                back_wrapper.classList.add('reverse-animation')
                $(gallery).addClass('unclickable');
                $(gallery).one('animationend', () => {
                    gallery.classList.remove('animation')
                    back_wrapper.classList.remove('animation')
                    gallery.classList.remove('reverse-animation')
                    back_wrapper.classList.remove('reverse-animation')
                });
            }
        }

        adapth_images_width();
        create_placeholders();
        create_images();
        fullscreen_onclick();
    }