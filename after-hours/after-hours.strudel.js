/*
  @title The Weeknd - After Hours (Strudel 重编排)
  @details 由 MIDI 转写整理：按段落拆分 + 原始人声 stem
*/

// 109 BPM，4/4 —— 一个 cycle 就是一小节（约 2.2 秒）
setcpm(109 / 4);

samples({
  vox: 'after-hours/vocals.flac'
}, 'https://raw.githubusercontent.com/yiichuan/strudel-samples/main/');

// ───────────── 乐器 ─────────────
// 每个乐器是一个函数：传入 mini-notation，返回已经设置好音色的 pattern

// Grand Piano (Classic) — 低音 C3 十六分脉冲 / 和弦
const pulse = p => note(p).sound("piano").gain(.38).release(.12);
// Smooth Synth — 和弦 pad（原 supersquare，Strudel 无此音色，换成 square + 低通）
const pad = p => note(p).sound("square").lpf(1600).gain(.45).release(.41);
// Grand Piano — 主旋律
const lead = p => note(p).sound("piano").gain(.62).release(.25);
// 2023 Drum Kit — 拍手 / 边击 / 踩镲（原 perc:D#1/E1/G1 → cp/rim/hh）
const perc = p => s(p).bank("RolandTR808").gain(.34);
// 909 Drum Kit — 底鼓 / 军鼓 / 踩镲 / 镲片
const drums = p => s(p).bank("RolandTR909").gain(.31);
// Bass — 正弦低音
const sub = p => note(p).sound("sine").gain(.55).release(.66);
// Synth Pluck — 琶音拨弦（原 superzow → sawtooth）
const pluck = p => note(p).sound("sawtooth").lpf(2400).gain(.34).release(.05);
// Strings — 弦乐点缀
const strings = p => note(p).sound("sawtooth").gain(.59).release(.08);
// Electric Drum Kit — 开镲
const openhat = p => s(p).bank("RolandTR909").gain(.38);
// 2013 Drum Kit — 吊镲
const crash = p => s(p).bank("RolandTR909").gain(.38);
// Bass Guitar — 律动贝斯线
const bassgtr = p => note(p).sound("sine").gain(.73).release(.08);
// Pop Synth — 副歌低音合成器（原 supersquare → square）
const popsynth = p => note(p).sound("square").lpf(1200).gain(.58).release(.66);
// 8-Bit Sine — supersaw 分解和弦
const arp = p => note(p).sound("supersaw").gain(.34).release(.17);
// Sitar — 高音锯齿 lead
const sitar = p => note(p).sound("sawtooth").gain(.40).release(.08);
// Distortion Guitar — 尼龙吉他点缀
const guitar = p => note(p).sound("gm_acoustic_guitar_nylon").gain(.27).release(.12);

// ───────────── intro（4 小节，第 1–4 小节）：前奏：钢琴脉冲 ─────────────
let intro = stack(
  pulse("<C3*16>")
);

// ───────────── intro_pad（8 小节，第 5–12 小节）：前奏 2：pad 和主旋律进入 ─────────────
let intro_pad = stack(
  pulse(`<
    C3*16 C3*16 C3*16 [[C3,F4,F3]@4 C3 C3 C3 [C3,D#4,D#3]@4 C3 C3 C3 [C3,D4,D3]@4 C3 C3 C3 [C3,D#4,D#3]@2 C3 [C3,D4,D3]@2 C3]
    [[C4,C3,C3]@2 C3 C3 C3 C3 C3 C3 C3 C3 C3 C3 C3 C3 C3 C3 C3] C3*16 C3*16 C3*16
  >`),
  pad(`<
    [D#2,C2] [C2,D#2] [A#1,G1] [G1,A#1]
    [D#2,C2] [C2,D#2] [A#1,G1] [F1,G#1]
  >`),
  lead(`<
    - [G4 F4@2 F4@2 D#4 D#4@4 -@3 C4 D#4@2] [F4@3 G4@3 G4@3 -@7] -
    [-@8 G4 A#4@2 F4@2 D#4 F4@2] [D#4@2 -@11 C4 C4 D#4] [F4@3 G4@3 G4@2 G4 F4@3 G4@2 G4 F4@3 -@10 G4@2 [C5,C5]@2]@2
  >`)
);

// ───────────── verse_1a（4 小节，第 13–16 小节）：主歌 1a：鼓和低音进入 ─────────────
let verse_1a = stack(
  lead("<[-@4 G4@2 G4@6 F4@2 A#4@4 G#4@4 G4@4 D#4@3 -@3]@2 - [-@6 G4 [C5,C5]]>"),
  perc("<[cp,rim]>"),
  drums("<bd>"),
  sub("<C2>")
);

