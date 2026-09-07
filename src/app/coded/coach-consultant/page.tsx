/* ------------------------------------------------------------------
   Landing page VSL — cible : coach / consultant solo
   Route : /coded/coach-consultant

   • Le CSS est scopé sous la classe racine « bnlp » : cette page a sa
     propre identité typographique et ses animations, et rien ne fuit
     sur le reste du site (en Tailwind).
   • Les polices sont auto-hébergées dans /public/fonts/boldnet :
     aucun appel à Google Fonts, ni au build ni à l'exécution.
   • Tout le paramétrage — vidéo, Shorts, WhatsApp, Google Sheets,
     pixels — est regroupé dans CONFIG, en haut du useEffect.
------------------------------------------------------------------- */
'use client';

import { useEffect } from 'react';

const STYLES = `/* polices auto-hébergées : aucune requête externe, aucune dépendance au build */
@font-face{font-family:'BN Display';src:url('/fonts/boldnet/bodoni-moda-latin-400-normal.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'BN Display';src:url('/fonts/boldnet/bodoni-moda-latin-500-normal.woff2') format('woff2');font-weight:500;font-style:normal;font-display:swap}
@font-face{font-family:'BN Display';src:url('/fonts/boldnet/bodoni-moda-latin-600-normal.woff2') format('woff2');font-weight:600;font-style:normal;font-display:swap}
@font-face{font-family:'BN Display';src:url('/fonts/boldnet/bodoni-moda-latin-400-italic.woff2') format('woff2');font-weight:400;font-style:italic;font-display:swap}
@font-face{font-family:'BN Body';src:url('/fonts/boldnet/hanken-grotesk-latin-300-normal.woff2') format('woff2');font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:'BN Body';src:url('/fonts/boldnet/hanken-grotesk-latin-400-normal.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'BN Body';src:url('/fonts/boldnet/hanken-grotesk-latin-500-normal.woff2') format('woff2');font-weight:500;font-style:normal;font-display:swap}
@font-face{font-family:'BN Body';src:url('/fonts/boldnet/hanken-grotesk-latin-600-normal.woff2') format('woff2');font-weight:600;font-style:normal;font-display:swap}
@font-face{font-family:'BN Body';src:url('/fonts/boldnet/hanken-grotesk-latin-700-normal.woff2') format('woff2');font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:'BN Mono';src:url('/fonts/boldnet/ibm-plex-mono-latin-400-normal.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'BN Mono';src:url('/fonts/boldnet/ibm-plex-mono-latin-500-normal.woff2') format('woff2');font-weight:500;font-style:normal;font-display:swap}

/* ============================================================
   BOLDNET DIGITAL — LANDING VSL
   Cible : coach / consultant solo.
   Palette : encre chaude + rouge de marque #CD2822.
   ============================================================ */
.bnlp{
  --ink:#0A0807;
  --surface:#141010;
  --raise:#1D1716;
  --line:rgba(240,87,75,.14);
  --line-strong:rgba(240,87,75,.30);
  --text:#F5EFED;
  --muted:#9B8F8C;
  --red:#CD2822;
  --red-lite:#F0574B;
  --red-deep:#7E1611;
  --ok:#7FB069;

  --f-display:'BN Display',"Times New Roman",serif;
  --f-body:'BN Body',"Helvetica Neue",Arial,sans-serif;
  --f-mono:'BN Mono',ui-monospace,monospace;

  --pad:clamp(20px,5vw,64px);
  --maxw:1180px;
}.bnlp *,.bnlp *::before,.bnlp *::after{box-sizing:border-box}.bnlp{-webkit-text-size-adjust:100%;scroll-behavior:smooth}.bnlp{
  margin:0;background:var(--ink);color:var(--text);
  font-family:var(--f-body);font-size:17px;line-height:1.65;font-weight:350;
  overflow-x:hidden;-webkit-font-smoothing:antialiased;
}.bnlp img,.bnlp iframe{max-width:100%;display:block}.bnlp a{color:inherit;text-decoration:none}.bnlp :focus-visible{outline:2px solid var(--red-lite);outline-offset:3px;border-radius:2px}.bnlp .grain{
  position:fixed;inset:0;z-index:60;pointer-events:none;opacity:.05;
  background-image:url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
}/* ---------- base ---------- */
.bnlp .wrap{width:100%;max-width:var(--maxw);margin-inline:auto;padding-inline:var(--pad)}.bnlp .slate{
  font-family:var(--f-mono);font-size:11px;letter-spacing:.22em;text-transform:uppercase;
  color:var(--red-lite);display:inline-flex;align-items:center;gap:10px;
}.bnlp .slate::before{content:"";width:22px;height:1px;background:var(--red);opacity:.8}.bnlp h1,.bnlp h2,.bnlp h3{margin:0;font-family:var(--f-display);font-weight:500;line-height:1.05;text-wrap:balance;letter-spacing:-.01em}.bnlp h2{font-size:clamp(30px,4.6vw,54px)}.bnlp h3{font-size:clamp(20px,2.2vw,26px);line-height:1.2}.bnlp p{margin:0}.bnlp .lede{color:var(--muted);font-size:clamp(16px,1.5vw,19px);max-width:62ch;line-height:1.7}.bnlp .red{color:var(--red-lite)}.bnlp .italic{font-style:italic}.bnlp .sec{padding-block:clamp(72px,10vw,128px)}.bnlp .sec-head{display:flex;flex-direction:column;gap:18px;margin-bottom:clamp(36px,5vw,60px)}/* ---------- boutons ---------- */
.bnlp .btn{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  font-family:var(--f-body);font-size:15px;font-weight:600;
  padding:15px 28px;border-radius:2px;border:1px solid transparent;cursor:pointer;
  transition:transform .25s cubic-bezier(.2,.7,.3,1),background .25s,color .25s,border-color .25s,box-shadow .25s;
}.bnlp .btn-primary{
  background:linear-gradient(180deg,#E23A31,#B31E19);color:#fff;
  box-shadow:0 12px 34px -16px rgba(205,40,34,.95);
}.bnlp .btn-primary:hover{transform:translateY(-2px);box-shadow:0 20px 44px -18px rgba(205,40,34,1)}.bnlp .btn-ghost{border-color:var(--line-strong);color:var(--text);background:transparent}.bnlp .btn-ghost:hover{border-color:var(--red);color:var(--red-lite);transform:translateY(-2px)}.bnlp .btn-wa{background:#1F8A4C;color:#fff}.bnlp .btn-wa:hover{background:#25A65C;transform:translateY(-2px)}/* ---------- nav ---------- */
.bnlp .nav{
  position:fixed;top:0;left:0;right:0;z-index:50;
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  background:rgba(10,8,7,0);border-bottom:1px solid transparent;transition:background .35s,border-color .35s;
}.bnlp .nav.stuck{background:rgba(10,8,7,.88);border-bottom-color:var(--line)}.bnlp .nav-in{display:flex;align-items:center;justify-content:space-between;gap:20px;height:76px}.bnlp .nav .btn{padding:11px 20px;font-size:14px}/* ---------- logo ---------- */
.bnlp .logo{display:flex;align-items:center;gap:13px}.bnlp .logo svg{height:34px;width:auto;flex:none;color:var(--red);display:block}.bnlp .logo-txt{display:flex;flex-direction:column;line-height:1}.bnlp .logo-txt b{font-family:var(--f-display);font-weight:600;font-size:19px;letter-spacing:.02em}.bnlp .logo-txt span{font-family:var(--f-mono);font-size:8.5px;letter-spacing:.42em;color:var(--red-lite);margin-top:5px}/* ---------- hero ---------- */
.bnlp .hero{padding-top:clamp(104px,11vw,116px);padding-bottom:clamp(56px,7vw,88px);position:relative;overflow:hidden}.bnlp .hero::before{
  content:"";position:absolute;inset:-30% -10% auto -10%;height:120%;
  background:radial-gradient(56% 44% at 50% 6%,rgba(205,40,34,.20),transparent 68%);pointer-events:none;
}.bnlp .hero-in{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;gap:18px}.bnlp .h1{
  font-family:var(--f-display);font-weight:500;
  font-size:clamp(38px,6.2vw,74px);line-height:1;letter-spacing:-.02em;margin:0;text-wrap:balance;
}.bnlp .h1 em{
  font-style:italic;font-weight:400;
  background:linear-gradient(96deg,#FF7A6E 6%,var(--red) 54%,#FF8478 96%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
}.bnlp .h1-sub{font-size:clamp(16px,1.6vw,19px);color:var(--muted);max-width:46ch}.bnlp .h1-sub b{color:var(--text);font-weight:500}/* ---------- lecteur vidéo ---------- */
.bnlp .frame{
  position:relative;width:100%;max-width:830px;margin:10px auto 0;
  background:#000;border:1px solid var(--line-strong);
  box-shadow:0 50px 100px -55px rgba(0,0,0,.98);
}.bnlp .frame::before,.bnlp .frame::after{content:"";position:absolute;width:22px;height:22px;border:1px solid var(--red);pointer-events:none}.bnlp .frame::before{top:-7px;left:-7px;border-right:0;border-bottom:0}.bnlp .frame::after{bottom:-7px;right:-7px;border-left:0;border-top:0}.bnlp .ratio{position:relative;width:100%;aspect-ratio:16/9;background:#000}.bnlp .ratio iframe,.bnlp .ratio video{position:absolute;inset:0;width:100%;height:100%;border:0}.bnlp .ratio video{object-fit:cover;background:#000}.bnlp .vsl-ph{
  position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;
  background:
    radial-gradient(70% 70% at 50% 45%,rgba(205,40,34,.16),transparent 70%),
    repeating-linear-gradient(115deg,#0F0B0A 0 26px,#131010 0 27px),#0B0908;
  color:var(--muted);text-align:center;padding:24px;cursor:pointer;
}.bnlp .play{
  width:78px;height:78px;border-radius:50%;border:1px solid var(--red);
  display:grid;place-items:center;background:rgba(205,40,34,.12);transition:transform .3s,background .3s;
}.bnlp .play svg{width:26px;height:26px;fill:var(--red-lite);margin-left:4px}.bnlp .vsl-ph:hover .play{transform:scale(1.06);background:rgba(205,40,34,.24)}.bnlp .pulse{position:absolute;width:78px;height:78px;border-radius:50%;border:1px solid var(--red);animation:bnlp-pulse 2.8s ease-out infinite}
@keyframes bnlp-pulse{0%{transform:scale(1);opacity:.65}100%{transform:scale(2.1);opacity:0}}.bnlp .vsl-fallback{cursor:default;gap:14px}.bnlp .vsl-fallback p{font-size:15px;color:var(--muted);max-width:42ch}.bnlp .vsl-fallback code{font-family:var(--f-mono);font-size:13px;color:var(--red-lite)}.bnlp .vsl-fallback .btn{margin-top:4px}.bnlp .hero-cta{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:24px}.bnlp .hero-note{font-family:var(--f-mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}/* ---------- le mécanisme ---------- */
.bnlp .mech{background:var(--surface);border-block:1px solid var(--line)}.bnlp .mech-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,72px);align-items:start}.bnlp .mech-grid p+p{margin-top:20px}.bnlp .mech p{color:var(--muted);font-size:16.5px;line-height:1.75}.bnlp .mech p b{color:var(--text);font-weight:500}.bnlp .chain{display:flex;flex-direction:column;border:1px solid var(--line);background:var(--ink)}.bnlp .link{display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;padding:17px 20px;border-bottom:1px solid var(--line)}.bnlp .link:last-child{border-bottom:0}.bnlp .link i{font-style:normal;font-family:var(--f-mono);font-size:11px;letter-spacing:.14em;color:var(--muted)}.bnlp .link b{font-weight:500;font-size:16px}.bnlp .link em{
  font-style:normal;font-family:var(--f-mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;
  border:1px solid var(--line);padding:4px 9px;color:var(--muted);white-space:nowrap;
}.bnlp .link.you em{border-color:var(--line-strong);color:var(--red-lite)}.bnlp .link.dead b{color:var(--muted)}.bnlp .link.dead em{opacity:.75}/* ---------- offre : vous / nous ---------- */
.bnlp .split>*{min-width:0}.bnlp .split{display:grid;grid-template-columns:.72fr 1.28fr;gap:clamp(24px,3vw,44px);align-items:start}.bnlp .you-panel{
  border:1px solid var(--line-strong);background:linear-gradient(180deg,rgba(205,40,34,.09),transparent 60%),var(--surface);
  padding:clamp(26px,3vw,38px);position:sticky;top:96px;display:flex;flex-direction:column;gap:6px;
}.bnlp .you-panel .k{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--red-lite)}.bnlp .you-panel .big{font-family:var(--f-display);font-size:clamp(64px,9vw,104px);line-height:.9;margin-top:10px}.bnlp .you-panel .sub{font-family:var(--f-mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-top:8px}.bnlp .you-panel p{color:var(--muted);font-size:15px;margin-top:20px;padding-top:20px;border-top:1px solid var(--line)}.bnlp .lanes{display:flex;flex-direction:column;border-top:1px solid var(--line)}.bnlp .lane{
  display:grid;grid-template-columns:64px 1fr;gap:20px;padding:26px 0 26px 0;
  border-bottom:1px solid var(--line);position:relative;transition:padding-left .35s;
}.bnlp .lane::before{
  content:"";position:absolute;left:0;top:-1px;bottom:-1px;width:2px;background:var(--red);
  transform:scaleY(0);transform-origin:top;transition:transform .45s cubic-bezier(.2,.7,.3,1);
}.bnlp .lane:hover::before{transform:scaleY(1)}.bnlp .lane:hover{padding-left:18px}.bnlp .lane .n{font-family:var(--f-mono);font-size:11px;letter-spacing:.16em;color:var(--red-lite);padding-top:7px}.bnlp .lane h3{margin-bottom:10px}.bnlp .lane p{color:var(--muted);font-size:15.5px;line-height:1.7}.bnlp .lane>div{min-width:0}.bnlp .lane .chips{display:flex;flex-wrap:wrap;gap:7px 22px;margin-top:14px;color:var(--text);font-size:14.5px;line-height:1.4}.bnlp .lane .chips span{white-space:nowrap;display:inline-flex;align-items:center;gap:9px}.bnlp .lane .chips span::before{content:"";width:5px;height:5px;background:var(--red);flex:none}/* ---------- déroulé ---------- */
.bnlp .flow{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:1px solid var(--line-strong)}.bnlp .flow div{padding:28px clamp(18px,2vw,30px) 0 0;position:relative}.bnlp .flow div+div{padding-left:clamp(18px,2vw,30px);border-left:1px solid var(--line)}.bnlp .flow div::before{content:"";position:absolute;top:-4px;left:0;width:7px;height:7px;background:var(--red);border-radius:50%}.bnlp .flow div+div::before{left:clamp(18px,2vw,30px)}.bnlp .flow time{font-family:var(--f-mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--red-lite);display:block;margin-bottom:12px}.bnlp .flow h3{font-size:21px;margin-bottom:9px}.bnlp .flow p{color:var(--muted);font-size:15px;line-height:1.65}/* ---------- livrables ---------- */
.bnlp .deliv{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}.bnlp .deliv .card{grid-column:span 2}.bnlp .deliv .card:nth-child(4),.bnlp .deliv .card:nth-child(5){grid-column:span 3}.bnlp .card{background:var(--ink);padding:clamp(24px,2.6vw,32px);display:flex;flex-direction:column;gap:12px;transition:background .35s}.bnlp .card:hover{background:var(--surface)}.bnlp .card .tag{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.2em;color:var(--red-lite);text-transform:uppercase}.bnlp .card h3{font-size:21px}.bnlp .card p{color:var(--muted);font-size:14.5px;line-height:1.6}/* ---------- réalisations ---------- */
.bnlp .work{overflow:hidden;padding-block:clamp(72px,10vw,120px)}.bnlp .marquee{position:relative;width:100%;overflow:hidden;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent);
  mask-image:linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent);}.bnlp .marquee+.marquee{margin-top:20px}.bnlp .track{display:flex;gap:20px;width:max-content;animation:bnlp-slide 52s linear infinite}.bnlp .track.rev{animation-direction:reverse;animation-duration:64s}.bnlp .marquee:hover .track{animation-play-state:paused}/* survoler une vidéo fige les deux bandes, pas seulement la sienne */
.bnlp .work:has(.short:hover) .track{animation-play-state:paused}
@keyframes bnlp-slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}.bnlp .short{
  position:relative;flex:none;width:clamp(168px,17vw,236px);aspect-ratio:9/16;
  border:1px solid var(--line);background:var(--surface);overflow:hidden;cursor:pointer;
  transition:transform .4s cubic-bezier(.2,.7,.3,1),border-color .4s,box-shadow .4s;
}.bnlp .short:hover{transform:translateY(-8px) scale(1.02);border-color:var(--red);box-shadow:0 30px 60px -30px rgba(0,0,0,.95)}.bnlp .short img{width:100%;height:100%;object-fit:cover;opacity:.9;transition:opacity .4s,transform .6s}.bnlp .short:hover img{opacity:1;transform:scale(1.05)}.bnlp .short-ph{
  position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;gap:6px;padding:18px 16px;
  background:linear-gradient(200deg,rgba(205,40,34,.16),transparent 44%),
             repeating-linear-gradient(0deg,rgba(255,255,255,.018) 0 2px,transparent 2px 4px),var(--surface);
}.bnlp .short-ph::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(105deg,transparent 38%,rgba(240,87,75,.10) 50%,transparent 62%);
  background-size:220% 100%;animation:bnlp-shimmer 3.6s linear infinite;
}
@keyframes bnlp-shimmer{from{background-position:180% 0}to{background-position:-80% 0}}.bnlp .short-ph b{font-family:var(--f-display);font-size:17px;font-weight:500;position:relative;z-index:1;line-height:1.15}.bnlp .short-ph small{font-family:var(--f-mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--red-lite);position:relative;z-index:1}.bnlp .short-badge{
  transition:opacity .3s;position:absolute;top:12px;left:12px;z-index:2;font-family:var(--f-mono);font-size:9.5px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--text);background:rgba(10,8,7,.7);border:1px solid var(--line);padding:4px 8px;
}.bnlp .short-play{position:absolute;inset:0;display:grid;place-items:center;z-index:2;opacity:0;transition:opacity .35s;background:rgba(10,8,7,.38)}.bnlp .short:hover .short-play{opacity:1}.bnlp .short-play span{width:46px;height:46px;border-radius:50%;background:var(--red);display:grid;place-items:center}.bnlp .short-video{position:absolute;inset:0;width:100%;height:100%;border:0;z-index:1;pointer-events:none;background:#000}.bnlp .short.playing .short-play,.bnlp .short.playing .short-badge{opacity:0}.bnlp .short-sound{
  position:absolute;right:10px;bottom:10px;z-index:3;opacity:0;transition:opacity .3s;
  font-family:var(--f-mono);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--text);
  background:rgba(10,8,7,.72);border:1px solid var(--line);padding:4px 8px;pointer-events:none;
}.bnlp .short.playing .short-sound{opacity:1}.bnlp .short-play svg{width:16px;height:16px;fill:#fff;margin-left:3px}/* ---------- lightbox ---------- */
.bnlp .lb{position:fixed;inset:0;z-index:80;background:rgba(6,4,4,.94);display:none;place-items:center;padding:20px;backdrop-filter:blur(8px)}.bnlp .lb.on{display:grid}.bnlp .lb-box{width:min(400px,92vw);aspect-ratio:9/16;background:#000;border:1px solid var(--line-strong);position:relative}.bnlp .lb-box iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.bnlp .lb-close{
  position:absolute;top:-46px;right:0;background:none;border:1px solid var(--line-strong);color:var(--text);
  font-family:var(--f-mono);font-size:11px;letter-spacing:.16em;padding:8px 14px;cursor:pointer;
}.bnlp .lb-close:hover{border-color:var(--red);color:var(--red-lite)}.bnlp .lb-open{
  position:absolute;top:-46px;left:0;border:1px solid var(--line-strong);color:var(--text);
  font-family:var(--f-mono);font-size:11px;letter-spacing:.16em;padding:8px 14px;text-decoration:none;
}.bnlp .lb-open:hover{border-color:var(--red);color:var(--red-lite)}.bnlp .lb-open[hidden]{display:none}/* ---------- contact ---------- */
.bnlp .contact{background:var(--surface);border-top:1px solid var(--line)}.bnlp .cgrid{display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(32px,5vw,72px);align-items:start}.bnlp .cinfo p{color:var(--muted);margin-top:18px}.bnlp .cmeta{margin-top:32px;display:flex;flex-direction:column;border-top:1px solid var(--line)}.bnlp .cmeta a,.bnlp .cmeta div{
  display:flex;justify-content:space-between;gap:16px;padding:15px 0;border-bottom:1px solid var(--line);
  font-family:var(--f-mono);font-size:12px;color:var(--muted);transition:color .3s;
}.bnlp .cmeta a:hover{color:var(--red-lite)}.bnlp .cmeta b{color:var(--text);font-weight:400}.bnlp form{border:1px solid var(--line);background:var(--ink);padding:clamp(24px,3.2vw,40px)}.bnlp .fgrid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.bnlp .field{display:flex;flex-direction:column;gap:8px}.bnlp .field.full{grid-column:1/-1}.bnlp label{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}.bnlp input,.bnlp select,.bnlp textarea{
  font-family:var(--f-body);font-size:15.5px;color:var(--text);background:var(--surface);
  border:1px solid var(--line);border-radius:2px;padding:13px 14px;width:100%;transition:border-color .25s,background .25s;
}.bnlp input::placeholder,.bnlp textarea::placeholder{color:#6E6663}.bnlp input:focus,.bnlp select:focus,.bnlp textarea:focus{outline:none;border-color:var(--red);background:var(--raise)}.bnlp select{appearance:none;
  background-image:linear-gradient(45deg,transparent 50%,var(--red-lite) 50%),linear-gradient(135deg,var(--red-lite) 50%,transparent 50%);
  background-position:calc(100% - 19px) 22px,calc(100% - 13px) 22px;background-size:6px 6px,6px 6px;background-repeat:no-repeat}.bnlp textarea{resize:vertical;min-height:104px}.bnlp .consent{grid-column:1/-1;display:flex;gap:11px;align-items:flex-start;color:var(--muted);font-size:13px;line-height:1.5}.bnlp .consent input{width:16px;height:16px;accent-color:var(--red);flex:none;margin-top:2px;padding:0}.bnlp .factions{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-top:4px}.bnlp .fnote{font-family:var(--f-mono);font-size:10.5px;color:var(--muted)}.bnlp .msg{grid-column:1/-1;font-size:14.5px;padding:14px 16px;border:1px solid var(--line);display:none}.bnlp .msg.ok{display:block;border-color:rgba(127,176,105,.5);color:var(--ok)}.bnlp .msg.err{display:block;border-color:var(--line-strong);color:var(--red-lite)}.bnlp footer{padding-block:44px;border-top:1px solid var(--line);background:var(--ink)}.bnlp .foot{display:flex;flex-wrap:wrap;gap:18px;justify-content:space-between;align-items:center;
  font-family:var(--f-mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}/* ---------- WhatsApp ---------- */
.bnlp .wa-fab{
  position:fixed;right:20px;bottom:20px;z-index:70;display:flex;align-items:center;gap:11px;
  background:#1F8A4C;color:#fff;padding:13px 20px 13px 16px;border-radius:999px;
  box-shadow:0 16px 40px -14px rgba(0,0,0,.9);font-weight:600;font-size:14.5px;
  transition:transform .3s cubic-bezier(.2,.7,.3,1),background .3s;
}.bnlp .wa-fab:hover{background:#25A65C;transform:translateY(-3px)}.bnlp .wa-fab svg{width:22px;height:22px;fill:#fff;flex:none}.bnlp .wa-fab .ring{position:absolute;inset:0;border-radius:999px;border:1px solid rgba(37,166,92,.65);animation:bnlp-ring 3.2s ease-out infinite;pointer-events:none}
@keyframes bnlp-ring{0%{transform:scale(1);opacity:.7}70%,100%{transform:scale(1.28);opacity:0}}/* ---------- révélations ---------- */
.bnlp .rv{opacity:0;transform:translateY(26px);transition:opacity .9s cubic-bezier(.2,.7,.3,1),transform .9s cubic-bezier(.2,.7,.3,1)}.bnlp .rv.in{opacity:1;transform:none}/* ---------- tarif ---------- */
.bnlp .price{display:grid;grid-template-columns:1.3fr .7fr;border:1px solid var(--line-strong);background:var(--surface)}.bnlp .price-in{padding:clamp(28px,3.2vw,44px)}.bnlp .price-in h3{margin-bottom:8px}.bnlp .price-in>p{color:var(--muted);font-size:15.5px;line-height:1.65}.bnlp .price-list{list-style:none;margin:22px 0 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:11px 26px}.bnlp .price-list li{position:relative;padding-left:19px;font-size:15px;color:var(--text);line-height:1.5}.bnlp .price-list li::before{content:"";position:absolute;left:0;top:9px;width:6px;height:6px;background:var(--red)}.bnlp .price-side{padding:clamp(28px,3.2vw,44px);border-left:1px solid var(--line);display:flex;flex-direction:column;
  justify-content:center;gap:7px;background:linear-gradient(180deg,rgba(205,40,34,.11),transparent 66%)}.bnlp .price-side .k{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--red-lite)}.bnlp .price-side .side-lead{color:var(--muted);font-size:15px;line-height:1.65;margin-top:14px;padding-top:16px;border-top:1px solid var(--line)}.bnlp .price-side .btn{margin-top:22px}/* ---------- FAQ ---------- */
.bnlp .faq{border-top:1px solid var(--line)}.bnlp .faq details{border-bottom:1px solid var(--line)}.bnlp .faq summary{list-style:none;cursor:pointer;padding:24px 46px 24px 0;position:relative;
  font-family:var(--f-display);font-size:clamp(18px,2vw,23px);line-height:1.3;transition:color .3s}.bnlp .faq summary::-webkit-details-marker{display:none}.bnlp .faq summary:hover{color:var(--red-lite)}.bnlp .faq summary::after{content:"+";position:absolute;right:8px;top:50%;transform:translateY(-50%);
  color:var(--red-lite);font-family:var(--f-mono);font-size:22px;line-height:1}.bnlp .faq details[open] summary::after{content:"\\2013"}.bnlp .faq details>div{padding:0 46px 26px 0;color:var(--muted);font-size:15.5px;line-height:1.75;max-width:78ch}.bnlp .faq details>div p+p{margin-top:12px}/* ---------- liens légaux ---------- */
.bnlp .foot-links{display:flex;gap:20px;flex-wrap:wrap}.bnlp .foot-links a:hover{color:var(--red-lite)}/* ---------- responsive ---------- */
.bnlp @media (max-width:1000px){
  .mech-grid,.split,.cgrid{grid-template-columns:1fr}
  .you-panel{position:static}
  .flow{grid-template-columns:1fr}
  .flow div{padding:26px 0 0 0}
  .flow div+div{padding-left:0;border-left:0;border-top:1px solid var(--line);margin-top:26px}
  .flow div+div::before{left:0}
  .quotes{grid-template-columns:1fr}
  .shot-ph{aspect-ratio:16/9}
  .price{grid-template-columns:1fr}
  .price-side{border-left:0;border-top:1px solid var(--line)}
  .price-list{grid-template-columns:1fr}
  .deliv{grid-template-columns:repeat(2,1fr)}
  .deliv .card,.deliv .card:nth-child(4){grid-column:span 1}
  .deliv .card:nth-child(5){grid-column:1/-1}
}
@media (max-width:660px){.bnlp{font-size:16px}.bnlp .fgrid{grid-template-columns:1fr}.bnlp .deliv{grid-template-columns:1fr}.bnlp .deliv .card,.bnlp .deliv .card:nth-child(4),.bnlp .deliv .card:nth-child(5){grid-column:1/-1}.bnlp .lane{grid-template-columns:1fr;gap:8px}.bnlp .lane .n{padding-top:0}.bnlp .link{grid-template-columns:auto 1fr;row-gap:6px}.bnlp .link em{grid-column:2}.bnlp .nav .btn{display:none}.bnlp .hero{padding-top:100px}.bnlp .wa-fab span{display:none}.bnlp .wa-fab{padding:15px;border-radius:50%}
}
@media (prefers-reduced-motion:reduce){.bnlp *,.bnlp *::before,.bnlp *::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}.bnlp .rv{opacity:1;transform:none}.bnlp{scroll-behavior:auto}
}
`;

