window.patchF5Story = function(html) {
 const escapeHTML = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 const unit = (name,id,body) => '<tw-passagedata name="'+name+'" pid="'+id+'" position="'+(1100+id*115)+',350" size="100,100" tags="">'+escapeHTML(body)+'</tw-passagedata>';

 // Repair the incomplete original export: its last PassageHeader image ends mid-base64.
 // The first four complete passages are retained; only the unfinished header is replaced.
 if(!html.includes('</tw-storydata>')) {
   const headerAt=html.indexOf('<tw-passagedata name="PassageHeader"');
   if(headerAt<0) throw Error('Cannot recover incomplete Twine export: PassageHeader missing');
   const replacementHeader=unit('PassageHeader',5,'<div class="city-site-top"><div class="city-brand">하이퍼서사 〈흔적의 도시〉</div><div class="city-banner-text"><div class="f5-skyline" aria-hidden="true"></div><div class="f5-banner-copy"><small>흔적의 도시</small><h2>F5 : 같은 파일이 있습니다.</h2></div></div></div>');
   html=html.slice(0,headerAt)+replacementHeader+'</tw-storydata></body></html>';
 }
 function change(name,fn) {
   const before='<tw-passagedata name="'+name+'"';
   let start=html.indexOf(before);if(start<0)throw Error('Missing passage '+name);
   start=html.indexOf('>',start)+1;
   const end=html.indexOf('</tw-passagedata>',start);
   html=html.slice(0,start)+fn(html.slice(start,end))+html.slice(end);
 }
 change('계속되는 알람음',s=>s.replace(/&lt;div class="intro-choices"&gt;[\s\S]*?&lt;\/div&gt;\s*&lt;\/div&gt;\s*&lt;\/div&gt;/,'&lt;div class="intro-choices f5-single-next"&gt;[[다음 이야기-&gt;6rmo7KeQ]]&lt;/div&gt;'));
 change('F5 : 같은 파일이 있습니다.',s=>s.replace(/&lt;div class="f5-title-footnote"&gt;[\s\S]*?&lt;\/div&gt;/,''));
 change('6rmo7KeQ',s=>s+escapeHTML('\n<div class="f5-story-next">[[다음 이야기->이67OA]]</div>'));
 change('나방 발생',s=>s+escapeHTML('\n<div class="f5-story-next">[[다음 이야기->100가지 이상을 아시나요]]</div>'));
 const newUnits=[
 unit('이67OA',6,'<div class="f5-added"><p>방금 그 문자 뭐야?</p><div class="f5-chat-phone"><div class="f5-chat-header">‹　 지아　 ⋮</div><div id="f5-jia-messages" class="f5-chat-messages" aria-live="polite"></div><div class="f5-chat-bottom">＋　 <span class="f5-chat-input"></span>　☰</div></div><button type="button" id="f5-jia-next" class="f5-chat-next">화면을 누른다</button><p id="f5-jia-hint" class="f5-hint">대화를 확인한다</p><div id="f5-jia-continue" class="f5-story-next" hidden>[[다음 이야기->CONNECT]]</div></div><<done>><<run setup.initJiaScene()>><</done>>'),
 unit('100가지 이상을 아시나요',7,'<div class="f5-added"><p>얼굴을 씻고 화장실을 나왔다.</p><p>응? 잘못 봤나?</p><div class="f5-mirror-echo">거울 속에 낯선 형체가 스친다.</div><p>나방이 있었던 거 같은데?</p><p>상식적으로 집에 나방이 있을 리가 없지. 문을 닫고 방으로 돌아왔다.</p><p>어라? 내가 이걸 언제 치웠더라.</p><p>책상 위에 있던 텅 빈 과자봉지가 없어져있었다.</p><p class="f5-buzz">우웅…</p><p>또 뭐야?</p><div class="f5-story-next">[[이전 이야기->나방 발생]]　[[다음 이야기->CONNECT]]</div></div>'),
 unit('CONNECT',8,'<div class="f5-added"><p>이코스트?</p><div class="f5-message-card"><b>2COst</b><p>dlgus akwwl?</p></div><p>처음 보고, 들어본 적도 없는 계정한테서 온 메시지다.</p><div class="f5-story-next">[[답장한다.->CONNECT 답장]]　[[무시한다.->NO ANSWER]]</div></div>'),
 unit('CONNECT 답장',9,'<div class="f5-added"><p>2COst: dlgus akwwl?</p><p>답장을 입력한다.</p><p class="f5-hint">이후 답장 내용은 노션에 아직 정해지지 않았습니다.</p><div class="f5-story-next">[[이전 이야기->CONNECT]]</div></div>'),
 unit('NO ANSWER',10,'<div class="f5-noanswer"><<timed 1s>><p>이렇게 빨리 붕괴될 줄은 몰랐는데</p><<next 4s>><p>좀 주변에 주의를 기울여봐</p><<next 4s>><p>7J2066CI6rek65+sCg==</p><<next 1s>><div class="f5-noanswer-logo">F5</div><<next 2s>><<goto "계속되는 알람음">><</timed>></div>')
 ].join('');
 html=html.replace('</tw-storydata>',newUnits+'</tw-storydata>');
 const extraJS = [
 'setup.initJiaScene=function(){',
 'const btn=document.getElementById("f5-jia-next"),box=document.getElementById("f5-jia-messages"),hint=document.getElementById("f5-jia-hint"),next=document.getElementById("f5-jia-continue");',
 'if(!btn||!box)return;',
 'const chat=[["나","방금 그 문자 뭐야?"],["지아","무슨 문자?"],["나","그 영어같은거"],["지아","영어? 난 너가 먼저 연락한 거처럼 보였는데?"],["나","뭔 소리야. 네가 먼저 카톡 보낸거 같던데"],["지아","아무튼 5시에 뭔 문자야"],["지아","나한테 관심있냐?",700],["나","술 마셨냐"],["지아","뭐래"],["지아","아무튼 잘거야",1000]];',
 'let i=0,busy=false;btn.addEventListener("click",function(){if(busy)return;',
 'if(i===chat.length){box.classList.add("f5-screen-off");btn.hidden=true;hint.textContent="화면이 꺼졌다.";next.hidden=false;return;}',
 'const [sender,msg,delay]=chat[i++];btn.disabled=true;busy=true;',
 'setTimeout(function(){if(!box.isConnected)return;const row=document.createElement("div");row.className="f5-chat-message "+(sender==="나"?"me":"friend");const tag=document.createElement("div");tag.className="f5-chat-sender";tag.textContent=sender;const bubble=document.createElement("div");bubble.className="f5-chat-bubble";bubble.textContent=msg;row.append(tag,bubble);box.append(row);box.scrollTop=box.scrollHeight;btn.disabled=false;busy=false;if(i===chat.length)btn.textContent="화면을 끈다";},delay||0);',
 '});};'
 ].join("\n");
 html=html.replace('</script><tw-passagedata',extraJS+'</script><tw-passagedata');
 const style='<style id="f5-update-css">.city-site-top{max-width:960px;margin:0 auto 20px}.city-brand{font-size:12px;color:#b5c4db;letter-spacing:.14em;padding:12px}.city-banner-text{position:relative;min-height:230px;display:flex;align-items:center;box-sizing:border-box;padding:32px max(24px,6vw);background:radial-gradient(ellipse at 75% 85%,#355276 0%,transparent 43%),linear-gradient(110deg,#172a49,#08111f);border-bottom:1px solid #425876;overflow:hidden}.f5-banner-copy{position:relative;z-index:2;text-shadow:0 4px 16px #050b18}.f5-skyline{position:absolute;inset:0;opacity:.55;background:linear-gradient(0deg,#070c16 0 16%,transparent 16%),repeating-linear-gradient(90deg,transparent 0 28px,#080e1b 28px 45px,transparent 45px 74px,#101d30 74px 111px,transparent 111px 129px);clip-path:polygon(0 100%,0 55%,7% 55%,7% 35%,12% 35%,12% 70%,17% 70%,17% 20%,23% 20%,23% 64%,28% 64%,28% 40%,33% 40%,33% 12%,36% 12%,36% 55%,43% 55%,43% 28%,48% 28%,48% 60%,54% 60%,54% 32%,60% 32%,60% 18%,64% 18%,64% 52%,69% 52%,69% 38%,76% 38%,76% 13%,80% 13%,80% 64%,84% 64%,84% 30%,90% 30%,90% 58%,96% 58%,96% 23%,100% 23%,100% 100%)}.city-banner-text small{display:block;color:#b3bfcf}.city-banner-text h2{font-size:clamp(26px,4.6vw,52px);margin:8px 0;color:#edf3ff}.city-credits,.storyteller-credit,.story-teller-credit{display:none!important}.intro-scene .intro-choices.f5-single-next{display:flex!important;justify-content:flex-end!important;grid-template-columns:none!important}.intro-scene .f5-single-next a{display:inline-block!important;width:auto!important;padding:12px 28px!important}.f5-added{max-width:650px;margin:40px auto;padding:0 12px;line-height:2.1}.f5-added>p{margin:20px 0}.f5-story-next{display:flex;justify-content:flex-end;flex-wrap:wrap;gap:12px;margin:35px 0;padding:16px 0;border-top:1px solid #33465f}.f5-story-next a{border:1px solid #5a7697;background:#1b2b43;color:#e9f1fc!important;border-radius:8px;padding:10px 18px;text-decoration:none!important}.f5-story-next[hidden]{display:none!important}.f5-screen-off{background:#030405!important}.f5-screen-off>*{visibility:hidden}.f5-hint{font-size:12px;color:#95a7bd}.f5-mirror-echo{height:200px;max-width:230px;margin:30px auto;border:7px solid #3c485a;border-radius:115px 115px 10px 10px;display:grid;place-items:center;text-align:center;background:radial-gradient(#415069,#101824);color:#b8c1ce}.f5-buzz{text-align:center;letter-spacing:.5em;animation:f5shake .16s infinite alternate}@keyframes f5shake{to{transform:translateX(3px)}}.f5-message-card{background:#b2c7d9;color:#202936;border-radius:12px;max-width:320px;margin:25px auto;padding:20px}.f5-message-card p{background:white;border-radius:8px;padding:12px}.f5-noanswer{min-height:65vh;text-align:center;padding:25px;color:#f0f3ff;letter-spacing:.15em;font-size:clamp(18px,3vw,35px)}.f5-noanswer p{animation:f5fade 4s forwards}.f5-noanswer-logo{font-size:clamp(75px,18vw,180px);font-weight:900;animation:f5fade 1.3s forwards}@keyframes f5fade{0%{opacity:0}20%{opacity:1}85%{opacity:1}100%{opacity:0}}</style>';
 return html.replace('</head>',style+'</head>');
};