// ───────────── break_1（4 小节，第 17–20 小节）：小停顿：钢琴和弦 + 旋律 ─────────────
let break_1 = stack(
  pulse("<- - [-@8 [C5,C4]@3 [A#4,A#3]@3 [G4,G3]@3 [G4,G3]@3 -@12]@2>"),
  lead(`<
    [-@4 G4@2 G4@6 F4@2 A#4@4 G#4@4 G4@4 D#4@3 -@3]@2 - [-@5 C4 D#4 G4@3 D#4 D#4@3 C4 C4@3 -@4 C4 F4@3 D4 A#3@3 G3 F3]@4
  >`)
);

// ───────────── verse_1b（16 小节，第 21–36 小节）：主歌 1b ─────────────
let verse_1b = stack(
  lead(`<
    [-@5 C4 D#4 G4@3 D#4 D#4@3 C4 C4@3 -@4 C4 F4@3 D4 A#3@3 G3 F3]@4
    [-@6 D#4 G4@3 D#4 D#4@3 C4 C4@3 -@4 C4 F4@3 D4 A#3@3 G3 F3]@4
    [-@6 D#4 G4@3 D#4 D#4@3 C4 C4@3 -@4 C4 F4@3 D4 A#3@3 G3 F3]@4
    [-@6 D#4 G4@3 D#4 D#4@3 C4 C4@3 -@4 C4 F4@3 D4 D#4@2 D4@2 A#3]@4
    [C4@2 D#4@6 -@4 D#4@2 G4@6 D#4@2 D#4@6 C4@2 F4@4 D4@2 C4@2 A#3@3 -@5 F4 D#4]@3
  >`).early(1),
  perc("<[cp,rim]>"),
  drums(`<
    bd [bd,bd] [bd,bd] [bd,bd]
    [bd,bd] bd bd bd
    bd [bd,bd] [bd,bd] [bd,bd]
    [bd,bd] [bd,bd] [bd,bd] [bd,bd]
  >`),
  sub("<C2 C2 A#1 [G#1 -]>")
);

// ───────────── verse_1c（8 小节，第 37–44 小节）：主歌 1c：琶音拨弦 ─────────────
let verse_1c = stack(
  lead(`<
    [C4@2 D#4@6 -@4 D#4@2 G4@6 D#4@2 D#4@6 C4@2 F4@4 D4@2 C4@2 A#3@3 -@5 F4 D#4]@3 [F4@3 D#4@5 G4@3 G#4@3 G4 F4]
    [D#4@3 -@9 D#4@2 A#4@2] [G4 F4 D#4 D#4@3 F4 D#4@5 C5 A#4 G4 D#4]@2 [F4@6 D#4@8 G4@6 -@8 G4@2 C5@6 G4@2 A#4@6 D#4@2 D#4@4 G4@2 G4@2 F4@6 D#4@2 F4 G4]@4
  >`).early(1),
  drums(`<
    bd - - -
    - - - -
  >`),
  sub("<- C2 A#1 [G#1 -]>"),
  pluck(`<
    [-@4 D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3] [D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3] [D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3] [D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3]
    [D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3] [D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3] [D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3] [D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3 D#3 C3 G3 D#3]
  >`)
);

// ───────────── interlude（4 小节，第 45–48 小节）：间奏：钢琴脉冲回归 ─────────────
let interlude = stack(
  pulse("<C3*16>"),
  lead(`<
    [F4@6 D#4@8 G4@6 -@8 G4@2 C5@6 G4@2 A#4@6 D#4@2 D#4@4 G4@2 G4@2 F4@6 D#4@2 F4 G4]@4
    [G4@3 F4@5 -@6 G4@2] [G4@2 D#4 F4@2 -@9 G4@2]
  >`).early(2)
);