export default function CoachConsultantPage() {
  useEffect(() => {
    const revealObserverHolder: { io?: IntersectionObserver; build?: () => void } = {};

    /* ============================================================
       ⚙️  CONFIGURATION — les 4 seules lignes à modifier
       ============================================================ */
    const CONFIG = {
      // 1) ID de votre VSL YouTube. Ex : https://youtu.be/dQw4w9WgXcQ  →  "dQw4w9WgXcQ"
      vslYoutubeId: "iKOkdBhDoEk",

      //    Collez ici l'adresse exacte du code d'intégration donné par YouTube
      //    (Partager → Intégrer). Si ce champ est rempli, il est utilisé tel quel.
      vslEmbedSrc: "https://www.youtube.com/embed/iKOkdBhDoEk?si=t7l5FDyYSaPGc91L",

      //    Alternative sans YouTube : déposez le MP4 dans un dossier /video et indiquez-le ici.
      //    S'il est renseigné, il remplace l'intégration YouTube — plus aucune dépendance,
      //    plus d'Error 153, pas de logo ni de vidéos suggérées à la fin.
      vslFile:   "",   // ex : "video/vsl.mp4"
      vslPoster: "",   // ex : "video/vsl-poster.jpg" (facultatif)

      // 2) Vos YouTube Shorts (ID + titre). Vide = emplacements animés de démonstration.
      shorts: [
        { id: "gkKlkIHo18Y", label: "Short" },
        { id: "6aEsFzTUzCU", label: "Short" },
        { id: "_sT1q6d2mbI", label: "Short" },
        { id: "FcKQXc_0rww", label: "Short" },
        { id: "Dtw_Qqw7AwE", label: "Short" },
        { id: "qFlvqDeu22o", label: "Short" },
        { id: "bXhrpueQVRs", label: "Short" }
      ],

      // Concerne uniquement la galerie de réalisations. À true, les cartes n'intègrent rien :
      // elles ouvrent le Short sur YouTube au clic. Le lecteur du hero, lui, joue toujours
      // dans la page — comme sur votre ancienne landing page.
      youtubeEmbedBlocked: false,

      // Lecture au survol des Shorts (ignoré si youtubeEmbedBlocked vaut true).
      shortsHoverPreview: true,

      // 3) Numéro WhatsApp, format international, sans + ni espaces
      whatsapp: "212728001404",
      whatsappMessage: "Bonjour Boldnet 👋 Je souhaite réserver mon appel stratégie de 30 minutes.",

      // 4) URL de votre application web Google Apps Script (voir google-apps-script.gs)
      //    Vide : le formulaire bascule automatiquement sur WhatsApp.
      sheetEndpoint: "https://script.google.com/macros/s/AKfycbxVdUd1zzJtxQp0-bXPT52VAm7rtGG9m2AZGlbcZ7aApT__KRlLDKuvmeuuyyEmwRxT/exec",

      // 5) Tracking — laissez vide pour désactiver. Aucun script n'est chargé si le champ est vide.
      analytics: {
        ga4:         "",   // ex : "G-XXXXXXXXXX"
        metaPixel:   "1065111722548384",        tiktokPixel: ""    // ex : "CXXXXXXXXXXXXXXXXXXX"
      }
    };

    /* ============================================================
       Rien à modifier en dessous
       ============================================================ */
    document.getElementById('yr').textContent = new Date().getFullYear();

    /* --- tracking : chargé uniquement si un ID est renseigné --- */
    (function(){
      const A = CONFIG.analytics || {};
      if (A.ga4) {
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + A.ga4;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){ window.dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('config', A.ga4);
      }
      if (A.metaPixel) {
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
        (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', A.metaPixel);
        fbq('track', 'PageView');
      }
      if (A.tiktokPixel) {
        !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
        ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
        ttq.setAndDefer=function(e,n){e[n]=function(){e.push([n].concat(Array.prototype.slice.call(arguments,0)))}};
        for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
        ttq.load=function(e){var n="https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=n;ttq._t=ttq._t||{};ttq._t[e]=+new Date;
        ttq._o=ttq._o||{};ttq._o[e]={};var o=d.createElement("script");o.type="text/javascript";
        o.async=!0;o.src=n+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(o,a)};ttq.load(A.tiktokPixel);ttq.page()}(window,document,'ttq');
      }
    })();

    /* --- démarrage de la vidéo : indicateur clé d'une page de vente --- */
    function trackVideoStart(){
      try {
        if (window.gtag) gtag('event', 'video_start', { video_title: 'VSL' });
        if (window.fbq)  fbq('trackCustom', 'VideoStart');
        if (window.ttq)  ttq.track('ViewContent', { content_name: 'VSL' });
      } catch (e) { /* le tracking ne doit jamais casser la page */ }
    }

    /* --- événement de conversion, envoyé à tous les pixels actifs --- */
    function trackLead(source){
      try {
        if (window.gtag)  gtag('event', 'generate_lead', { method: source });
        if (window.fbq)   fbq('track', 'Lead', { content_name: source });
        if (window.ttq)   ttq.track('SubmitForm', { content_name: source });
      } catch (e) { /* le tracking ne doit jamais casser la page */ }
    }

    const waHref = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(CONFIG.whatsappMessage);
    [document.getElementById('waFab'), document.getElementById('waInline'), document.getElementById('waMeta')].forEach(function(a){
      a.href = waHref; a.target = '_blank'; a.rel = 'noopener';
      a.addEventListener('click', function(){ trackLead('whatsapp'); });
    });

    const nav = document.getElementById('nav');
    const onScroll = function(){ nav.classList.toggle('stuck', window.scrollY > 24); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive:true });

    /* --- VSL --- */
    (function(){
      const ph    = document.getElementById('vslPlaceholder');
      const ratio = document.getElementById('vslRatio');
      const id    = CONFIG.vslYoutubeId;

      // 1) Fichier vidéo hébergé par vos soins : lecteur natif, aucune dépendance externe.
      //    L'affiche et le bouton de lecture reprennent le style du reste de la page ;
      //    les commandes n'apparaissent qu'une fois la lecture lancée.
      if (CONFIG.vslFile) {
        const v = document.createElement('video');
        v.playsInline = true;
        v.preload = 'metadata';
        v.setAttribute('controlsList', 'nodownload');
        if (CONFIG.vslPoster) {
          v.poster = CONFIG.vslPoster;
          ph.style.backgroundImage =
            "linear-gradient(rgba(10,8,7,.42),rgba(10,8,7,.62)), url('" + CONFIG.vslPoster + "')";
          ph.style.backgroundSize = 'cover';
          ph.style.backgroundPosition = 'center';
        }
        v.src = CONFIG.vslFile;
        ratio.appendChild(v);

        const label = ph.querySelector('p');
        if (label) label.textContent = 'Cliquez pour lancer la vidéo';

        ph.addEventListener('click', function(){
          v.controls = true;
          const p = v.play();
          if (p && p.catch) p.catch(function(){ v.controls = true; });
          ph.remove();
          trackVideoStart();
        });

        // repli : si le fichier est introuvable ou illisible, on le dit clairement
        v.addEventListener('error', function(){
          ratio.innerHTML =
            '<div class="vsl-ph vsl-fallback">' +
              '<p>Fichier vidéo introuvable — vérifiez le chemin <code>' + CONFIG.vslFile + '</code>' +
              ' et qu\'il a bien été déposé sur le serveur.</p>' +
            '</div>';
        });
        return;
      }

      if (!id) return;

      // miniature : maxres d'abord, repli sur sd puis hq si elle n'existe pas
      (function(){
        const names = ['maxresdefault', 'sddefault', 'hqdefault'];
        let i = 0;
        const probe = new Image();
        probe.onload = function(){
          if (probe.naturalWidth < 200) { probe.onerror(); return; }
          ph.style.backgroundImage =
            "linear-gradient(rgba(10,8,7,.42),rgba(10,8,7,.62)), url('" + probe.src + "')";
          ph.style.backgroundSize = 'cover';
          ph.style.backgroundPosition = 'center';
        };
        probe.onerror = function(){
          i++;
          if (i < names.length) probe.src = 'https://i.ytimg.com/vi/' + id + '/' + names[i] + '.jpg';
        };
        probe.src = 'https://i.ytimg.com/vi/' + id + '/' + names[0] + '.jpg';
      })();

      const label = ph.querySelector('p');
      if (label) label.textContent = 'Cliquez pour lancer la vidéo';

      // Lecteur : iframe simple, exactement le code d'intégration officiel de YouTube.
      ph.addEventListener('click', function(){
        const f = document.createElement('iframe');
        const base = CONFIG.vslEmbedSrc || ('https://www.youtube.com/embed/' + id);
        f.src = base + (base.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';
        f.title = 'YouTube video player';
        f.frameBorder = '0';
        f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        f.referrerPolicy = 'strict-origin-when-cross-origin';
        f.allowFullscreen = true;
        ratio.innerHTML = '';
        ratio.appendChild(f);
        trackVideoStart();
      });
    })();

    /* --- Shorts --- */
    (function(){
      const trackA = document.getElementById('trackA');
      const trackB = document.getElementById('trackB');
      const list = CONFIG.shorts.filter(function(s){ return s.id || s.titre; });
      // pas de lecture au survol sur écran tactile : il n'y a pas de survol
      const blocked  = CONFIG.youtubeEmbedBlocked === true;
      const canHover = !blocked && CONFIG.shortsHoverPreview !== false &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (!list.length) return;

      const build = function(item){
        const el = document.createElement('article');
        el.className = 'short';
        el.setAttribute('role','button');
        el.setAttribute('tabindex','0');
        el.setAttribute('aria-label', item.titre ? ('Lire : ' + item.titre) : 'Lire la vidéo');
        const badge = '<span class="short-badge">' + item.label + '</span>';
        const playIcon = '<span class="short-play"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span></span>';
        if (item.id) {
          el.innerHTML = badge + playIcon;

          // Miniature : on tente la vignette verticale, puis les formats classiques.
          // Si aucune ne répond (pas de réseau, ou aperçu qui bloque les images
          // externes), on affiche le cartouche stylé plutôt qu'une icône cassée.
          const img = document.createElement('img');
          // pas de lazy-loading : les cartes défilent horizontalement et les 7 miniatures
          // uniques sont mises en cache par le navigateur dès le premier chargement
          img.loading = 'eager';
          img.alt = item.titre || 'Réalisation Boldnet Digital';
          const candidates = ['oardefault', 'oar2', 'hq2', 'hqdefault'].map(function(n){
            return 'https://i.ytimg.com/vi/' + item.id + '/' + n + '.jpg';
          });
          let ci = 0;
          img.addEventListener('error', function(){
            ci++;
            if (ci < candidates.length) { img.src = candidates[ci]; return; }
            img.remove();
            const ph = document.createElement('div');
            ph.className = 'short-ph';
            ph.innerHTML = '<small>Réalisation</small><b>' + (item.titre || 'Voir la vidéo') + '</b>';
            el.insertBefore(ph, el.firstChild);
          });
          el.appendChild(img);
          img.src = candidates[0];
          const open = blocked
            ? function(){ window.open('https://www.youtube.com/shorts/' + item.id, '_blank', 'noopener'); }
            : function(){ openLightbox(item.id); };
          el.addEventListener('click', open);
          el.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });

          // Survol : le défilement se fige (CSS) et la vidéo démarre en sourdine.
          // Clic : ouverture en grand, avec le son.
          if (canHover) {
            let timer = null, frame = null;
            el.addEventListener('mouseenter', function(){
              if (frame) return;
              timer = setTimeout(function(){
                frame = document.createElement('iframe');
                frame.className = 'short-video';
                frame.title = item.titre || 'Réalisation Boldnet Digital';
                frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                frame.referrerPolicy = 'strict-origin-when-cross-origin';
                frame.src = 'https://www.youtube.com/embed/' + item.id +
                  '?autoplay=1&mute=1&loop=1&playlist=' + item.id +
                  '&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3';
                el.appendChild(frame);
                el.classList.add('playing');
              }, 140);
            });
            el.addEventListener('mouseleave', function(){
              clearTimeout(timer);
              el.classList.remove('playing');
              if (frame) { frame.remove(); frame = null; }
            });
            const hint = document.createElement('span');
            hint.className = 'short-sound';
            hint.textContent = 'Cliquer pour le son';
            el.appendChild(hint);
          }
        } else {
          el.innerHTML = badge + playIcon + '<div class="short-ph"><small>Emplacement</small><b>' + item.titre + '</b></div>';
        }
        return el;
      };

      // Le défilement translate la piste de -50% : la première moitié doit être
      // plus large que l'écran, sinon un vide apparaît à droite. On duplique
      // le jeu de cartes autant de fois que nécessaire.
      const fill = function(track, set){
        const appendSet = function(){ set.forEach(function(item){ track.appendChild(build(item)); }); };
        track.innerHTML = '';
        appendSet();
        const setWidth = track.scrollWidth || 1;
        const half = Math.max(2, Math.ceil((window.innerWidth + 200) / setWidth));
        for (let i = 1; i < half * 2; i++) appendSet();
      };

      fill(trackA, list);
      fill(trackB, list.slice().reverse());
    })();

    /* --- lightbox --- */
    const lb = document.getElementById('lb');
    const lbSlot = document.getElementById('lbSlot');
    const lbBox = lb.querySelector('.lb-box');
    const lbOpen = document.getElementById('lbOpen');
    function openLightbox(id){
      lbOpen.hidden = false;
      lbOpen.href = 'https://www.youtube.com/shorts/' + id;
      lbSlot.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id +
        '?autoplay=1&rel=0&modestbranding=1" title="Réalisation Boldnet" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
      lb.classList.add('on');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox(){ lb.classList.remove('on'); lbSlot.innerHTML = ''; document.body.style.overflow = ''; }
    document.getElementById('lbClose').addEventListener('click', closeLightbox);
    lb.addEventListener('click', function(e){ if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && lb.classList.contains('on')) closeLightbox(); });

    /* --- révélations --- */
    revealObserverHolder.build = function(){
      const els = document.querySelectorAll('.rv');
      if (!('IntersectionObserver' in window)) { els.forEach(function(el){ el.classList.add('in'); }); return; }
      const io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){ if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold:.12, rootMargin:'0px 0px -8% 0px' });
      els.forEach(function(el,i){ el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
      revealObserverHolder.io = io;
    };
    revealObserverHolder.build();

    /* --- formulaire → Google Sheet --- */
    (function(){
      const form = document.getElementById('leadForm');
      const msg = document.getElementById('formMsg');
      const btn = document.getElementById('submitBtn');
      const show = function(type, text){ msg.className = 'msg ' + type; msg.textContent = text; };

      form.addEventListener('submit', function(e){
        e.preventDefault();
        msg.className = 'msg';
        if (!form.checkValidity()) {
          show('err', 'Merci de compléter les champs obligatoires (nom, activité, email, WhatsApp et consentement).');
          form.reportValidity();
          return;
        }
        const data = new FormData(form);
        data.append('source', 'Landing VSL');
        data.append('date', new Date().toLocaleString('fr-FR'));

        if (!CONFIG.sheetEndpoint) {
          const txt = 'Bonjour Boldnet 👋%0A%0ADemande d\'appel stratégie :%0A' +
            '• Nom : ' + data.get('nom') + '%0A' +
            '• Activité : ' + data.get('entreprise') + '%0A' +
            '• Email : ' + data.get('email') + '%0A' +
            '• WhatsApp : ' + data.get('telephone') + '%0A' +
            '• Objectif : ' + data.get('objectif') + '%0A' +
            '• Message : ' + (data.get('message') || '—');
          window.open('https://wa.me/' + CONFIG.whatsapp + '?text=' + txt, '_blank', 'noopener');
          trackLead('formulaire-whatsapp');
          show('ok', 'Votre demande est prête dans WhatsApp — il ne reste qu\'à l\'envoyer.');
          return;
        }

        btn.disabled = true;
        const original = btn.textContent;
        btn.textContent = 'Envoi en cours…';
        fetch(CONFIG.sheetEndpoint, {
          method:'POST', mode:'no-cors',
          headers:{ 'Content-Type':'application/x-www-form-urlencoded' },
          body:new URLSearchParams(data).toString()
        }).then(function(){
          trackLead('formulaire');
          form.reset();
          show('ok', 'Merci ! Votre demande est enregistrée. On vous rappelle sous 24h ouvrées pour caler l\'appel.');
        }).catch(function(){
          show('err', 'L\'envoi a échoué. Écrivez-nous directement sur WhatsApp ou à Contact@Boldnetdigital.com.');
        }).finally(function(){
          btn.disabled = false;
          btn.textContent = original;
        });
      });
    })();


    return () => {
      window.removeEventListener('scroll', onScroll);
      if (revealObserverHolder.io) revealObserverHolder.io.disconnect();
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="bnlp">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="grain" aria-hidden="true"></div>


      <header className="nav" id="nav">
        <div className="wrap nav-in">
          <a className="logo" href="#top" aria-label="Boldnet Digital, accueil">
            <svg viewBox="248 124 584 832" role="img" aria-label="Boldnet" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fillRule="nonzero" d="M 252.96875 151.546875 C 251.800781 138.464844 264.023438 127.449219 276.757812 128.207031 C 360.585938 127.777344 444.410156 128.144531 528.234375 127.898438 C 545.875 128.125 563.597656 127.347656 581.132812 129.675781 C 624.734375 133.582031 667.390625 148.378906 703.652344 172.96875 C 763.828125 215.054688 807.570312 280.851562 820.816406 353.3125 C 827.929688 389.878906 827.132812 427.304688 827.214844 464.40625 C 827.640625 497.375 826.96875 530.980469 817.09375 562.742188 C 811.410156 581.628906 803.195312 599.800781 791.75 615.886719 C 789.664062 619.628906 785.679688 623.183594 786.558594 627.84375 C 788.398438 632.28125 791.75 635.835938 794.550781 639.679688 C 814.621094 665.902344 824.820312 699.203125 824.25 732.109375 C 825.25 775.09375 810.144531 817.550781 785.371094 852.359375 C 753.363281 898.574219 704.082031 932.710938 649.097656 945.015625 C 628.269531 949.816406 606.886719 952.433594 585.488281 952.023438 C 483.246094 951.964844 381.023438 952.292969 278.804688 951.921875 C 266.234375 952.617188 253.867188 942.726562 253.152344 929.910156 C 252.515625 917.113281 252.804688 904.296875 252.925781 891.503906 C 252.699219 884.449219 257.339844 878.09375 263.351562 874.800781 C 317.78125 845.042969 371.152344 813.421875 425.132812 782.863281 C 434.863281 777.386719 444.265625 771.210938 454.40625 766.511719 C 459.390625 763.957031 464.851562 766.121094 469.347656 768.59375 C 470.472656 771.558594 472.167969 774.441406 472.207031 777.730469 C 472.78125 794.636719 471.65625 811.582031 472.699219 828.464844 C 473.394531 835.84375 479.605469 842.078125 487.191406 841.769531 C 517.933594 841.894531 548.695312 841.957031 579.4375 841.914062 C 617.539062 841.730469 656.78125 827.484375 682.089844 798.191406 C 697.460938 781.0625 707.289062 759.253906 710.746094 736.546875 C 714.445312 705.640625 704.960938 672.933594 683.886719 649.816406 C 676.546875 641.089844 667.125 634.570312 658.070312 627.804688 C 656.007812 618.320312 665.734375 613.332031 670.765625 606.957031 C 689.140625 586.289062 701.179688 560.515625 708.640625 534.066406 C 718.367188 497.4375 720.863281 458.988281 717.488281 421.296875 C 713.890625 378.902344 699.667969 336.816406 673.359375 303.050781 C 649.589844 272.269531 614.960938 250.292969 577.292969 240.890625 C 553.96875 234.679688 529.585938 234.84375 505.628906 234.921875 C 463.460938 235.105469 421.292969 235.085938 379.125 235.167969 C 373.238281 235.679688 366.738281 235.292969 361.628906 238.683594 C 357.070312 242.261719 355.597656 248.414062 355.945312 253.972656 C 356.148438 311.882812 355.738281 369.789062 356.3125 427.695312 C 360.75 426.222656 365.039062 424.320312 369.027344 421.871094 C 391.570312 408.664062 414.566406 396.238281 436.785156 382.5 C 444.472656 378.003906 453.75 371.851562 462.804688 376.289062 C 469.734375 379.722656 471.003906 387.816406 471.144531 394.785156 C 470.265625 419.3125 470.898438 443.882812 470.613281 468.410156 C 470.367188 475.972656 471.269531 483.699219 469.53125 491.140625 C 467.140625 498.152344 460.476562 502.15625 454.304688 505.429688 C 418.777344 524.539062 384.214844 545.390625 349.054688 565.132812 C 324.9375 578.398438 301.410156 592.6875 277.3125 605.933594 C 271.589844 608.261719 264.820312 612.945312 258.832031 608.710938 C 253.3125 605.667969 252.539062 598.800781 252.761719 593.15625 C 252.90625 445.949219 252.863281 298.757812 252.96875 151.546875 "/><path fill="currentColor" fillRule="nonzero" d="M 570.851562 502.464844 C 577.269531 498.683594 583.832031 493.125 591.785156 494.226562 C 599 495.066406 602.390625 502.875 602.269531 509.351562 C 602.1875 540.035156 602.289062 570.714844 602.269531 601.375 C 602.289062 607.792969 600.613281 614.945312 595.21875 618.972656 C 531.117188 654.765625 467.957031 692.355469 404.058594 728.574219 C 359.707031 752.855469 316.636719 779.449219 272.285156 803.730469 C 267.355469 806.859375 261.46875 806.960938 256.480469 803.996094 C 255.789062 802.933594 254.398438 800.808594 253.703125 799.746094 C 252.210938 789.546875 252.84375 779.203125 252.742188 768.941406 C 252.945312 745.070312 252.660156 721.195312 253.007812 697.320312 C 252.785156 690.066406 257.054688 683.214844 263.414062 679.886719 C 335.035156 640.230469 405.59375 598.71875 476.542969 557.898438 C 508.058594 539.542969 539.804688 521.597656 570.851562 502.464844 "/></svg>
            <span className="logo-txt"><b>Boldnet</b><span>Digital</span></span>
          </a>
          <a className="btn btn-primary" href="#contact">Réserver mon appel stratégie</a>
        </div>
      </header>


      <section className="hero" id="top">
        <div className="wrap hero-in">
          <span className="slate">Coachs &amp; consultants indépendants · Casablanca</span>
          <h1 className="h1">Construire un contenu<br /><em>qui vend pour vous.</em></h1>
          <p className="h1-sub">Avec <b>2 heures par mois</b> de votre temps. Rien de plus.</p>

          <div className="frame" id="vslFrame">
            <div className="ratio" id="vslRatio">
              <div className="vsl-ph" id="vslPlaceholder">
                <div style={{position: "relative", display: "grid", placeItems: "center"}}>
                  <span className="pulse" aria-hidden="true"></span>
                  <span className="play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>
                </div>
                <p style={{fontFamily: "var(--f-mono)", fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase"}}>Emplacement vidéo — ajoutez l'ID YouTube dans CONFIG</p>
              </div>
            </div>
          </div>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#contact">Réserver mon appel stratégie gratuit</a>
            <a className="btn btn-ghost" href="#offre">Voir comment ça fonctionne</a>
          </div>
          <span className="hero-note">30 minutes · sans engagement</span>
        </div>
      </section>


      <section className="mech sec" id="mecanisme">
        <div className="wrap">
          <div className="sec-head rv" style={{maxWidth: "760px"}}>
            <span className="slate">Le mécanisme</span>
            <h2>Ce n'est pas un problème de régularité.<br /><span className="red italic">C'est un problème de chaîne.</span></h2>
          </div>
          <div className="mech-grid">
            <div className="rv">
              <p>Publier, ce n'est pas une tâche. C'est <b>quatre métiers enchaînés</b> : décider quoi dire, filmer, monter, distribuer. Seul, vous n'en tenez qu'un — celui où vous êtes bon.</p>
              <p>Le montage prend vos soirées. Et la distribution, celle qui fait réellement venir les clients, <b>n'arrive jamais jusqu'au bout</b>. C'est là que ça s'arrête : pas au premier post, au onzième. Pas par manque de volonté — une chaîne à quatre maillons tenue par une seule personne finit toujours par coûter plus qu'elle ne rapporte.</p>
              <p><b>Votre marque personnelle est votre seul actif commercial.</b> Elle mérite une chaîne de production, pas vos week-ends.</p>
            </div>
            <div className="chain rv" aria-label="Les quatre maillons de la chaîne de contenu">
              <div className="link you"><i>01</i><b>Décider quoi dire</b><em>Votre terrain</em></div>
              <div className="link you"><i>02</i><b>Filmer proprement</b><em>Votre terrain</em></div>
              <div className="link dead"><i>03</i><b>Monter, sous-titrer, habiller</b><em>Votre soirée</em></div>
              <div className="link dead"><i>04</i><b>Publier, écrire, planifier</b><em>Jamais fait</em></div>
            </div>
          </div>
        </div>
      </section>


      <section className="sec" id="offre">
        <div className="wrap">
          <div className="sec-head rv" style={{maxWidth: "820px"}}>
            <span className="slate">L'offre</span>
            <h2>Vous tenez un maillon.<br /><span className="red italic">On tient les trois autres.</span></h2>
            <p className="lede">Vous venez au studio, vous parlez de ce que vous savez déjà. Tout ce qui se passe avant et après sort de votre agenda.</p>
          </div>

          <div className="split">
            <aside className="you-panel rv">
              <span className="k">Ce que vous faites</span>
              <span className="big">2H</span>
              <span className="sub">par mois, en studio</span>
              <p>Vous arrivez sans avoir rien préparé seul. Un plan de talking points est prêt, un réalisateur vous dirige, les prises sont validées sur place. Vous repartez, votre mois de contenu est bouclé.</p>
              <a className="btn btn-primary" href="#contact" style={{marginTop: "22px"}}>Bloquer ma session</a>
            </aside>

            <div className="lanes rv">
              <article className="lane">
                <span className="n">01</span>
                <div>
                  <h3>Stratégie</h3>
                  <p>On décide de quoi vous parlez avant d'allumer une caméra — pour que chaque vidéo travaille pour une offre précise.</p>
                  <p className="chips">
                    <span>Voix &amp; ton de marque</span><span>Charte graphique</span><span>Piliers de contenu</span><span>Calendrier éditorial mensuel</span>
                  </p>
                </div>
              </article>
              <article className="lane">
                <span className="n">02</span>
                <div>
                  <h3>Tournage</h3>
                  <p>Une seule session mensuelle dans notre studio à Casablanca, dirigée de bout en bout.</p>
                  <p className="chips">
                    <span>Session de 2h / mois</span><span>10 décors au choix</span><span>Direction créative incluse</span><span>Coaching caméra sur place</span>
                  </p>
                </div>
              </article>
              <article className="lane">
                <span className="n">03</span>
                <div>
                  <h3>Montage</h3>
                  <p>Le maillon qui vous prenait vos soirées. Vous ne le voyez plus passer.</p>
                  <p className="chips">
                    <span>Editing professionnel</span><span>Sous-titres &amp; habillage</span><span>Miniatures personnalisées</span><span>Formats par réseau</span>
                  </p>
                </div>
              </article>
              <article className="lane">
                <span className="n">04</span>
                <div>
                  <h3>Publication</h3>
                  <p>Le maillon qui n'arrivait jamais — et celui qui fait la différence sur vos prises de rendez-vous.</p>
                  <p className="chips">
                    <span>Planification &amp; posting</span><span>Captions rédigés</span><span>Hashtag strategy</span><span>Optimisation des horaires</span>
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>


      <section className="sec" style={{paddingTop: "0"}}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="slate">Le déroulé</span>
            <h2>Une seule date dans votre agenda.</h2>
          </div>
          <div className="flow rv">
            <div>
              <time>Avant la session</time>
              <h3>On prépare à votre place</h3>
              <p>On définit vos piliers de contenu, on écrit le plan de talking points, vous choisissez votre décor. Vous validez, c'est tout.</p>
            </div>
            <div>
              <time>Jour J · 2 heures</time>
              <h3>Vous parlez, on filme</h3>
              <p>Briefing créatif, coaching caméra si vous en avez besoin, tournage dirigé par notre équipe, prises validées sur place. Vous ne repartez pas avec des doutes.</p>
            </div>
            <div>
              <time>Après la session</time>
              <h3>On livre et on publie</h3>
              <p>Montage, miniatures, habillage, captions rédigés, publication aux meilleurs créneaux. Puis un rapport mensuel sur ce qui a marché.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="sec" style={{paddingTop: "0"}}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="slate">Vos livrables chaque mois</span>
            <h2>Un mois de contenu produit<br />en une seule session.</h2>
          </div>
          <div className="deliv rv">
            <article className="card"><span className="tag">Vidéo</span><h3>Vidéos courtes</h3><p>Reels &amp; TikToks de 30 à 90 secondes, montés avec sous-titres, habillage graphique et musique. Prêtes à publier.</p></article>
            <article className="card"><span className="tag">Visuel</span><h3>Miniatures &amp; visuels</h3><p>Miniatures et visuels personnalisés, cohérents avec votre charte graphique.</p></article>
            <article className="card"><span className="tag">Copy</span><h3>Captions rédigés</h3><p>Textes d'accompagnement optimisés pour l'engagement, écrits dans votre ton et votre voix.</p></article>
            <article className="card"><span className="tag">Planning</span><h3>Calendrier de publication</h3><p>Votre contenu planifié et publié aux meilleurs créneaux selon les algorithmes de chaque réseau.</p></article>
            <article className="card"><span className="tag">Rapport</span><h3>Rapport mensuel</h3><p>Portée, engagement, vues — et les recommandations concrètes pour le mois suivant.</p></article>
          </div>
        </div>
      </section>


      <section className="work" id="realisations">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="slate">Nos réalisations</span>
            <h2>Ce qu'on livre, concrètement.</h2>
            <p className="lede">Des extraits produits dans notre studio — script, tournage, montage, sous-titres et publication. Survolez pour arrêter le défilement, cliquez pour lancer.</p>
          </div>
        </div>
        <div className="marquee rv"><div className="track" id="trackA"></div></div>
        <div className="marquee rv"><div className="track rev" id="trackB"></div></div>
        <div className="wrap" style={{marginTop: "44px", display: "flex", justifyContent: "center"}}>
          <a className="btn btn-ghost" href="#contact">Je veux ce niveau de contenu</a>
        </div>
      </section>



      <section className="sec" id="formule" style={{paddingTop: "0"}}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="slate">La formule</span>
            <h2>Tout est compris.<br /><span className="red italic">Vous n'ajoutez rien.</span></h2>
          </div>
          <div className="price rv">
            <div className="price-in">
              <h3>Formule mensuelle</h3>
              <p>Une session de tournage, un mois de contenu produit et publié. Pas de frais de setup, pas de surcoût au montage, rien à gérer de votre côté.</p>
              <ul className="price-list">
                <li>Stratégie &amp; calendrier éditorial</li>
                <li>Session studio de 2h par mois</li>
                <li>Vidéos courtes montées, prêtes à publier</li>
                <li>Montage, sous-titres, habillage</li>
                <li>Miniatures &amp; visuels</li>
                <li>Captions rédigés</li>
                <li>Publication sur vos réseaux</li>
                <li>Rapport mensuel de performance</li>
              </ul>
            </div>
            <aside className="price-side">
              <span className="k">Sur mesure</span>
              <p className="side-lead">La formule s'ajuste à votre volume et à votre rythme de publication. On la cale ensemble pendant l'appel — sans engagement de votre part.</p>
              <a className="btn btn-primary" href="#contact">Réserver mon appel</a>
            </aside>
          </div>
        </div>
      </section>


      <section className="sec" id="faq" style={{paddingTop: "0"}}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="slate">Questions fréquentes</span>
            <h2>Ce que les gens demandent<br />avant de réserver.</h2>
          </div>
          <div className="faq rv">
            <details>
              <summary>Je ne suis pas à l'aise devant une caméra. C'est rédhibitoire&nbsp;?</summary>
              <div><p>Non, et c'est le cas de la majorité des personnes qui arrivent au studio. Un réalisateur vous dirige pendant toute la session : il vous relance, coupe quand ce n'est pas bon, et vous refaites la prise. Vous ne validez jamais une vidéo que vous n'assumez pas — les prises sont revues avec vous sur place.</p></div>
            </details>
            <details>
              <summary>Combien de vidéos je reçois chaque mois&nbsp;?</summary>
              <div><p>Il n'y a pas de volume standard, et c'est volontaire. Le nombre est défini pendant l'appel stratégie, en fonction de votre offre, de votre rythme de publication et des réseaux que vous visez — un consultant qui vend un accompagnement long n'a pas besoin de la même cadence qu'un coach qui remplit des sessions courtes.</p>
              <p>Ce qui est fixe : une session de 2h par mois, et un mois de contenu produit et publié à partir de cette session.</p></div>
            </details>
            <details>
              <summary>Je dois préparer quelque chose avant la session&nbsp;?</summary>
              <div><p>Non. On vous envoie le plan de talking points en amont, vous le lisez, vous nous dites si un sujet ne vous parle pas. C'est tout ce qu'on vous demande avant de venir.</p></div>
            </details>
            <details>
              <summary>Quel est le délai entre le tournage et la publication&nbsp;?</summary>
              <div><p>Le montage part dès la fin du tournage, sans attente. Vos premières vidéos sont en ligne <b>3 à 5 jours</b> après la session, puis le reste du mois s'enchaîne aux créneaux définis dans votre calendrier éditorial.</p>
              <p>Autrement dit : vous venez filmer, et moins d'une semaine plus tard votre contenu tourne déjà.</p></div>
            </details>
            <details>
              <summary>Sur quels réseaux vous publiez&nbsp;?</summary>
              <div><p>Sur les vôtres. On part des comptes que vous avez déjà — Instagram, TikTok, LinkedIn, YouTube — et on concentre les efforts là où se trouvent réellement vos clients, plutôt que d'ouvrir des profils partout pour le principe.</p>
              <p>Chaque vidéo est exportée au format du réseau visé et accompagnée d'une caption écrite pour lui. On ne recopie pas le même texte d'une plateforme à l'autre.</p></div>
            </details>
          </div>
        </div>
      </section>


      <section className="contact sec" id="contact">
        <div className="wrap cgrid">
          <div className="cinfo rv">
            <span className="slate">Prochaine étape</span>
            <h2 style={{marginTop: "16px"}}>Un appel de 30 minutes,<br /><span className="red italic">et vous saurez quoi faire.</span></h2>
            <p>On regarde ensemble ce que vous vendez, à qui, et quel contenu peut réellement porter cette offre. Vous repartez avec une direction claire — que vous travailliez avec nous ou non. <span className="red">Aucun engagement.</span></p>
            <div className="cmeta">
              <a href="mailto:Contact@Boldnetdigital.com"><span>Email</span><b>Contact@Boldnetdigital.com</b></a>
              <a id="waMeta" href="#" target="_blank" rel="noopener"><span>WhatsApp</span><b>+212 728 00 14 04</b></a>
              <a href="https://www.instagram.com/boldnet_digital/" target="_blank" rel="noopener"><span>Instagram</span><b>@boldnet_digital</b></a>
              <a href="https://boldnetdigital.com" target="_blank" rel="noopener"><span>Site web</span><b>boldnetdigital.com</b></a>
              <div><span>Studio</span><b>Abdelmoumen, Casablanca</b></div>
            </div>
            <a className="btn btn-wa" id="waInline" href="#" style={{marginTop: "26px"}}>
              <svg viewBox="0 0 24 24" aria-hidden="true" style={{width: "19px", height: "19px", fill: "#fff"}}><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 18.2c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.3 8.3 0 1 1 7.2 3.8"/></svg>
              Discuter directement sur WhatsApp
            </a>
          </div>

          <form id="leadForm" className="rv" novalidate>
            <div className="sec-head" style={{marginBottom: "24px", gap: "10px"}}>
              <span className="slate">Formulaire · 40 secondes</span>
              <h3 style={{fontSize: "26px"}}>Réservez votre appel stratégie</h3>
            </div>
            <div className="fgrid">
              <div className="field">
                <label htmlFor="nom">Nom complet *</label>
                <input id="nom" name="nom" type="text" placeholder="Youssef Benali" required={true} autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="entreprise">Votre activité *</label>
                <input id="entreprise" name="entreprise" type="text" placeholder="Coach business, consultant RH…" required={true} autoComplete="organization-title" />
              </div>
              <div className="field">
                <label htmlFor="email">Email professionnel *</label>
                <input id="email" name="email" type="email" placeholder="vous@votredomaine.ma" required={true} autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="tel">WhatsApp *</label>
                <input id="tel" name="telephone" type="tel" placeholder="+212 6 00 00 00 00" required={true} autoComplete="tel" />
              </div>
              <div className="field full">
                <label htmlFor="objectif">Ce que vous voulez que le contenu fasse</label>
                <select id="objectif" name="objectif">
                  <option value="Remplir mon agenda">Remplir mon agenda de rendez-vous qualifiés</option>
                  <option value="Vendre une offre précise">Vendre une offre précise (programme, accompagnement)</option>
                  <option value="Devenir la référence">Devenir la référence de ma niche</option>
                  <option value="Arrêter de dépendre du bouche-à-oreille">Arrêter de dépendre du bouche-à-oreille</option>
                  <option value="Lancer une nouvelle offre">Lancer une nouvelle offre</option>
                </select>
              </div>
              <div className="field full">
                <label htmlFor="message">Où en êtes-vous aujourd'hui&nbsp;?</label>
                <textarea id="message" name="message" placeholder="Ex : j'ai posté pendant 2 mois, puis j'ai arrêté faute de temps. Mes clients viennent surtout de recommandations."></textarea>
              </div>
              <label className="consent" htmlFor="consent">
                <input id="consent" name="consent" type="checkbox" required={true} />
                <span>J'accepte d'être recontacté par Boldnet Digital au sujet de ma demande.</span>
              </label>
              <div className="msg" id="formMsg" role="status" aria-live="polite"></div>
              <div className="factions">
                <button className="btn btn-primary" type="submit" id="submitBtn">Réserver mon appel de 30 min</button>
                <span className="fnote">Réponse sous 24h ouvrées</span>
              </div>
            </div>
          </form>
        </div>
      </section>

      <footer>
        <div className="wrap foot">
          <span>© <span id="yr"></span> Boldnet Digital · Abdelmoumen, Casablanca</span>
          <span className="foot-links">
            <a href="mentions-legales.html">Mentions légales</a>
            <a href="confidentialite.html">Confidentialité</a>
            <a href="#faq">FAQ</a>
          </span>
        </div>
      </footer>

      <div className="lb" id="lb" role="dialog" aria-modal="true" aria-label="Lecteur vidéo">
        <div className="lb-box">
          <a className="lb-open" id="lbOpen" href="#" target="_blank" rel="noopener">Ouvrir sur YouTube ↗</a>
          <button className="lb-close" id="lbClose" type="button">Fermer ✕</button>
          <div id="lbSlot"></div>
        </div>
      </div>

      <a className="wa-fab" id="waFab" href="#" aria-label="Écrire sur WhatsApp">
        <span className="ring" aria-hidden="true"></span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 18.2c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.3 8.3 0 1 1 7.2 3.8"/></svg>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
