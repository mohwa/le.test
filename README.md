# [이상형 토너먼트 앱](https://github.com/mohwa/le.test)

## 의존성 모듈 설치하기

```
npm i
```

## 데모보기

```
npm run start
```

## 테스트 실행하기

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