// ───────────── breakdown（12 小节，第 49–60 小节）：过渡：弦乐 + pad ─────────────
let breakdown = stack(
  pad(`<
    - - - -
    [[D#3,C3,D#3,C3]@7 -@5 [D#3,C3,D#3,C3]@2 -@2] [[D#3,C3,D#3,C3]@7 -@5 [D#3,C3,D#3,C3]@2 -@2] [[A#2,G2,A#2,G2]@7 -@5 [A#2,G2,A#2,G2]@2 -@2] [[G#2,F2,G#2,F2]@7 -@5 [G#2,F2,G#2,F2]@2 -@2]
    [[D#3,C3,D#3,C3]@7 -@5 [D#3,C3,D#3,C3]@2 -@2] [[D#3,C3,D#3,C3]@7 -@5 [D#3,C3,D#3,C3]@2 -@2] [[A#2,G2,A#2,G2]@7 -@5 [A#2,G2,A#2,G2]@2 -@2] [[G#2,F2,G#2,F2]@7 -@5 [G#2,F2,G#2,F2]@2 -@2]
  >`),
  lead(`<
    [F4@4 D#4@2 D#4@6 C4@2 F4@4 D#4 D4@2 D#4 C4@2 D4 A#3@2 C4 G3@4]@2 - -
    - - - -
    - - - -
  >`),
  strings(`<
    - - - [-@7 [C3,C3]]
    - [-@7 [C3,C3]] - [-@7 [C3,C3]]
    - [-@7 [C3,C3]] - [-@7 [C3,C3]]
  >`)
);

// ───────────── groove_in（8 小节，第 61–68 小节）：律动进入：贝斯吉他、开镲、吊镲 ─────────────
let groove_in = stack(
  pad(`<
    [[D#3,C3]@7 -@5 [D#3,C3]@2 -@2] [[D#3,C3]@7 -@5 [D#3,C3]@2 -@2] [[A#2,G2]@7 -@5 [A#2,G2]@2 -@2] [[G#2,F2]@7 -@5 [G#2,F2]@2 -@2]
  >`),
  lead(`<
    - - - -
    - - - [-@7 F4]
  >`),
  perc("<[rim hh rim hh]>"),
  drums(`<
    [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh]
  >`),
  strings(`<
    - [-@7 C3] - [-@7 C3]
    - [-@7 C3] - -
  >`),
  openhat(`<
    oh - - -
    - - - -
  >`),
  crash(`<
    cr - - -
    - - - -
  >`),
  bassgtr(`<
    [-@2 C2@2 -@2 C2@2 -@2 C2@2 -@2 C2 D2@2 - C2@2 -@2 C2@2 -@2 C2@2 - C2 D2 D#2]@2 [-@2 G1@2 -@2 G1@2 -@2 G1@2 - G1 A1 A#1@2 - F1@2 -@2 F1@2 -@2 F1@2 -@2 D2 D#2]@2
  >`)
);

// ───────────── groove（16 小节，第 69–84 小节）：律动段 ─────────────
let groove = stack(
  lead(`<
    [F4@2 D#4 D#4@3 C4@3 -@7] [D#4@2 F4 F4@2 D#4 F4@2 A#4@2 G4 G4@2 F4 F4@2] [F4@2 D#4 D#4@3 C4@2 -@8] [D#4@2 F4 F4@2 D#4 F4@2 A#4@2 G4 G4@2 F4 F4@2]
    [F4@2 D#4 D#4@3 C4@2 -@8] [D#4@2 F4 F4@2 D#4 F4@2 A#4@2 G4 G4@2 F4@3] [D#4@3 -@9 G4@2 F4@4 -@11 D#4 F4@2]@2
    [F4@2 D#4 D#4@3 C4@2 -@8] [D#4@2 F4 F4@2 D#4 F4@2 A#4@2 G4 G4@2 F4 F4@2] [F4@2 D#4 D#4@3 F4@2 -@8] [D#4@2 F4 F4@2 D#4 F4@2 A#4@2 G4 G4@2 F4 G4@2]
    [G4@3 A#4@3 D#4 F4 D#4@4 -@4] [D#4@2 F4 F4@2 D#4 F4@2 A#4@3 G4@3 F4@2] [F4@2 -@4 G4 F4@2 -@5 [D#4,D#5]@2]@2
  >`),
  perc(`<
    [- - - hh] [rim hh rim hh] [rim hh rim hh] [rim hh rim hh]
    [rim hh rim hh] [rim hh rim hh] [rim hh rim hh] [rim hh rim hh]
    [rim hh rim hh] [rim hh rim hh] [rim hh rim hh] [rim hh rim hh]
    [rim hh rim hh] [rim hh rim hh] [rim hh rim hh] [rim hh rim hh]
  >`),
  drums(`<
    [- - - - - - - - - - - - [bd,sd,hh] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh]
    [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh]
    [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh]
    [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh]
  >`),
  openhat(`<
    [- - - oh] - - -
    - - - -
    oh - - -
    - - - -
  >`),
  crash(`<
    [- - - cr] - - -
    - - - -
    cr - - -
    - - - -
  >`),
  bassgtr(`<
    [-@14 C2 D2@2 - C2@2 -@2 C2@2 -@2 C2@2 - C2 D2 D#2]@2 [-@2 G1@2 -@2 G1@2 -@2 G1@2 - G1 A1 A#1@2 - F1@2 -@2 F1@2 -@2 F1@2 -@2 D2 D#2]@2
    [-@2 C2@2 -@2 C2@2 -@2 C2@2 -@2 C2 D2@2 - C2@2 -@2 C2@2 -@2 C2@2 - C2 D2 D#2]@2 [-@2 G1@2 -@2 G1@2 -@2 G1@2 - G1 A1 A#1@2 - F1@2 -@2 F1@2 -@2 F1@2 -@2 D2 D#2]@2
    [-@2 C2@2 -@2 C2@2 -@2 C2@2 -@2 C2 D2@2 - C2@2 -@2 C2@2 -@2 C2@2 - C2 D2 D#2]@2 [-@2 G1@2 -@2 G1@2 -@2 G1@2 - G1 A1 A#1@2 - F1@2 -@2 F1@2 -@2 F1@2 -@2 D2 D#2]@2
    [-@2 C2@2 -@2 C2@2 -@2 C2@2 -@2 C2 D2@2 - C2@2 -@2 C2@2 -@2 C2@2 - C2 D2 D#2]@2 [-@2 G1@2 -@2 G1@2 -@2 G1@2 - G1 A1 A#1@2 - F1@2 -@2 F1@2 -@2 F1@2 -@2 D2 D#2]@2
  >`)
);

