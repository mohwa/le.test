/**
 * Created by mohwa on 2018. 5. 29..
 */

const domUtil = require('../common/domUtil');

const cardTemplate = require('./templates/card.html');

const className = {
    "cardName": "card-name"
};

/**
 * Card 클래스
 */
class Card{

    constructor({
        id = '',
        name = '',
        age = 0,
        photo = ''
    } = {}){

        this.id = id;
        this.name = name;
        this.age = age;
        this.photo = photo;
    }

    /**
     *
     * 카드를 화면에 그린다.
     *
     * @param elem
     * @returns {Card}
     */
    render(elem = null){

        const id = this.id;
        const name = this.name;
        const age = this.age;
        const photo = this.photo;

        const div = domUtil.el('div', {innerHTML: cardTemplate});

        const cardInfo = div.firstChild;
        const img = domUtil.sel('img', cardInfo);
        const cardName = domUtil.sel(`.${className.cardName}`, cardInfo);
        const cardNameText = `${name}(${age})`;

        domUtil.attr(cardInfo, 'title', cardNameText);

        domUtil.attr(img, {
            "src": photo,
            "alt": `${name} 사진 입니다.`
        });

        domUtil.prop(cardName, 'innerText', cardNameText);

        domUtil.prop(elem, 'innerHTML', domUtil.prop(div, 'innerHTML'));

        return this;
    }
}

module.exports = Card;

  
