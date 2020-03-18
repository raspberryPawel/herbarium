const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur porta rutrum. Etiam non posuere turpis. Sed consequat orci neque. Praesent et lorem metus. Aliquam vel sapien a ante congue fringilla sit amet et ante. Morbi malesuada sem purus, sed tempor enim faucibus eu. Suspendisse ornare consectetur enim ac congue. Morbi sed aliquet ante. Nullam ultricies pulvinar tristique. Mauris volutpat, neque in posuere consequat, urna metus blandit ante, ac suscipit risus erat in orci. Cras ac turpis purus. Nullam ut sagittis mi. Donec sodales, metus quis scelerisque ultrices, dui tortor rutrum turpis, eget varius tellus augue sed odio. Sed viverra pellentesque feugiat. Nulla vel facilisis leo. Etiam et sem nec urna convallis placerat in a velit. ';
let user_offset_top = 0;
const plantsPossibilities = [
    {
        plant_name: 'Super roślinka',
        plant_img: './assets/plant.svg',
        plant_description: loremIpsum
    },
    {
        plant_name: 'Zamioculas',
        plant_img: './assets/zamioculcas.svg',
        plant_description: loremIpsum
    },
    {
        plant_name: 'Kaktus 1',
        plant_img: './assets/cactus.svg',
        plant_description: loremIpsum
    },
    {
        plant_name: 'Kaktus 2',
        plant_img: './assets/cactus(1).svg',
        plant_description: loremIpsum
    },
    {
        plant_name: 'Kaktus 3',
        plant_img: './assets/cactus(2).svg',
        plant_description: loremIpsum
    },
    {
        plant_name: 'Roślinka 1',
        plant_img: './assets/plant(1).svg',
        plant_description: loremIpsum
    },
    {
        plant_name: 'Roślinka 2',
        plant_img: './assets/plant(2).svg',
        plant_description: loremIpsum
    },

];
window.addEventListener("load", function () {
    let nav_open = false;
    const plants = [];

    this.document.getElementById('add_new_plant').addEventListener('click', function () {

        plants.push(plantsPossibilities[Math.floor(Math.random() * plantsPossibilities.length)]);
        document.getElementById('plants_section').innerHTML = "";
        generatePlants(plants);
        checkAndShowPlants(plants);
    });

    this.document.getElementById('nav_button').addEventListener('click', function () {
        nav_open = !nav_open;

        nav_open
            ? document.getElementsByTagName('nav')[0].classList.add("active")
            : document.getElementsByTagName('nav')[0].classList.remove("active");
        nav_open
            ? document.getElementsByTagName('header')[0].classList.add("active")
            : document.getElementsByTagName('header')[0].classList.remove("active");
        nav_open
            ? document.getElementById('plant_container').classList.add("active")
            : document.getElementById('plant_container').classList.remove("active");
        nav_open
            ? document.getElementById('shutteer').classList.add("active")
            : document.getElementById('shutteer').classList.remove("active");
        // nav_open
        //     ? document.getElementsByTagName('footer')[0].classList.add("active")
        //     : document.getElementsByTagName('footer')[0].classList.remove("active");

    });

    checkAndShowPlants(plants);

    this.document.getElementById('plant_details_close_button').addEventListener('click', closePlantDetails);

    setInterval(function () {
        document.getElementById('add_new_plant').classList.add('bounce');
        setTimeout(() => {
            document.getElementById('add_new_plant').classList.remove('bounce');
        }, 1000);
    }, 5000);
});

function checkAndShowPlants(plants) {
    if (plants.length === 0) {
        document.getElementById("empty_section").style.display = 'flex';
        document.getElementById("plants_section").style.display = 'none';
    }
    else {
        document.getElementById("empty_section").style.display = 'none';
        document.getElementById("plants_section").style.display = 'flex';
    }
}

function generatePlants(plants) {
    plants.map(item => {
        let new_plant = document.createElement('figure');
        new_plant.classList.add('plant');

        let plant_image = document.createElement('img')
        plant_image.addEventListener("click", clickOnImage);
        plant_image.classList.add('plant_img');
        plant_image.setAttribute('src', item.plant_img);

        let loupe_image = document.createElement('img')
        loupe_image.addEventListener("click", function () {

            const plant_details_image = document.getElementById('plant_details_image');
            const plant_details_name = document.getElementById('plant_details_name');
            const plant_details_description = document.getElementById('plant_details_description');

            plant_details_image.children[0].src = item.plant_img;
            plant_details_name.children[0].innerHTML = item.plant_name;
            plant_details_description.innerHTML = item.plant_description;

            const doc = document.documentElement;
            user_offset_top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);


            document.getElementById('plant_details').classList.add('active');
            document.getElementById('add_new_plant').classList.add('none');
            document.getElementById('plant_details_close_button').classList.add('block');
            document.getElementsByTagName('body')[0].classList.add('hidden-y');
            document.documentElement.scrollTop = 0;
        });
        loupe_image.classList.add('loupe_img');
        loupe_image.setAttribute('src', './assets/search.svg');

        let plant_name = document.createElement('figcaption')
        plant_name.classList.add('plant_name');
        plant_name.innerText = item.plant_name;

        new_plant.append(plant_image);
        new_plant.append(loupe_image);
        new_plant.append(plant_name);

        document.getElementById('plants_section').append(new_plant);
    });
}

function clickOnImage() {
    this.removeEventListener("click", clickOnImage);
    this.classList.add('flip');
    setTimeout(() => {
        this.classList.remove('flip');
        this.addEventListener("click", clickOnImage);
    }, 1000);
}

function closePlantDetails() {
    document.documentElement.scrollTop = user_offset_top;
    document.getElementById('plant_details').classList.remove('active');
    document.getElementById('plant_details_close_button').classList.remove('block');
    document.getElementById('add_new_plant').classList.remove('none');
    document.getElementsByTagName('body')[0].classList.remove('hidden-y');
}