// ───────────── hook_1（8 小节，第 85–92 小节）：副歌 1 ─────────────
let hook_1 = stack(
  lead(`<
    [[G4,G5] [D#4,D#5]] [[G4,G5] [G#4,G#5] [A#4,A#5] [G#4,G#5]@2 [G4,G5] [D#4,D#5]@2] [[F4,F5]@3 [G4,G5] [D#4,D#5]@4] [[G4,G5] [G#4,G#5] [A#4,A#5] [G#4,G#5]@2 [G4,G5] [D#4,D#5]@2]
    [[F4,F5]@3 [G4,G5] [D#4,D#5]@4] [[G4,G5]@2 [G#4,G#5]@2 [A#4,A#5]@2 [G#4,G#5]@4 [G4,G5]@2 [D#4,D#5]@2 [D#4,D#5] [C4,C5]] [[A#3,A#4]@12 [G4,G5]@2 [F4,F5]@16 D#4 F4]@2
  >`),
  perc(`<
    [- - - hh] [rim hh rim hh] [rim hh rim hh] [rim hh rim hh]
    [rim hh rim hh] [rim hh rim hh] [rim hh rim hh] [rim hh rim hh]
  >`),
  drums(`<
    [- - - - - - - - - - - - [bd,sd,hh,cr] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh]
    [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh]
  >`),
  sub(`<
    [-@3 [C2,C3]@5]@2 [G1,G2] [F1,F2]
    [C2,C3] [C2,C3] [G1,G2] F1
  >`),
  openhat(`<
    [- - - oh] - - -
    - - - -
  >`),
  crash(`<
    [- - - cr] - - -
    - - - -
  >`),
  popsynth(`<
    [-@3 C2@5]@2 G1 F1
    C2 C2 G1 F1
  >`)
);

// ───────────── verse_2（16 小节，第 93–108 小节）：主歌 2：supersaw 分解和弦 ─────────────
let verse_2 = stack(
  lead(`<
    [F4@2 D#4 D#4@3 C4@4 -@6] [D#4@2 F4 F4@2 D#4 F4@2 A#4@2 G4 G4@2 F4 F4@2] [F4@2 D#4 D#4@3 C4@2 -@8] [D#4@2 F4 F4@2 D#4 F4@2 A#4@2 G4 G4@2 F4 F4@2]
    [F4@2 D#4 D#4@3 C4@2 -@8] [D#4@2 F4 F4@2 D#4 F4@2 A#4@3 G4@3 D#4@2] [F4@4 -@6 D#4@2 G4@2 G#4 G4] [F4@3 G4@6 -@5 D#4 F4]
    [F4@2 D#4 D#4@3 C4@3 -@7] [D#4@2 F4 F4@2 D#4 F4@2 A#4@2 G4 G4@2 F4 F4@2] [F4@2 D#4 D#4@3 C4@2 -@8] [D#4@2 F4 F4@2 D#4 F4@2 A#4@2 G4 G4@2 F4 G4@2]
    [G4@3 A#4@3 D#4 F4 D#4@4 -@4] [C5@3 A#4@3 G4@2 G4@2 F4@2 F4@4] [D#4@2 F4@6 -@4 A#4@2 G#4 G4] [F4@3 G4@5 -@4 [D#4,D#5]@4]
  >`),
  perc("<[rim hh rim hh]>"),
  drums(`<
    [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh]
  >`),
  openhat(`<
    oh - - -
    - - - -
  >`),
  crash(`<
    cr - - -
    - - - -
  >`),
  bassgtr(`<
    [-@2 C2@2 -@2 C2@2 -@2 C2@2 -@2 C2 D2@2 - C2@2 -@2 C2@2 -@2 C2@2 - C2 D2 D#2]@2 [-@2 G1@2 -@2 G1@2 -@2 G1@2 - G1 A1 A#1@2 - F1@2 -@2 F1@2 -@2 F1@2 -@2 D2 D#2]@2
  >`),
  arp(`<
    [C3 G2 [G3,D#3] D#3] [C3 - [G3,D#3] D#3] [F3 A#2 [D4,A#3] A#3] [G#3 A#2 [C4,G#3] G#3]
  >`)
);

