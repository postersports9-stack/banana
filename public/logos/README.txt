Client logo files for the homepage marquee (src/components/ClientsMarquee.tsx).

Current logos:
  bn-sound.png       -> BN Sound        -> https://www.bnsound.com/
  klik-logistik.png  -> Klik Logistik   -> https://klikgroup.mk/
  eco-zone.webp      -> Eco Zone        -> https://www.ecozone.mk/

Notes:
- Each logo is a clickable link that opens the client site in a new tab.
- Logos render ~36-44px tall, black & white at rest, full colour on hover.
- To add/remove/rename clients, edit the `clients` array in ClientsMarquee.tsx
  (name, src path under /logos/, href). Transparent-background PNG/SVG looks best.
- If a file is missing, the marquee shows the client name as a styled wordmark.
