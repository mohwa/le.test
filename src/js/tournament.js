

const domUtil = require('./common/domUtil');
const util = require('./common/util');
const type = require('./common/type');

const tournamentTemplate = require('./view/templates/tournament.html');
const winnerTemplate = require('./view/templates/winner.html');

const Card = require('./view/card');
const cardViewModel = require('./model/cardViewModel');

const className = {
    "round": "round",
    "cardItem1": "card-item1",
    "cardItem2": "card-item2",
    "cardInfo": "card-info",
    "stage": "stage",
    "winner": "winner",
    "btnResult": "btn-result",
    "btnPrevRound": "btn-prev-round",
    "history": "history",
    "stadium": "stadium",
    "childInfo": "child-info",
    "userName": "user-name",
    "roundNum": "round-num"
};

const msg = {
    "notEnoughCardData": "전달받은 데이터가 부족합니다.",
    "possibleUnearnedWin": "설정한 라운드 크기는 부전승이 나올 수 있습니다."
};

const text = {
    "lastWinner": "당신의 이상형 입니다.",
    "resultHistory": "결과 보기"
};

/**
 * 토너먼트 클래스
 */
class Tournament{

    constructor({
        user = null,
        roundNum = 16
    } = {}){

        // 유저 정보
        this._user = user;

        // 전체 라운드
        this._totalRoundNum = roundNum;

        // board 엘리먼트
        this._tournament = null;

        // round 엘리먼트
        this._round = null;

        // 현재 라운드
        this._currentRoundNum = roundNum;

        // 전달받은 라운드가 부전승이 나올 수 있는지 체크한다.
        if (!this._isPossibleUnearnedWin(roundNum)){
            throw new Error(msg.possibleUnearnedWin);
        }

        // 토너먼트에서 사용될 전체 카드를 가져온다.
        const cards = this._getFullCards();

        // 초기화된 카드들을 다시 섞는다.
        this._shuffleCards(cardViewModel.initCards(roundNum, cards));

        // 라운드 전환을 위해 사용되는 현재 진행중인 카드 수
        this._currentCardCount = cards.length;
    }

    /**
     *
     * 토너먼트를 초기화한다.
     */
    init(){

        this._render();

        const cards = cardViewModel.getCards(this._totalRoundNum);

        this._addCards(cards[0], cards[1]);
        this._addCardEvent();
    }

    /**
     *
     * 토너먼트를 화면에 그린다.
     *
     * @private
     */
    _render(){

        const tournament = this._tournament = domUtil.el('div', {"innerHTML": tournamentTemplate}).firstChild;
        this._round = domUtil.sel(`.${className.round}`, tournament);

        domUtil.append(document.body, tournament);

        this._setRoundNumText();
        this._setStadiumTitle();
    }

    /**
     *
     * 토너먼트에서 사용될 전체 카드를 반환한다.
     *
     * @returns {*}
     * @private
     */
    _getFullCards(){

        const user = this._user;
        const totalRoundNum = this._totalRoundNum;

        const cards = user.sex === 'male' ? cardViewModel.getFemaleCards() : cardViewModel.getMaleCards();

        // 카드 데이터가, 설정된 라운드 수보다 작을 경우
        if (cards.length < totalRoundNum){
            throw new Error(msg.notEnoughCardData);
        }

        return cards.slice(0, totalRoundNum);
    }

    /**
     * 이상형 카드를 화면에 표시한다.
     *
     * @param cardItem1
     * @param cardItem2
     * @private
     */
    _addCards(cardItem1 = null, cardItem2 = null){

        const tournament = this._tournament;

        const cardItem1Elem = domUtil.sel(`.${className.cardItem1}`, tournament);
        const cardItem2Elem = domUtil.sel(`.${className.cardItem2}`, tournament);

        // 아이템 정보를 엘리먼트에 추가시킨다.
        cardItem1Elem.cardItem = cardItem1;
        cardItem2Elem.cardItem = cardItem2;

        // 이상형 카드를 생성한다.
        new Card(cardItem1).render(cardItem1Elem);
        new Card(cardItem2).render(cardItem2Elem);
    }

