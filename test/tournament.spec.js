
const Tournament = require('../src/js/tournament');

const User = require('../src/js/model/user');

const $ = require('jquery');
const chai = require('chai');

const expect = chai.expect;

// 이 부분을 추가 export 영역으로 둘지는 좀더 생각해봐야겠다.
const className = {
    "tournament": "tournament",
    "cardInfo": "card-info",
    "cardItem1": "card-item1",
    "cardItem2": "card-item2",
    "btnPrevRound": "btn-prev-round"
};

describe('Tournament.js', () => {

    const $body = $(document.body);
    let instance = null;

    // before hook 은 describe 단위로 실행된다.
    // beforeEach 는 it 단위로 실행된다.
    before(() => {
    });

    beforeEach(() => {
    });

    afterEach(() => {
        $body.html('');
    });

    describe('초기화 테스트', () => {

        it('사용자는 자신의 이상형을 알아보기 위해 이상형 토너먼트에 참여할 수 있다.', () => {

            // given
            instance = new Tournament({
                user: new User({id: 1, name: '전성균', sex: 'male'})
            });

            // when
            instance.init();

            // then
            expect($body.find(`.${className.tournament}`).length).to.equal(1);
        });

        it('사용자는 현재 대전 중인 이상형을 알 수 있다', () => {

            // given
            instance = new Tournament({
                user: new User({id: 1, name: '전성균', sex: 'male'})
            });

            // when
            instance.init();

            const cards = instance._getFullCards();

            const cardItem1 = cards[0];
            const cardItem2 = cards[1];

            instance._addCards(cardItem1, cardItem2);

            const $cardInfos = $body.find(`.${className.cardInfo}`);

            const cardImg1 = $($cardInfos.get(0)).find('img').get(0);
            const cardImg2 = $($cardInfos.get(1)).find('img').get(0);

            const ret = (cardItem1.photo === cardImg1.src) && (cardItem2.photo === cardImg2.src);

            // then
            expect(ret).to.equal(true);
        });

        it('토너먼트는16, 32와 같이 짝수로 구성되며 부전승은 없다.', () => {

            // given
            instance = new Tournament({
                user: new User({id: 1, name: '전성균', sex: 'male'})
            });

            // when
            // 16 강일 경우
            const test1 = instance._isPossibleUnearnedWin(16);
            // 24 강일 경우(부전승 가능)
            const test2 = instance._isPossibleUnearnedWin(24);

            const ret = test1 === true && test2 === false;

            // then
            expect(ret).to.equal(true);
        });
    });

    describe('게임 플레이 테스트', () => {

        it('사용자는 대전 중인 이상형 중 마음에 드는 쪽을 선택할 수 있다.(왼쪽 카드 선택)', () => {

            // given
            const roundNum = 16;
            const nextRoundNum = roundNum / 2;
            instance = new Tournament({
                user: new User({id: 1, name: '전성균', sex: 'male'}),
                roundNum: roundNum
            });

            // when
            instance.init();

            const $cardElem = $body.find(`.${className.cardItem1}`);
            const $img = $cardElem.find('img');

            // 선택할 왼쪽 카드 아이디
            const cardId = $cardElem.get(0).cardItem.id;

            // 왼쪽 카드를 선택한다.
            $img.get(0).click();

            // 선택된 왼쪽 카드
            const card = instance._cardViewModel.getCards(nextRoundNum, cardId);

            // then
            // 카드 진행이 완료되었는지 체크한다.
            expect(cardId === card.id).to.equal(true);
        });

        it('사용자는 대전 중인 이상형 중 마음에 드는 쪽을 선택할 수 있다.(오른쪽 카드 선택)', () => {

            // given
            const roundNum = 16;
            const nextRoundNum = roundNum / 2;

            instance = new Tournament({
                user: new User({id: 1, name: '전성균', sex: 'male'}),
                roundNum: roundNum
            });

            // when
            instance.init();

            const $cardElem = $body.find(`.${className.cardItem2}`);
            const $img = $cardElem.find('img');

            // 선택할 오른쪽 카드 아이디
            const cardId = $cardElem.get(0).cardItem.id;

            // 오른쪽 카드를 선택한다.
            $img.get(0).click();

            // 선택된 오른쪽 카드
            const card = instance._cardViewModel.getCards(nextRoundNum, cardId);

            // then
            // 카드 진행이 완료되었는지 체크한다.
            expect(cardId === card.id).to.equal(true);
        });

        it('만약 16강이라면 16강 > 8강 > 4강 > 2강 > 최종 이상형 순으로 게임이 이뤄진다.(2강 > 최종 이상형)', () => {

            // given
            const roundNum = 2;
            const nextRoundNum = roundNum / 2;

            instance = new Tournament({
                user: new User({id: 1, name: '전성균', sex: 'male'}),
                roundNum: roundNum
            });

            // when
            instance.init();

            const $cardElem = $body.find(`.${className.cardItem1}`);
            const $img = $cardElem.find('img');

            // 카드를 선택한다.
            $img.get(0).click();

            // then
            // (최종 우승자)카드의 자식 아이템 수가, 현재 라운드 수와 같을 경우(다음 라운드로 전환이 되었다는 뜻이다)
            expect(instance._currentRoundNum === nextRoundNum).to.equal(true);
        });

        it('1번이라도 이상형을 선택했 을 때만 취소할 수 있다.', () => {

            // given
            const roundNum = 8;

            instance = new Tournament({
                user: new User({id: 1, name: '전성균', sex: 'male'}),
                roundNum: roundNum
            });

            // when
            instance.init();

            const $cardElem = $body.find(`.${className.cardItem1}`);
            const $img = $cardElem.find('img');

            // 카드를 선택한다.(이상형을 선택한다)
            $img.get(0).click();

            // 테스트를 위해, 전체 라운드를 현재 라운드보다 크게 변경시킨다.
            instance._totalRoundNum = 16;

            instance._createPrevRoundButton();

            const $btnPrevRound = $body.find(`.${className.btnPrevRound}`);

            // then
            // "이전 라운드로 돌아가기" 버튼이 활성화 되어있을 경우
            expect($btnPrevRound.css('display') === 'block').to.equal(true);
        });
    });
});
  
