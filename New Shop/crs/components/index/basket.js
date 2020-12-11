// function initBasket() {
//     const basket = {
//         items: [],
//         total: null,
//         url: 'https://raw.githubusercontent.com/alishka242/static/master/JSON/basket.json',
//         container: null, //basket_items
//         wrapper: null, //basket-all
//         sum: 0,
//         totalContainer: null,
//         init() {
//             this.container = document.querySelector('#basket_items');
//             this.wrapper = document.querySelector('#basket_inner');
//             this.totalContainer = document.querySelector('#basket_sum');

//             //async
//             this._get(this.url)
//                 .then(basket => {
//                     this.items = basket.content;
//                     this._render();
//                     this._handelEvents();
//                 });
//         },
//         _get(url) {
//             return fetch(url).then(d => d.json()); //сделает запрос за джейсоном, дождется ответа и преобразует джейсон в объект, который вернется из данного метода
//         },
//         _render() {
//             let htmlStr = '';

//             this.items.forEach((item, i) => {
//                 htmlStr += renderBasketTemplate(item, i);
//             });

//             this.container.innerHTML = htmlStr;
//             this._calcSum();
//         },
//         _calcSum() {
//             this.sum = 0;
//             this.items.forEach(item => {
//                 this.sum += item.amount * item.productPrice;
//             });
//             this.totalContainer.innerText = this.sum;
//         },
//         add(item) {
//             let find = this.items.find(el => item.productId == el.productId);

//             if (find) {
//                 find.amount++;
//             } else {
//                 this.items.push(Object.assign({}, item, {
//                     amount: 1
//                 }));
//             }

//             this._render();
//         },
//         _remove(id) {
//             let find = this.items.find(el => el.productId == id);

//             if (find.amount > 1) {
//                 find.amount--;
//             } else {
//                 this.items.splice(this.items.indexOf(find), 1);
//             }

//             this._render();
//         },
//         _handelEvents() {
//             // +++ организовать скрытие/показ корзины по клику а не по ховеру
//             document.querySelector('#basket-btn').addEventListener('click', e => {
//                 this.wrapper.classList.toggle('hidden');
//             });

//             this.container.addEventListener('click', event => {
//                 if (event.target.name == 'remove') {
//                     this._remove(event.target.dataset.id);
//                 }
//             });
//         },
//     };
//     return basket;
//     //basket.init();
// }

// function renderBasketTemplate(item, i) {
//     return `
//     <div class="selected-item">
//         <a href="#"><img src="${item.productImg}" alt="photo"></a>
//         <div>
//             <p><a href="#" class="item-name">${item.productName}</a></p>
//             <p class="item-stars">
//                 <a href="#">
//                     <i class="fa fa-star" aria-hidden="true"></i>
//                     <i class="fa fa-star" aria-hidden="true"></i>
//                     <i class="fa fa-star" aria-hidden="true"></i> 
//                     <i class="fa fa-star" aria-hidden="true"></i>
//                     <i class="fa fa-star-half-o" aria-hidden="true"></i>
//                 </a>
//             </p>
//             <p class="item-price">${item.amount} x &#36; ${item.productPrice}</p>
//         </div>
        
//         <a href="#" name="remove" class="fa fa-times-circle-o" data-id="${item.productId}"></a>
//     </div>
//     `
// }

//начинаю переводить все на классы
class Product {
    constructor(img, id, name, price, amount){
        this.productImg = img;
        this.productId = id;
        this.productName = name;
        this.productPrice = price;
        this.productAmout = amount;
    }
    getTemplate(){
        return `
        <div class="selected-item">
            <a href="#"><img src="${this.productImg}" alt="photo"></a>
            <div>
                <p><a href="#" class="item-name">${this.productName}</a></p>
                <p class="item-stars">
                    <a href="#">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i> 
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star-half-o" aria-hidden="true"></i>
                    </a>
                </p>
                <p class="item-price">${this.amount} x &#36; ${this.productPrice}</p>
            </div>
            
            <a href="#" name="remove" class="fa fa-times-circle-o" data-id="${this.productId}"></a>
        </div>
        `
    }
}

class Basket {
    constructor(){
        this.productArray = [];
    }
    fetchProductArr(){
        const Url = 'https://raw.githubusercontent.com/alishka242/static/master/JSON/basket.json';
        return fetch(Url)
            .then((r) => r.json())
            .then((r) => {this.productArray = r.content;
            })
            .catch(() => {return null;})
    }
    render(){
        const template = this.productArray
            .map((i) => new Product(i.productImg, i.productId, i.productName, i.productPrice, i.amount).getTemplate())
            .join("");
        document.querySelector('#basket_items').innerHTML = template;

    }
}