    /**
     *
     * 이상형 카드에 이벤트를 추가시킨다.
     *
     * @private
     */
    _addCardEvent(){

        const tournament = this._tournament;

        const cardItem1Elem = domUtil.sel(`.${className.cardItem1}`, tournament);
        const cardItem2Elem = domUtil.sel(`.${className.cardItem2}`, tournament);

        // 이벤트 바인딩
        domUtil.prop(cardItem1Elem, 'addEventListener', ['click', _click.bind(this)]);
        domUtil.prop(cardItem2Elem, 'addEventListener', ['click', _click.bind(this)]);

        function _click(e){

            const cardInfo = domUtil.sel(`.${className.cardInfo}`, tournament);
            const selectedCardElem = domUtil.parent(cardInfo)[0];

            // 첫번째 카드 아이템
            const card1Item = cardItem1Elem.cardItem;
            // 두번째 카드 아이템
            const card2Item = cardItem2Elem.cardItem;

            // 선택된 카드 아이템
            const selectedCardItem = selectedCardElem.cardItem;

            // 현재 라운드 수
            let currentRoundNum = this._currentRoundNum;
            // 다음 라운드 수
            const nextRoundNum = currentRoundNum / 2;

            let cards = [];

            // 저장된 카드 아이템 목록에서, 선택된 카드 아이템을 가져온다.
            let storedCard2Item = cardViewModel.getCards(currentRoundNum, card2Item.id);

            // 선택된 카드 아이템이, 이미 진행이 완료되었을 경우
            if (storedCard2Item.completed){

                // 마지막 카드 데이터의 인덱스 번호
                let lastCardSequence = -1;

                // 진행중인 카드 수가, 다음 라운드 수와 같을 경우(라운드 전환 시점)
                if (nextRoundNum === --this._currentCardCount){

                    currentRoundNum = this._currentRoundNum = this._currentCardCount;

                    this._setRoundNumText();
                    this._createPrevRoundButton();
                }
                else{
                    lastCardSequence = storedCard2Item.sequence;
                }

                cards = cardViewModel.getCards(currentRoundNum);

                // 다음 이상형 카드들을 화면에 추가시킨다.
                this._addCards(cards[++lastCardSequence], cards[++lastCardSequence]);
            }
            else{

                // 진행된 카드 아이템을, 모델에 추가시킨다.
                const selectedCards = cardViewModel.addCards(currentRoundNum, selectedCardItem, [card1Item, card2Item]);

                if (currentRoundNum > 2){

                    // 진행중인 카드 수가, 다음 라운드 수와 같을 경우(라운드 전환 시점)
                    if (nextRoundNum === --this._currentCardCount){

                        // 현재 나머지 카드 수가 다음 강이 된다.
                        currentRoundNum = this._currentRoundNum = this._currentCardCount;

                        // 선택된 라운드 카드들을 다시 섞는다.
                        // 조건 "강 전환 시 이상형의 순서는 랜덤으로 섞인다."
                        this._shuffleCards(selectedCards);
                        this._setRoundNumText();
                    }

                    cards = cardViewModel.getCards(currentRoundNum);

                    let completedCardCount = cardViewModel.completedCardCount(currentRoundNum);

                    // 새로운 카드를 추가한다.
                    this._addCards(cards[completedCardCount], cards[++completedCardCount]);
                    this._createPrevRoundButton();
                }
                else{

                    domUtil.prop(this._round, 'innerText', text.lastWinner);

                    // winner 템플릿을 생성한다.
                    this._createWinnerTemplate(selectedCardItem);
                }
            }
        }
    }

