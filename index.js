var inputElement = document.querySelector('.main .section .section-search input');
var buttonElement = document.querySelector('.main .section .section-search button');
var containerImages = document.querySelector('.main .container-images');
var selectionElement = document.querySelector('select');

console.log(selectionElement);
console.log(buttonElement);
console.log(containerImages);


function requestImages() {
var startYear, endYear;
var inputText = inputElement.value;

    var receiveImages = function() {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();

            inputElement.value = '';

            var optionValue = selectionElement.selectedIndex;
            console.log(optionValue);

            switch (optionValue) {
                case 0:
                    startYear = 1900;
                    endYear = 1910;
                    break;

                case 1:
                    startYear = 1910;
                    endYear = 1920;
                    break;

                case 2:
                    startYear = 1920;
                    endYear = 1930;
                    break;

                case 3:
                    startYear = 1930;
                    endYear = 1940;
                    break;

                case 4:
                    startYear = 1940;
                    endYear = 1950;
                    break;

                case 5:
                    startYear = 1950;
                    endYear = 1960;
                    break;

                case 6:
                    startYear = 1960;
                    endYear = 1970;
                    break;

                case 7:
                    startYear = 1970;
                    endYear = 1980;
                    break;

                case 8:
                    startYear = 1980;
                    endYear = 1990;
                    break;

                case 9:
                    startYear = 1990;
                    endYear = 2000;
                    break;

                case 10:
                    startYear = 2000;
                    endYear = 2010;
                    break;

                case 11:
                    startYear = 2010;
                    endYear = 2020;
                    break;

                default:
                    break;
            }

            xhr.open('GET', `https://images-api.nasa.gov/search?q=${inputText}&media_type=image&year_start=${startYear}&year_end=${endYear}`);
            xhr.send(null);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject('Erro na requisicao');
                    }
                }
            }
        });
    }

    receiveImages()
        .then(response => {
            containerImages.innerHTML = '';
    
            for (var iterator = 1; iterator <= 80; iterator++) {
                var imageElement = document.createElement('img');

                if (typeof response.collection.items[0] === 'undefined') {
                    alert(`Não foi possível encontrar imagens de ${inputText} entre ${startYear} e ${endYear}`)
                }

                console.log(response.collection.items[0].links[0].href);
                imageElement.setAttribute('src', response.collection.items[iterator].links[0].href);
                imageElement.setAttribute('class', 'images');
            
                containerImages.appendChild(imageElement);
            }
        })
        .catch(error => {
            console.warn(error);
        });
}
