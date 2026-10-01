#!/bin/bash
# Regenerates the screenshots and clips in public/shots from a local Shotlate build.
# Everything is rendered by Shotlate itself (offscreen UI demo, in-place translation, long screenshot);
# the only stand-in is mock-translate.mjs, which returns the Chinese text in translations.json
# instead of calling a real model.
#
#   SHOTLATE_APP=/path/to/Shotlate.app scripts/assets/build-assets.sh
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="$here/../../public/shots"
snap="${SHOTLATE_APP:-$HOME/code/my/shotlate/build/Shotlate.app}/Contents/MacOS/Shotlate"
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
work="$(mktemp -d)"
trap 'rm -rf "$work"; [ -n "${mock:-}" ] && kill "$mock" 2>/dev/null || true' EXIT
mkdir -p "$out"

render() { "$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size="$2" --screenshot="$work/$1.png" "file://$here/$1.html" 2>/dev/null; }
webp() { magick -quiet "$1" -strip ${3:-} -quality 84 "$out/$2.webp"; }

render sample-window 640,300
render sample-doc 720,420

# Capture overlay, step by step.
"$snap" --ui-demo "$work/sample-window.png" "$work/ui" >/dev/null
# Crops are in 2x pixels of the 960 × 620 pt demo canvas; the sample window sits at (40, 40) pt.
webp "$work/ui/01-hover-window-magnifier.png" magnifier "-crop 1400x720+40+30 +repage -resize 1400x"
webp "$work/ui/03-selected.png" selected "-crop 1880x800+0+30 +repage -resize 1600x"
webp "$work/ui/08-after-escape-steps.png" annotate "-crop 1880x880+0+30 +repage -resize 1600x"
webp "$work/ui/12-ocr-panel.png" ocr "-crop 1920x880+0+30 +repage -resize 1600x"
webp "$work/ui/14-blur-mosaic-renumbered.png" mosaic "-crop 1400x680+40+30 +repage -resize 1400x"
magick -quiet "$work/ui/03-selected.png" -crop 1880x800+0+30 +repage -resize 1344x630^ -gravity northwest -crop 1200x630+0+0 +repage -strip "$out/../og.png"

# Clip of the capture flow.
list="$work/flow.txt"; : > "$list"
for f in 01-hover-window-magnifier 02-selecting 03-selected 04-rectangle-selected 05-mosaic-brush 06-numbers 08-after-escape-steps 12-ocr-panel 12-ocr-panel; do
  magick -quiet "$work/ui/$f.png" -crop 1920x920+0+30 +repage -resize 1280x614! "$work/f-$f.png"
  printf "file '%s'\nduration 1.3\n" "$work/f-$f.png" >> "$list"
done
ffmpeg -y -loglevel error -f concat -safe 0 -i "$list" -vf "fps=25,format=yuv420p" -c:v libx264 -crf 26 -movflags +faststart "$out/capture-flow.mp4"
webp "$work/f-03-selected.png" capture-flow-poster

# In-place translation through the real layout code.
node "$here/mock-translate.mjs" & mock=$!; sleep 1
DEEPSEEK_API_KEY=local "$snap" --translate-image "$work/sample-doc.png" "$work/translated.png" --engine llm --scale 2 -translate.baseURL http://127.0.0.1:8799 >/dev/null
webp "$work/sample-doc.png" translate-before "-resize 1200x"
webp "$work/translated.png" translate-after "-resize 1200x"
ffmpeg -y -loglevel error -loop 1 -t 2.2 -i "$work/sample-doc.png" -loop 1 -t 3 -i "$work/translated.png" -loop 1 -t 1.6 -i "$work/sample-doc.png" \
  -filter_complex "[0][1]xfade=transition=wiperight:duration=0.7:offset=1.5[a];[a][2]xfade=transition=wipeleft:duration=0.7:offset=3.8,scale=1200:-2,fps=25,format=yuv420p" \
  -c:v libx264 -crf 26 -movflags +faststart "$out/translate.mp4"

# Long screenshot (needs Screen Recording permission for the terminal). It captures a real area of the screen,
# so if the demo window wasn't in front the result is a single frame of whatever was there: keep the old image then.
if "$snap" --scroll-demo "$work/long.png" >/dev/null 2>&1 && [ "$(magick identify -format %h "$work/long.png")" -gt 2000 ]; then
  webp "$work/long.png" long "-resize 420x"
else
  echo "long screenshot not stitched; kept the existing long.webp" >&2
fi
echo "Wrote $(ls "$out" | wc -l | tr -d ' ') files to $out"
