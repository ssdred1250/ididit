# ididit-backend
## 의존성 모듈 설치
```
yarn
```
## 실행
```
yarn start
```
## 경로 추가 방법
`/src/routes` 폴더에 js파일을 추가한 후 Router를 이용해 개발해주세요. 그 후 `module.exports`에
```
{router: 사용한 Express Router, path: Router를 연결할 URL}
```
을 넘겨주세요. 자세한 사항은 `/src/routes/exmaple.js`를 참고해주세요.