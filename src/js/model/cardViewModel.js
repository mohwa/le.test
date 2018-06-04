
const util = require('../common/util');
const type = require('../common/type');

// 카드 데이터
const data = require('../../data/card.json');

/**
 * CardViewModel 클래스
 */
class CardViewModel{

    constructor(){
        this.selectedCards = [];
    }
    /**
     *
     * 성별이 남자인 카드 아이템 집합을 반환한다.
     *
     * @returns {Array}
     */
    getMaleCards(){

        const ret = [];

        util.map(data, v => {
            if (v.sex === 'male'){
                ret.push(v);
            }
        });

        return ret;
    }

    /**
     *
     * 성별이 여자인 카드 아이템 집합을 반환한다.
     *
     * @returns {Array}
     */
    getFemaleCards(){

        const ret = [];

        util.map(data, v => {
            if (v.sex === 'female'){
                ret.push(v);
            }
        });

        return ret;
    }

    /**
     *
     * 카드 아이템 집합을 초기화한다.
     *
     * @param roundNum
     * @param children
     * @returns {CardViewModel}
     */
    initCards(roundNum = 0, children = []){

        children = util.cloneDeep(children);

        util.map(children, v => {

            v.roundNum = roundNum;

            v.parent = null;
            v.children = [];

            v.completed = false;

            this.selectedCards.push(v);
        });

        return this;
    }

    /**
     *
     * 전달받은 라운드에, (부모/자식)카드 아이템들을 추가한다.
     *
     * @param roundNum
     * @param parent
     * @param children
     * @returns {CardViewModel}
     */
    addCards(roundNum = 0, parent = {}, children = []){

        parent = util.cloneDeep(parent);
        children = util.cloneDeep(children);

        const selectedCards = this.selectedCards;

        // 다음 라운드
        const nextRoundNum = roundNum / 2;

        parent.roundNum = nextRoundNum;
        parent.children = [];

        selectedCards.push(parent);

        // 저장된 카드를, (부모 노드를 통한)계층형 구조로 다시 정리한다.
        util.map(children, v => {

            util.map(selectedCards, (vv, idx) => {

                // 저장된 라운드와 아이디 정보가 동일한 경우
                if (v.roundNum === vv.roundNum && v.id === vv.id){

                    selectedCards.splice(idx, 1);

                    vv.parent = parent;
                    vv.completed = true;

                    parent.children.push(vv);
                }
            });
        });

        return this;
    }

    /**
     *
     * 전달받은 라운드의 카드 아이템을 반환한다.
     *
     * @param roundNum
     * @param cardId
     * @returns {Array}
     */
    getCards(roundNum = 0, cardId = ''){

        let ret = [];

        const stack = util.cloneDeep(this.selectedCards);
        let card = null;

        if (!type.isEmpty(roundNum)){

            // 카드 아이디를 전달받았을 경우
            const hasCardId = !type.isEmpty(cardId);

            while (card = stack.shift()){

                if (hasCardId){

                    if (roundNum === card.roundNum && cardId == card.id){
                        ret = card;
                        break;
                    }
                }
                else{
                    if (roundNum === card.roundNum){
                        ret[card.sequence] = card;
                    }
                }

                const length = card.children && card.children.length ? card.children.length : 0;

                for (let i = 0; i < length; i++){
                    stack.push(card.children[i]);
                }
            }
        }
        else{
            ret = this.selectedCards;
        }

        return ret;
    }

    /**
     *
     * 전달받은 카드들을 섞은 후, 시퀀스 정보를 추가시킨다.
     *
     * @param cards
     * @returns {*}
     */
    shuffleCards(cards = []){

        let ret = util.shuffle(cards);

        const length = cards.length;

        // 데이터가 새롭게 가공된 이후(계층 구조), 라운드별로 정렬하기위해 미리 "sequence" 속성(배열이 갖는 초기 인덱스 번호)을 추가시켜놓는다.
        for (let i = 0; i < length; i++) {
            ret[i].sequence = i;
        }

        return ret;
    }

    /**
     *
     * 전달받은 라운드에서 선택된 카드 수를 반환한다.
     *
     * @param roundNum
     * @returns {number}
     */
    completedCardCount(roundNum = 0){

        let ret = 0;

        const stack = util.cloneDeep(this.selectedCards);
        let card = null;

        while (card = stack.shift()){

            if (roundNum === card.roundNum && card.completed){
                ++ret;
            }

            const length = card.children && card.children.length ? card.children.length : 0;

            for (let i = 0; i < length; i++){
                stack.push(card.children[i]);
            }
        }

        return ret;
    }
}

module.exports = CardViewModel;

  
