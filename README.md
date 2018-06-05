# [이상형 토너먼트 앱](https://github.com/mohwa/le.test)

자신의 이상형을 알아보기 위한 `이상형 토너먼트앱`입니다.

## 설치하기

```
npm i
```

## 시작하기

```
npm run start
```

## 테스트 실행

```
npm run test
```

## 실행 예제 및 API

```
// 남성 유저로 토너먼트를 시작한다.
new Lezhin.Tournament({
	user: new Lezhin.User({id: 1, name: '전성균', sex: 'male'})
}).init();

// 여성 유저로 토너먼트를 시작한다.
new Lezhin.Tournament({
	user: new Lezhin.User({id: 2, name: '이나영', sex: 'female'})
}).init();
```

|Name|Types|Description|
|:--:|:-----:|:----------|
|`user`|`{Object}`|사용자 객체를 정의한다.|
|`roundNum`|`{Number}`|시작 라운드를 정의한다.|

## 데모 페이지
[https://mohwa.github.io/le.test/](https://mohwa.github.io/le.test/)