// ───────────── hook_2（16 小节，第 109–124 小节）：副歌 2 ─────────────
let hook_2 = stack(
  lead(`<
    [[G4,G5] [D#4,D#5]] [[G4,G5] [G#4,G#5] [A#4,A#5] [G#4,G#5]@2 [G4,G5] [D#4,D#5]@2] [[F4,F5]@3 [G4,G5] [D#4,D#5]@4] [[G4,G5] [G#4,G#5] [A#4,A#5] [G#4,G#5]@2 [G4,G5] [D#4,D#5]@2]
    [[F4,F5]@3 [G4,G5] [D#4,D#5]@4] [[G4,G5]@2 [G#4,G#5]@2 [A#4,A#5]@2 [G#4,G#5]@4 [G4,G5]@2 [D#4,D#5]@2 [D#4,D#5] [C4,C5]] [[A#3,A#4]@6 [G4,G5] [F4,F5]@7 [D#5,D#4] [A#5,A#4]]@2
    [[A#5,A#4] [D#5,D#4]] [[G4,G5] [G#4,G#5] [A#4,A#5] [A#4,A#5]@2 [G#4,G#5] [G4,G5] [D#4,D#5]] [[F4,F5]@3 [G4,G5] [D#4,D#5]@2 -@2] [[G4,G5] [G#4,G#5] [A#4,A#5] [C5,C6]@2 [D#4,D#5] [D#4,D#5]@2]
    [[F4,F5]@6 [G4,G5]@2 [G#4,G#5] [G4,G5] [F4,F5] [D#4,D#5]@5] [[G4,G5]@2 [G#4,G#5]@2 [A#4,A#5]@2 [G#4,G#5]@4 [G4,G5]@2 [D#4,D#5]@2 [D#4,D#5] [C4,C5]] [[A#3,A#4]@12 [G4,G5]@2 [G#4,G#5] [G4,G5]] [[F4,F5]@3 [G4,G5]@3 -@6 [D#4,D#5]@2 [C4,C5]@10 -@8]@2
  >`),
  perc(`<
    [- - - hh] [rim hh rim hh] [rim hh rim hh] [rim hh rim hh]
    [rim hh rim hh] [rim hh rim hh] [rim hh rim hh] [rim hh rim hh]
    [rim hh rim hh] [rim hh rim hh] [rim hh rim hh] [rim hh rim hh]
    [rim hh rim hh] [rim hh rim hh] [rim hh rim hh] [rim hh rim hh]
  >`),
  drums(`<
    [- - - - - - - - - - - - [bd,sd,hh,cr] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh]
    [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh]
    [[hh,bd,cr] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh]
    [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh] [[hh,bd] hh hh hh [hh,bd,sd] hh hh hh [hh,bd] hh hh hh [hh,bd,sd] hh hh hh]
  >`),
  sub(`<
    [-@3 [C2,C3]@5]@2 [G1,G2] [F1,F2]
    [C2,C3] [C2,C3] [G1,G2] F1
    [C2,C3] [C2,C3] [G1,G2] F1
    [C2,C3] [C2,C3] [G1,G2] F1
  >`),
  openhat(`<
    [- - - oh] - - -
    - - - -
    oh - - -
    - - - -
  >`),
  crash(`<
    [- - - cr] - - -
    - - - -
    cr - - -
    - - - -
  >`),
  popsynth(`<
    [-@3 C2@5]@2 G1 F1
    C2 C2 G1 F1
    C2 C2 G1 F1
    C2 C2 G1 F1
  >`)
);

