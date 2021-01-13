class Card {
    constructor(name, price, img, id) {
        this.productImg = img;
        this.productId = id;
        this.productName = name;
        this.productPrice = price;
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
        this.catalog = [];
    }

    fetchProductArr() {
        const BASE_URL = "https://raw.githubusercontent.com/alishka242/static/master/JSON/catalog.json";

        return fetch(`${BASE_URL}`)
            .then((r) => r.json())
            .then((r) => {
                this.catalog = r;
            })
            .catch(() => {
                return null;
            });
    }

    render() {
        const template = this.catalog
            .map((i) => new Card(i.productName, i.productPrice, i.productImg, i.productId).getTemplate())
            .join("");
        document.querySelector('#catalog').innerHTML = template;
    }

    _handelEvents(eventTargetName, eventId) {
        if (eventTargetName === 'add' || eventTargetName === 'plus' || eventTargetName === 'delete') {
            this.catalog.forEach((elem) => {
                if (eventId === elem.productId) {
                    basket.renderItem(elem, eventTargetName);
                }
            });
        }
    }
}

class Serch extends Catalog {
    constructor() {
        super();
    }

    getTemplateSerch(name, url, price) {
        return `<div id="serchItem">
        <a href="${url}" target="_blank">${name}</a>
        <p>$${price}</p>
        </div> 
        `
    }
    renderSerch(serchStr = "") {
        const list = this.catalog
            .filter((i) => {
                const serchRegex = new RegExp(serchStr, 'i');
                if (serchRegex.test(i.productName)) {
                    return true;
                } else {
                    return false;
                }
            })
            .map(i => this.getTemplateSerch(i.productName, i.productImg, i.productPrice))
            .join("");
        document.querySelector('#serchDropId').innerHTML = list;
    }
}

class BasketItem extends Card {
    constructor(name, price, img, id, amount) {
        super(name, price, img, id);
        this.productAmout = amount;
    }
    getTemplateItem() {
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
                <p class="item-price">${this.productAmout} x &#36; ${this.productPrice}</p>
            </div>
            <button name="delete" class="fa fa-times-circle-o" data-id="${this.productId}"></button>
        </div>
        `
    }
}

class Basket {
    constructor() {
        this.orderList = [];
        this.container = '';
    }

    getTemplateTotal(sum) {
        return `
        <p>TOTAL</p>
        <p> &#36; <span id="basket_sum">${sum}</span></p>
        `
    }

    renderItem(elem, eventTargetName) {
        let isResult = true;

        this.orderList.some((basketObj, index) => {
            if (elem.productId === basketObj.productId) {
                /*  **Меняет кол-во товара** */

                if (eventTargetName === 'add' || eventTargetName === 'plus') {
                    basketObj.productAmout += 1;
                } else {
                    if (basketObj.productAmout > 1) {
                        basketObj.productAmout -= 1;
                    } else {
                        this.orderList.splice(index, 1);
                    }
                }
                this.container = '';
                isResult = false;
            }
        });

        if (isResult) {
            const basketItem = new BasketItem(elem.productName, elem.productPrice, elem.productImg, elem.productId, elem.amount = 1);
            this.orderList.push(basketItem);
            this.container = '';
        }
        this.sum = 0;
        this.orderList.forEach(obj => {
            this.container += obj.getTemplateItem();
            this.sum += obj.productAmout * obj.productPrice;

        });

        if (!this.orderList.length) {
            this.container = '';
            document.querySelector(`#basket_items`).innerHTML = '';
        } else {
            document.querySelector(`#basket_items`).innerHTML = this.container;
        }
        document.querySelector('#total').innerHTML = this.getTemplateTotal(this.sum);
    }

}

let basket = new Basket();
document.querySelector('#total').innerHTML = basket.getTemplateTotal(0);

let catalog = new Catalog();
catalog.fetchProductArr().then(() => catalog.render());

const serchItem = new Serch();
serchItem.fetchProductArr().then(() => serchItem.renderSerch());

const serchInput = document.getElementById('serch-input');

const handleSerch = (value) => {
    serchItem.renderSerch(value);
}

serchInput.addEventListener('input', (e) => {
    handleSerch(e.target.value);

});

document.addEventListener('click', (event) => {
    let btnTargetName = event.target.name;
    const serchDrop = document.querySelector('#serchDropId');
    const wrapperBasket = document.querySelector('#basket_inner');
    let btnDatasetId = '';
    //btnTargetName === 'plus' - оставляю на случай, когда мы будем увеличивать кол-во товара прямо в корзине
    if (btnTargetName === 'add' || btnTargetName === 'plus' || btnTargetName === 'delete') {
        btnDatasetId = event.target.dataset.id;
    } else if (event.target.id == 'serch-input' || event.target.id == 'serchDropId'  || event.target.id == 'serchItem') {
        serchDrop.classList.toggle('serchClosed');
    } else if(event.target.id == 'basket-btn'){
        wrapperBasket.classList.toggle('hidden');
    }else if (event.target.id != 'serch-input' && event.target.id != 'serchDropId' && event.target.id != '#basket_inner') {
        serchDrop.classList.add('serchClosed');
        wrapperBasket.classList.add('hidden');
    }
    console.log(event.target.id)
    catalog._handelEvents(btnTargetName, btnDatasetId);
});