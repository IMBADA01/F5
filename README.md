# F5 — 같은 파일이 있습니다.

**흔적의 도시** 하이퍼서사 프로젝트 (Twine / SugarCube)

## 실행 방법

- `index.html`은 `parts/f5-01.txt`부터 `parts/f5-13.txt`까지 순서대로 읽어서 원본 HTML을 재구성합니다.
- 브라우저에서 `index.html`을 파일로 직접 열면 fetch 제한 때문에 동작하지 않을 수 있습니다. **GitHub Pages 같은 정적 웹 서버에서 실행**하세요.
- 분할 파일의 이름/순서/내용은 바꾸지 마세요. 13개 파일 전체가 있어야 작동합니다.

## GitHub Pages 배포

1. Repository **Settings → Pages**로 이동합니다.
2. **Build and deployment**의 Source를 **Deploy from a branch**로 선택합니다.
3. Branch를 **main**, 폴더를 **/(root)**로 선택한 뒤 저장합니다.
4. Pages가 게시된 뒤 주소에서 작품을 열어 확인합니다.

> 저장소가 Private이라면 계정/요금제의 GitHub Pages 공개 및 접근 지원 여부를 확인하세요. 공개 저장소로 전환하기 전에는 작품에 포함된 코드와 이미지에 공개해도 되는 자료만 있는지 점검하세요.

## 구성

- `index.html`: 분할된 Twine HTML 파일을 로딩하는 웹 진입점
- `parts/f5-01.txt` ~ `parts/f5-13.txt`: 기존 작품의 분할 원본