// ───────────── bridge（20 小节，第 125–144 小节）：桥段：sitar + 吉他 ─────────────
let bridge = stack(
  pulse(`<
    [[D#4,C4,G4]@4 -@9 [D#4,C4,G4]@3] [[D#4,C4,G4]@3 -@10 [D#4,C4,G4]@3] [[A#3,G3,D4]@3 -@9 [A#3,G3,D4]@3 [G#3,F3,C4]@3 -@10 [G#3,F3,C4]@4]@2
    - - - -
    - - - -
    - - - -
    - - - -
  >`),
  pad(`<
    [[D#3,C3,D#3,C3]@5 - [D#3,C3,D#3,C3] -] [[D#3,C3,D#3,C3]@5 - [D#3,C3,D#3,C3] -] [[A#2,G2,A#2,G2]@5 - [A#2,G2,A#2,G2] -] [[G#2,F2,G#2,F2]@5 - [G#2,F2,G#2,F2] -]
    [[A#4,C5,A#3,D#4,C4]@3 [A#3,D#4,C4] [A#3,D#4,C4] [A#3,D#4,C4]] [[A#3,D#4,C4] [A#3,D#4,C4] -@2] [[A#4,C5,A#3,F3,G3]@3 [A#3,F3,G3] [A#3,F3,G3] [A#3,F3,G3]] [[A#3,F3,G3] [A#3,F3,G3] -@2]
    [[G#4,C5,F4,D#3,C3,G#2]@3 [D#3,C3,G#2] [D#3,C3,G#2] [D#3,C3,G#2]] [[D#3,C3,G#2] [D#3,C3,G#2] -@2] [[C5,D#3,A#3,G3]@3 [D#3,A#3,G3] [D#3,A#3,G3] [D#3,A#3,G3]] [[D#3,A#3,G3] [D#3,A#3,G3] -@2]
    [[F3,C4,G#3] [F3,C4,G#3] [F3,C4,G#3] [F3,C4,G#3]] [[F3,C4,G#3] [F3,C4,G#3] -@2] [[G3,D4,A#3] [G3,D4,A#3] [G3,D4,A#3] [G3,D4,A#3]] [[G3,D4,A#3] [G3,D4,A#3] -@2]
    [[C4,G4,F4] [C4,G4,F4] [C4,G4,F4] [C4,G4,F4]] [[C4,G4,F4] [C4,G4,F4] -@2] [[A#3,D#4,C4] [A#3,D#4,C4] [A#3,D#4,C4] [A#3,D#4,C4]] [[A#3,D#4,C4] [A#3,D#4,C4] -@2]
  >`),
  lead(`<
    [[F4,F5]@3 [G4,G5]@3 -@6 [D#4,D#5]@2 [C4,C5]@10 -@8]@2 - -
    - [-@6 D#4 D4@3 C4 A#3@3 C4 G3@2 -@5 A#3 G#3@3 G3 D#3@3 G3 F3]@4
    [D#3 C3@3 -@8 D#4@2 D4@6 C4@2 A#3@6 D#3@2 G3 D#3]@2 [G3@4 -@7 D#4 D#4 F4 G4 G4@2 D#4 F4@3 G4@2 -@7 F4@2]@2
    [F4@8 D#4 -@3 D#4@4 -@8 F4@8 F4@8 D#4 -@3 D#4@4 -@8 F4@8] [F4@8 D#4 -@3 D#4@4 -@8 C4@16 -@16 F4@8] [F4@8 D#4 -@3 D#4@4 -@8 F4@8 F4@8 D#4 -@3 D#4@4 -@8 F4@8] [F4@8 D#4 -@3 D#4@4 -@8 C4@16 -@16 F4@8]
    [F4@8 D#4 -@3 D#4@4 -@8 F4@8 F4@8 D#4 -@3 D#4@4 -@8 G4@8] [F4@12 G4@12 D#4@4 C4 -@11 C4@4 -@8 C4 -@3 D#4@4 C4@4] [D#4@4 F4@4 G4@4 A#4@2 F4 D#4] [F4@3 G4@3 -@2 [C5,C6]@3 [A#4,A#5]@3 [G4,G5]@2]
  >`).early(1),
  strings(`<
    - [-@14 [C3,C3] -] - [-@14 [C3,C3] -]
    - - - -
    - - - -
    - - - [-@3 C5@3 -@2]
    - - - -
  >`),
  arp(`<
    - - - -
    - - - -
    - - - -
    - [-@3 [D#2,D#3]@2 [C2,C3]@2 -] - -
    - - - -
  >`),
  sitar(`<
    - - - [-@7 C6]
    [C6@2 [A#4,A#5] - C6@2 [A#4,A#5] - D#6@2 [C5,C6] D#6@2 [C5,C6] D#6@2 [C5,C6] D#6@2 -@15]@2 [D6@2 [A#4,C6] D6@2 [A#4,C6] D6@2 [A#4,C6] D6@2 -@5] -
    [C6@2 [A#5,G#4] C6@2 [A#5,G#4] C6@2 [A#5,G#4] C6@2 -@5] [-@30 C6 D#6] [[G6,F6]@4 C6 [F6,D#5,D#6]@2 F6 G6@4 C6 [F6,D#5,D#6]@2 F6 G6@4 C6 [F6,D#5,D#6]@2 F6 G6@4 -@9] [-@8 [G#6,G#6]@2 [F#6,D#5] G#6@2 [F#6,D#5] G#6@2]
    [G6@2 [F6,D#5] G6@2 [F6,D#5] G6@2 [F6,D#5] G6@2 -@5] - [[D#5,D#6]@5 [C5,C6]@6 [D#5,D#6]@5 [C5,C6]@5 [D#5,D#6]@6 [G5,G6]@5 [D#5,D#6]@5 [G5,G6]@6 [D#5,D#6]@5 [G5,G6]@5 [D#5,D#6]@6 [G5,G6]@5] -
    [[D#5,D#6]@5 [C5,C6]@6 [D#5,D#6]@5 [C5,C6]@5 [D#5,D#6]@6 [G5,G6]@5 [D#5,D#6]@5 [G5,G6]@6 [D#5,D#6]@5 [G5,G6]@5 [D#5,D#6]@6 [A#5,A#6]@5] [[G#5,G#6]@5 [A#5,A#6]@6 [G#5,G#6]@5 [A#5,A#6]@5 [G#5,G#6]@6 [A#5,A#6]@5 -@32] [C6@2 - C6 [D#5,D#6]@2 - [D#5,D#6] [F5,F6]@2 -@6] -
  >`),
  guitar(`<
    - - - [-@13 C5@3]
    [-@3 C5@3 [D#5,C5]@3 C5@2 [D#5,C5]@3 C5@2 [D#5,C5]@3 -] - [[D5,C5]@3 A#4@2 [D5,A#4]@3 A#4@2 [D5,A#4]@3 -@7] -
    [-@4 [G#4,C5]@12 G#4 -@3 [G#4,C5]@12 G#4@4 C5@12 -@24] - - -
    - - [-@16 [C5,C6]@5 [D#5,D#6]@6 [G5,G6]@5 -@32] -
    [-@16 [C5,C6]@5 [D#5,D#6]@6 [G5,G6]@5 -@32] - - -
  >`)
);

