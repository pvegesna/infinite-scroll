const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

function showLoader() {
    loader.hidden = false;
};
function disableLoader() {
    loader.hidden = true;
};

// Unsplash API
const count = 10;
const apiKey = 'API_KEY';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${10}`;

// Check if all the images were loaded
function imageLoaded() {
    console.log('image loaded');
    imageLoaded++;
    if (imageLoaded == totalImages) {
        ready = true;
        console.log('ready = ', ready);
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    };
};

// Adds links & photos to photos array and adds to DOM.
function displayPhotos() {
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create img tag for photo
        const img = document.createElement('img');
        setAttributes(item, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Check when loading is finished
        img.addEventListener('load', imageLoaded);
        // Put image inside <a>. then put both in image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};

// Get Photos from Unsplash
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // disableLoader();
        displayPhotos();
        console.log(imageContainer);
    } catch (error) {
        // catch error
    };
};

// Check to see if scrolling near bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
disableLoader();
getPhotos();