    window.onload = function() {
        let total = 45,
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
            jpg = `.jpg?tr=h-${grid_size},w-${grid_size * ratio},fo-auto,f-auto`,
            preview = `.jpg?tr=h-5:h-${height},w-${width},f-auto`,
            fs_src = `.jpg?tr=w-${fs_size},h-${fs_size},c-at_max,f-auto`,
            fs_preview = `.jpg?tr=h-5,c-at_least:w-${fs_size},h-${fs_size},c-at_least,f-auto`,
            back_btn = document.getElementsByClassName('back-btn')[0],
            left_btn = $('.left-btn')[0],
            right_btn = $('.right-btn')[0];



        //CREATE PLACEHOLDERS
        function createPlaceholders() {
            for (let i = 1; i < total; i++) {
                let placeholder = document.createElement('img');
                placeholder.src = path + i + preview;
                placeholder.onerror = () => {
                    placeholder.remove();
                    total -= 1;
                }
                placeholder.setAttribute('data-src', `${path + i + jpg}`);
                placeholder.alt = "photo";
                placeholder.id = i;
                gallery.append(placeholder);
            }
            collection = gallery.children;
            arr = Array.prototype.slice.call(collection);
        }

        //RECALCULATE GALLERY WIDTH
        function adaptImagesWidth() {
            let images_in_line = parseFloat(gallery.offsetWidth / width);
            //IF THERE IS A LOT OF FREE SPACE LEFT
            if (parseFloat(images_in_line - Math.trunc(images_in_line)) >= 0.6) {
                //WE PUT ONE MORE IMAGE IN A LINE
                width = parseFloat(((gallery.clientWidth - (3.5 * parseInt(images_in_line))) / parseInt(images_in_line + 1)));
                document.documentElement.style.setProperty('--height', `${parseFloat(width/ratio)}px`);
            } else if (0.6 > parseFloat(images_in_line - Math.trunc(images_in_line))) {
                //IF NOT - WE RESIZE WHAT WE HAVE TO FIT THE WIDTH OF THE GALLERY
                width = parseFloat(((gallery.clientWidth - (3.5 * parseInt(images_in_line))) / parseInt(images_in_line)));
                document.documentElement.style.setProperty('--height', `${parseFloat(width/ratio)}px`);
            }
        }

        function loadFSimage(el) {
            let fs_image = document.getElementsByClassName('fs-image')[0];
            let buffer = document.createElement('img');
            let i = parseInt(el.id);
            fs_image.src = ``;
            fs_image.src = `${path + i + fs_preview}`;
            fs_image.id = el.id;
            fs_image.setAttribute('data-src', `loading`);
            buffer.src = `${path + i+ fs_src}`;
            buffer.onload = () => {
                setTimeout(() => {
                    fs_image.src = buffer.src;
                    fs_image.removeAttribute('data-src')
                }, 1);
            }
        }

        //UPEND GALLERY
        function upend() {
            $(back_btn).addClass('unclickable');
            $(gallery).one('animationend', () => {
                $(gallery).toggleClass('visible')
                $(back_wrapper).toggleClass('visible')
                $(gallery).removeClass('unclickable');
                $(back_btn).removeClass('unclickable');
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

        //CHECK IF THE IMAGE IS LAST AND HIDE AN ARROW
        function imageIsLast() {
            let current_image_index = parseInt($('.fs-image')[0].id);
            if (current_image_index == 1) {
                $(left_btn).hide();
            } else if (current_image_index == total - 1) {
                $(right_btn).hide();
            } else {
                $(left_btn).show();
                $(right_btn).show();
            }
        }

        function lazyLoading() {
            const targets = document.querySelectorAll('div.gallery > img');
            console.log(targets);
            const lazyLoad = target => {
                const io = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            const src = img.getAttribute('data-src');
                            img.setAttribute('src', src);
                            //ADD TRANSITION EFFECT
                            setTimeout(() => {
                                img.removeAttribute("data-src");
                            }, 1);
                            observer.disconnect();
                        }
                    });
                });
                io.observe(target)
            };
            targets.forEach(lazyLoad);
        }






        //calling functions

        adaptImagesWidth();
        createPlaceholders();
        lazyLoading();
        
        gallery.addEventListener('transitionend', () => {
            back_wrapper.classList.remove('opacity');
        }, { once: true })
        gallery.classList.add('slideDown')

        left_btn.addEventListener('click', () => {
            let current_image_index = parseInt($('.fs-image')[0].id);
            let left_image = $(`#${current_image_index - 1}`)[0];
            loadFSimage(left_image);
            imageIsLast();
        });

        right_btn.addEventListener('click', () => {
            let current_image_index = parseInt($('.fs-image')[0].id);
            let right_image = $(`#${current_image_index + 1}`)[0];
            loadFSimage(right_image);
            imageIsLast();
        });

        back_btn.addEventListener('click', () => {
            upend();
        });

        for (let i = 0; i < arr.length; i++) {
            arr[i].addEventListener('click', (event) => {
                loadFSimage(event.target);
                imageIsLast();
                upend();
            });
        };


    }