// ───────────── outro（18 小节，第 145–162 小节）：尾奏 ─────────────
let outro = stack(
  pad(`<
    [[D#2,C2,D#3,C3] [D#2,C2,D#3,C3]] - [[A#1,G1,A#2,G2] [A#1,G1,A#2,G2]] -
    [[G#1,F1,G#2,F2] [G#1,F1,G#2,F2]] - [[C1,A#1,C2,A#1] [C1,A#1,C2,A#1]] [[D2,C2,D1,D3,C3,D2] [D2,C2,D1,D3,C3,D2]]
    [[D#2,C2,D#3,C3] [D#2,C2,D#3,C3]] - [[A#1,G1,A#2,G2] [A#1,G1,A#2,G2]] -
    [[G#1,F1,G#2,F2] [G#1,F1,G#2,F2]] - [[C1,A#1,C2,A#1] [C1,A#1,C2,A#1]] [[D2,C2,D1,D3,C3,D2] [D2,C2,D1,D3,C3,D2]]
    [C2,C1,C3,C2] -
  >`),
  lead(`<
    [[G4,G5] [D#4,D#5]] [[G4,G5] [G#4,G#5] [A#4,A#5] [G#4,G#5]@2 [G4,G5] [D#4,D#5]@2] [[F4,F5]@3 [G4,G5] [D#4,D#5]@4] [[G4,G5] [G#4,G#5] [A#4,A#5] [G#4,G#5]@2 [G4,G5] [D#4,D#5]@2]
    [[F4,F5]@3 [G4,G5] [D#4,D#5]@4] [[G4,G5]@2 [G#4,G#5]@2 [A#4,A#5]@2 [G#4,G#5]@4 [G4,G5]@2 [D#4,D#5]@2 [D#4,D#5] [C4,C5]] [[A#3,A#4]@6 [G4,G5] [F4,F5]@7 [D#5,D#4] [A#5,A#4]]@2
    [[A#5,A#4] [D#5,D#4]] [[G4,G5] [G#4,G#5] [A#4,A#5] [A#4,A#5]@2 [G#4,G#5] [G4,G5] [D#4,D#5]] [[F4,F5]@3 [G4,G5] [D#4,D#5]@2 -@2] [[G4,G5] [G#4,G#5] [A#4,A#5] [C5,C6]@2 [D#4,D#5] [D#4,D#5]@2]
    [[F4,F5]@6 [G4,G5]@2 [G#4,G#5] [G4,G5] [F4,F5] [D#4,D#5]@5] [[G4,G5]@2 [G#4,G#5]@2 [A#4,A#5]@2 [G#4,G#5]@4 [G4,G5]@2 [D#4,D#5]@2 [D#4,D#5] [C4,C5]] [[A#3,A#4]@3 [G4,G5]] [[F4,F5]@48 -@5 [D#5,D#4]@6 [D5,D4]@5]
    [C5,C4] -
  >`)
);