    /**
     *
     * 전달받은 카드들을 섞은 후, 시퀀스 정보를 추가시킨다.
     *
     *
     * @returns {*}
     * @private
     */
    _shuffleCards(cards = []){

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
     * 타이틀 정보를 화면에 표시한다.
     *
     * @private
     */
    _setStadiumTitle(){

        const tournament = this._tournament;
        const user = this._user;
        const userName = domUtil.sel(`.${className.userName}`, tournament);

        domUtil.prop(userName, {innerText: user.name});
    }

    /**
     *
     * 현재 라운드 정보를 화면에 표시한다.
     *
     * @private
     */
    _setRoundNumText(){
        domUtil.prop(this._round, {innerText: `${this._currentRoundNum}강`});
    }

    /**
     *
     * 이전 라운드로 돌아가는 버튼을 생성한다.
     *
     * @private
     */
    _createPrevRoundButton(){

        const tournament = this._tournament;
        const btnPrevRound = domUtil.sel(`.${className.btnPrevRound}`, tournament);
        const button = domUtil.sel('button', btnPrevRound);

        const currentRoundNum = this._currentRoundNum;
        const prevRoundNum = currentRoundNum * 2;
        const totalRoundNum = this._totalRoundNum;

        // 진행중인 라운드에 완료된 카드가 존재할 경우
        const hasCompletedCard = this._hasCompletedCard(currentRoundNum);

        // 진행중인 라운드가 전체 라운드 수보다 작으면서, 완료된 카드가 존재할 경우
        if (currentRoundNum < totalRoundNum && hasCompletedCard){

            domUtil.prop(btnPrevRound, '@display', 'block');

            btnPrevRound.onclick = _returnPrevRound.bind(this);
        }
        else{
            domUtil.prop(btnPrevRound, '@display', 'none');
        }

        domUtil.prop(button, 'innerText', `${prevRoundNum}강으로 돌아가기`);

        /**
         *
         * 이전 라운드로 돌아간다.
         *
         * @param e
         * @private
         */
        function _returnPrevRound(e){

            // 이전 라운드
            const prevRoundNum = this._currentRoundNum * 2;

            if (prevRoundNum <= totalRoundNum){

                // 현재 라운드 및 진행중인 카드 수를 초기화 시킨다.
                this._currentRoundNum = prevRoundNum;
                this._currentCardCount = prevRoundNum;

                const cards = cardViewModel.getCards(prevRoundNum);

                // 이전 라운드의 첫번째, 두번째 카드로 초기화시킨다.
                this._addCards(cards[0], cards[1]);
                this._setRoundNumText();

                domUtil.prop(button, 'innerText', `${(prevRoundNum * 2)}강으로 돌아가기`);

                if (prevRoundNum === totalRoundNum){
                    domUtil.prop(btnPrevRound, '@display', 'none');
                }
            }
        }
    }
    /**
     *
     * 최종 우승자 템플릿을 생성한다.
     *
     * @param cardItem
     * @private
     */
    _createWinnerTemplate(cardItem = null){

        const tournament = this._tournament;
        const selectedCards = cardViewModel.getCards();

        const stage = domUtil.sel(`.${className.stage}`, tournament);

        domUtil.prop(stage, 'innerHTML', winnerTemplate);

        new Card(cardItem).render(domUtil.sel(`.${className.winner}`, stage));

        domUtil.sel('button', stage).onclick = e => {
            this._createHistoryTemplate(selectedCards);
        };
    }

    /**
     *
     * 히스토리(진행 결과) 템플릿을 생성한다.
     *
     * @param cards
     * @private
     */
    _createHistoryTemplate(cards = []){

        const tournament = this._tournament;
        const totalRoundNum = this._totalRoundNum;

        const stadium = domUtil.sel(`.${className.stadium}`, tournament);
        const stage = domUtil.sel(`.${className.stage}`, stadium);
        const btnPrevRound = domUtil.sel(`.${className.btnPrevRound}`, stadium);

        // 엘리먼트를 삭제한다.
        domUtil.remove(stage);
        domUtil.remove(btnPrevRound);

        domUtil.prop(this._round, 'innerText', text.resultHistory);

        let html = this._getTournamentBracketHTML(cards);
        html = `<div class="${className.history}">${html.join('')}</div>`;

        domUtil.append(stadium, domUtil.el('div', {'innerHTML': html}).firstChild);

        const history = domUtil.sel(`.${className.history}`, stadium);
        const childInfo = domUtil.sel(`.${className.childInfo}`, history);
        const historyMinWidth = domUtil.outerWidth(childInfo, true) * totalRoundNum;

        // 뷰포트 가로 사이즈가, 히스토리 가로 사이즈보다 작을 경우
        if (window.innerWidth > historyMinWidth){

            domUtil.prop(history, 'style', `min-width:${historyMinWidth}px;`);}
        else{

            // 축소할 퍼센트를 구한다.
            const zoomPercent = parseInt(((window.innerWidth - 1) / historyMinWidth) * 100);
            domUtil.prop(history, 'style', `min-width:${historyMinWidth}px;zoom:${zoomPercent}%`);
        }
    }
    /**
     *
     * 히스토리(진행 결과)를 생성한다.
     *
     * @param cards
     * @param ret
     * @returns {*}
     * @private
     */
    _getTournamentBracketHTML(cards = [], ret = null){

        ret = ret || [];

        cards.forEach(v => {

            const photo = v.photo;
            const name = v.name;

            if (v.children.length){

                ret.push('<div class="parent">');
                ret.push('<div class="parent-info">');
                ret.push(`<img src="${photo}" />`);
                ret.push(`<div class="card-name">${name}</div>`);
                ret.push('</div>');
                ret.push('<div class="line1"></div>');
                ret.push('<div class="line2"></div>');

                ret.push('<div class="child">');
                ret.push(this._getTournamentBracketHTML(v.children, ret));
                ret.push('</div>');
                ret.push('</div>');
            }
            else{

                ret.push('<div class="child-info">');
                ret.push(`<img src="${photo}" />`);
                ret.push(`<div class="card-name">${name}</div>`);
                ret.push('</div>');
            }
        });

        return ret;
    }

    /**
     *
     * 전달받은 라운드에 완료된 카드가 존재하는지 유무를 반환한다.
     *
     * @param roundNum
     * @returns {boolean}
     * @private
     */
    _hasCompletedCard(roundNum = 0){
        return cardViewModel.completedCardCount(roundNum) ? true : false;
    }

    /**
     *
     * 전달받은 라운드로 부전승이 나올 수 있는지 여부를 반환한다.
     *
     * @param roundNum
     * @returns {boolean}
     * @private
     */
    _isPossibleUnearnedWin(roundNum = 0){

        let i = roundNum;
        let ret = true;

        while (i > 1){

            if (i % 2){
                ret = false;
                break;
            }

            i = parseInt(i / 2);
        }

        return ret;
    }
}

module.exports = Tournament;

  
