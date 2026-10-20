import cacImage from '../assets/images/cac.webp'
import frontlineImage from '../assets/images/frontline-overlay.webp'
import fugerouImage from '../assets/images/fugerou.webp'
import pvpcImage from '../assets/images/pvpc.png'
import pvplbOverlay from '../assets/images/pvplb-overlay.png'
import relicImage from '../assets/images/relic.webp'
import uimodImage from '../assets/images/uimod-sarasa.webp'
import type { Project } from '../types'

export const PROJECTS: Project[] = [
  {
    id: 'hqhelper',
    category: 'production',
    name: { zh: 'HqHelper', en: 'HqHelper', ja: 'HqHelper' },
    desc: {
      zh: '全面的配方计算器，一站式的生产制作助手。',
      en: 'A comprehensive recipe calculator and all-in-one crafting assistant.',
      ja: '包括的なレシピ計算機と、生産制作をトータルに支えるオールインワンアシスタント。',
    },
    langs: ['zh', 'ja', 'en'],
    url: 'https://hqhelper.com',
    domain: 'hqhelper.com',
    cover: { type: 'hq' },
  },
  {
    id: 'cac',
    category: 'production',
    name: { zh: 'CAC 工具站', en: 'CAC Toolkit', ja: 'CAC ツール' },
    desc: {
      zh: '制定生产工具压缩/解压的标准，并提供相应在线工具。',
      en: 'A standard for compressing and decoding crafting actions, with an online tool.',
      ja: '制作アクションの圧縮・展開規格と、対応するオンラインツール。',
    },
    langs: ['zh', 'ja', 'en'],
    url: 'https://cac.nbb.fan',
    domain: 'cac.nbb.fan',
    cover: { type: 'image', src: cacImage, position: '50% 50%' },
  },
  {
    id: 'relic-helper',
    category: 'tools',
    name: { zh: '肝武Helper', en: '肝武Helper', ja: '肝武Helper' },
    desc: {
      zh: '记录、攻略与实用工具一体化的肝武助手。',
      en: 'A relic weapon companion for progress tracking, guides, and practical tools.',
      ja: 'レリックウェポンの記録・攻略・実用ツールをまとめたアシスタント。',
    },
    langs: ['zh'],
    url: 'https://relic.nbb.fan',
    domain: 'relic.nbb.fan',
    cover: { type: 'image', src: relicImage, position: '50% 40%' },
  },
  {
    id: 'pvp-calendar',
    category: 'tools',
    name: { zh: 'PvP日历', en: 'PvP Calendar', ja: 'PvPカレンダー' },
    desc: {
      zh: '追踪纷争前线与水晶冲突的轮换情况。',
      en: 'Tracks the rotation of Frontline and Crystalline Conflict.',
      ja: '紛争戦線とクリスタルコンフリクトのローテーションを確認できます。',
    },
    langs: ['zh', 'ja', 'en'],
    url: 'https://pvpc.nbb.fan',
    domain: 'pvpc.nbb.fan',
    cover: { type: 'image', src: pvpcImage, position: '50% 20%' },
  },
  {
    id: 'fugerou',
    category: 'act',
    name: { zh: 'fugerou', en: 'fugerou', ja: 'fugerou' },
    desc: {
      zh: '自用魔改版 Kagerou 伤害统计悬浮窗。',
      en: 'A personal, modified build of the Kagerou damage meter overlay.',
      ja: '個人用にカスタマイズした Kagerou ダメージ計測オーバーレイ。',
    },
    langs: ['zh'],
    url: 'https://bbs.nga.cn/read.php?tid=47496322',
    domain: 'bbs.nga.cn',
    cover: { type: 'image', src: fugerouImage, position: '50% 50%' },
  },
  {
    id: 'frontline-overlay',
    category: 'act',
    name: { zh: '纷争前线悬浮窗', en: 'Frontline Overlay', ja: '紛争戦線オーバーレイ' },
    desc: {
      zh: '统计并计算战场点分，记录 PvP 场次日志。',
      en: 'Calculates Frontline scores and keeps a log of PvP matches.',
      ja: '紛争戦線の得点を集計・計算し、PvPの試合ログを記録します。',
    },
    langs: ['zh'],
    url: 'https://github.com/InfSein/frontline-overlay',
    domain: 'github.com',
    cover: { type: 'image', src: frontlineImage, position: '50% 45%' },
  },
  {
    id: 'pvp-lb-monitor',
    category: 'act',
    name: { zh: 'PvP LB监控', en: 'PvP LB Monitor', ja: 'PvP LBモニター' },
    desc: {
      zh: '监测自身 LB 的剩余积攒时间。',
      en: 'Monitors the remaining charge time of your limit break.',
      ja: '自身のLBの残りチャージ時間を監視します。',
    },
    langs: ['zh', 'en'],
    url: 'https://github.com/InfSein/pvp-lb-monitor',
    domain: 'github.com',
    cover: { type: 'lb', src: pvplbOverlay },
  },
  {
    id: 'sarasa-mod',
    category: 'mod',
    name: {
      zh: '字体MOD：更纱黑体',
      en: 'UI Font Mod: Sarasa Gothic',
      ja: 'UIフォントMOD：Sarasa Gothic',
    },
    desc: {
      zh: '将游戏的 UI 字体替换为国际服风格的字体。',
      en: 'Replaces the game UI typeface with a Global-style font.',
      ja: 'ゲームUIのフォントを海外版スタイルの書体に置き換えます。',
    },
    langs: ['zh'],
    url: 'https://bbs.nga.cn/read.php?tid=43352299',
    domain: 'bbs.nga.cn',
    cover: { type: 'image', src: uimodImage, position: '50% 40%' },
  },
]