// ───────────── 人声 ─────────────
// 原曲速度在 106.7–110 BPM 之间轻微浮动，固定 109 BPM 平均切片会累积最多约 0.1 秒的误差。
// 所以这里按 MIDI 速度表算出每一小节在人声文件里的真实起点（占全长的比例），
// 每个 cycle 从对应位置播放，并用 clip(1) 在小节末尾切断 —— 和示例里的 slice 思路一样，只是更准。
const VOX_BEGIN = [
  0.000000, 0.006232, 0.012326, 0.018420, 0.024513, 0.030607, 0.036728, 0.042822,
  0.048916, 0.055010, 0.061104, 0.067197, 0.073291, 0.079385, 0.085479, 0.091572,
  0.097694, 0.103788, 0.109881, 0.115975, 0.122069, 0.128163, 0.134284, 0.140378,
  0.146472, 0.152565, 0.158659, 0.164753, 0.170847, 0.176940, 0.183062, 0.189156,
  0.195249, 0.201343, 0.207437, 0.213531, 0.219652, 0.225746, 0.231839, 0.237933,
  0.244055, 0.250148, 0.256242, 0.262336, 0.268430, 0.274551, 0.280645, 0.286739,
  0.292832, 0.298926, 0.305020, 0.311114, 0.317235, 0.323329, 0.329423, 0.335516,
  0.341610, 0.347704, 0.353798, 0.359919, 0.366013, 0.372106, 0.378200, 0.384294,
  0.390415, 0.396509, 0.402603, 0.408697, 0.414790, 0.420912, 0.427006, 0.433099,
  0.439193, 0.445287, 0.451381, 0.457474, 0.463596, 0.469690, 0.475783, 0.481877,
  0.487971, 0.494065, 0.500186, 0.506280, 0.512373, 0.518467, 0.524561, 0.530682,
  0.536776, 0.542870, 0.548964, 0.555048, 0.561142, 0.567263, 0.573357, 0.579451,
  0.585544, 0.591638, 0.597732, 0.603826, 0.609947, 0.616041, 0.622135, 0.628228,
  0.634322, 0.640443, 0.646537, 0.652631, 0.658725, 0.664819, 0.670940, 0.677034,
  0.683127, 0.689221, 0.695315, 0.701409, 0.707530, 0.713624, 0.719718, 0.725811,
  0.731905, 0.737999, 0.744120, 0.750214, 0.756308, 0.762402, 0.768495, 0.774589,
  0.780683, 0.786777, 0.792871, 0.798964, 0.805058, 0.811152, 0.817246, 0.823339,
  0.829433, 0.835554, 0.841648, 0.847770, 0.853863, 0.859985, 0.866106, 0.872200,
  0.878321, 0.884470, 0.890564, 0.896741, 0.902835, 0.908928, 0.915022, 0.921116,
  0.927237, 0.933358, 0.939452, 0.945491, 0.951584, 0.957678, 0.963772, 0.969977,
  0.976071, 0.982164, 0.988258, 0.994352
];
let vocals = s("vox").begin(slowcat(...VOX_BEGIN)).clip(1).release(.02).gain(1);

// ───────────── 编排 ─────────────
let instrumental = arrange(
  [ 4, intro],
  [ 8, intro_pad],
  [ 4, verse_1a],
  [ 4, break_1],
  [16, verse_1b],
  [ 8, verse_1c],
  [ 4, interlude],
  [12, breakdown],
  [ 8, groove_in],
  [16, groove],
  [ 8, hook_1],
  [16, verse_2],
  [16, hook_2],
  [20, bridge],
  [18, outro],
  [ 2, silence]  // 留两小节给人声尾音，并让伴奏与人声总长一致（164 小节），循环时不会错位
);

stack(instrumental, vocals);
