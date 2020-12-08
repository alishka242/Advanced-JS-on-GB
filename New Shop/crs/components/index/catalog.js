// function initCatalog() {
//     const catalog = {
//         items: [],
//         container: null,
//         basket: null,
//         url: 'https://raw.githubusercontent.com/alishka242/static/master/JSON/catalog.json',
//         init(basket) {
//             this.container = document.querySelector('#catalog');
//             this.basket = basket;

//             //async
//             this._get(this.url)
//             .then(catalog => {
//                 this.items = catalog;
//                 this._render();
//                 this._handelEvents();
//             });
//         },

//         _get(url) {
//             return fetch(url).then(d => d.json()); //сделает запрос за джейсоном, дождется ответа и преобразует джейсон в объект, который вернется из данного метода
//         },

//         _render() {
//             let htmlStr = '';

//             this.items.forEach((item, i) => {
//                 htmlStr += renderCatalogTemplate(item, i);
//             });

//             this.container.innerHTML = htmlStr;
//         },

//         _handelEvents() {
//             this.container.addEventListener('click', event => {
//                 if (event.target.name == 'add') {
//                     // console.log('КУПЛЕНО!')
//                     let id = event.target.dataset.id; //from data-id
//                     let item = this.items.find(el => el.productId == id);
//                     this.basket.add(item);
//                 }
//             });
//         },
//     };

//     return catalog;
// }

// function renderCatalogTemplate(item, i) {
//temlate
// }

class Card {
    constructor(img, prId, prName, prPrice) {
        this.productImg = img;
        this.productId = prId;
        this.productName = prName;
        this.productPrice = prPrice;
    }
    getTemplate() {
        return `
        <div class="clothes">
        <div class="clother_photo">
            <img src="${this.productImg}" alt="photo">
            <div class="ftr-product_hover">
                <button name="add" data-id="${this.productId}">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;Add to Cart
                </button>

            </div>
        </div>
        <div class="clothers-p">
            <a href="#" class="ftr-name">${this.productName}</a>
            <p class="ftr-price">&#36;&nbsp;${this.productPrice}</p>
        </div>
    </div>`
    }
}


class Catalog {
    constructor() {
        this.list = [];
    }
    fetchProductArr() {
        this.list = [{
                "productName": "MANGO PEOPLE T-SHIRT",
                "productPrice": 52,
                "productImg": "https://raw.githubusercontent.com/alishka242/static/master/IMG/fetured_1.jpg",
                "productId": "prod_0"
            },
            {
                "productName": "BANANA PEOPLE T-SHIRT",
                "productPrice": 53,
                "productImg": "https://raw.githubusercontent.com/alishka242/static/master/IMG/fetured_2.jpg",
                "productId": "prod_1"
            },
            {
                "productName": "STRAWBERRY PEOPLE T-SHIRT",
                "productPrice": 55,
                "productImg": "https://raw.githubusercontent.com/alishka242/static/master/IMG/fetured_3.jpg",
                "productId": "prod_2"
            },
            {
                "productName": "ORANGE PEOPLE T-SHIRT",
                "productPrice": 67,
                "productImg": "https://raw.githubusercontent.com/alishka242/static/master/IMG/fetured_4.jpg",
                "productId": "prod_3"
            },
            {
                "productName": "PUMKIN PEOPLE T-SHIRT",
                "productPrice": 69,
                "productImg": "https://raw.githubusercontent.com/alishka242/static/master/IMG/fetured_5.jpg",
                "productId": "prod_4"
            },
            {
                "productName": "PINEAPPLE PEOPLE T-SHIRT",
                "productPrice": 94,
                "productImg": "https://raw.githubusercontent.com/alishka242/static/master/IMG/fetured_6.jpg",
                "productId": "prod_5"
            },
            {
                "productName": "CUCUMBER PEOPLE T-SHIRT",
                "productPrice": 23,
                "productImg": "https://raw.githubusercontent.com/alishka242/static/master/IMG/fetured_7.jpg",
                "productId": "prod_6"
            },
            {
                "productName": "TOMATO PEOPLE T-SHIRT",
                "productPrice": 45,
                "productImg": "https://raw.githubusercontent.com/alishka242/static/master/IMG/fetured_8.jpg",
                "productId": "prod_7"
            }
        ]
    }
    render() {
        let template = '';
        this.list.forEach(i => {
            const listItem = new Card(i.productImg, i.productId, i.productName, i.productPrice);
            template += listItem.getTemplate();
        })
        document.querySelector('#catalog').innerHTML = template;
    }
    // как слушатель собития задавать в классах?
    // handelEvents() {
    //     this.container.addEventListener('click', event => {
    //         if (event.target.name == 'add') {
    //             // console.log('КУПЛЕНО!')
    //             let id = event.target.dataset.id; //from data-id
    //             let item = this.items.find(el => el.productId == id);
    //             this.basket.add(item);
    //         }
    //     });
    // },
}