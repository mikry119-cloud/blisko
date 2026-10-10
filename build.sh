#!/bin/bash
# Rebuild web: cd /workspace/audio-app/prices && python3 embed.py index.template.html ../index.html; then ./build.sh
python3 - <<'P'
s=open('/workspace/audio-app/index.html',encoding='utf-8').read()
head='<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icons/icon-192.png"><link rel="apple-touch-icon" href="icons/apple-touch-icon.png"><meta name="apple-mobile-web-app-capable" content="yes">'
s=s.replace('<meta charset="utf-8">','<meta charset="utf-8">'+head,1)
sw="<script>if('serviceWorker' in navigator&&location.protocol=='https:'&&!window.AndroidNotify)navigator.serviceWorker.register('sw.js').catch(()=>{});</script></body>"
s=s.replace('</body>',sw,1)
open('index.html','w',encoding='utf-8').write(s)
P
