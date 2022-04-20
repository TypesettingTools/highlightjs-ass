/*
Language: Advanced SubStation Alpha
Author: Sepro
Description: Advanced SubStation Alpha (ASS) Subtitle format
Category: subtitle
*/
const inlineTags = [
  'h',
  'N',
  'n'  
]

const overrideTags = [
  'alpha',
  'iclip',
  'xbord',
  'xshad',
  'ybord',
  'yshad',
  'blur',
  'bord',
  'clip',
  'fade',
  'fscx',
  'fscy',
  'move',
  'shad',
  'fad',
  'fax',
  'fay',
  'frx',
  'fry',
  'frz',
  'fsc',
  'fsp',
  'org',
  'pbo',
  'pos',
  '1a',
  '1c',
  '2a',
  '2c',
  '3a',
  '3c',
  '4a',
  '4c',
  'an',
  'be',
  'fe',
  'fn',
  'fr',
  'fs',
  'kf',
  'ko',
  'kt',
  'K',
  'a',
  'b',
  'c',
  'i',
  'k',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
];

module.exports = function (hljs) {

  var assTags = {
    begin: /{/,
    end: /}|$/,
    scope: 'punctuation',
    contains: [{
      match: hljs.regex.concat(/\\/, hljs.regex.either(...overrideTags)),
      scope: 'title.function',
      starts: {
        scope: 'params',
        end: hljs.regex.lookahead(/\\|\}/),
        excludeEnd: true,
      },
      relevance: 5
    }],
    relevance: 0
  }

  return {
    aliases: ['ass', 'AdvancedSubStationAlpha', 'ssa'],
    case_insensitive: true,
    contains: [
      assTags, // allow highlighting of text witout "Dialogue: " prefix
      {
        begin: /^Dialogue: /,
        beginScope: 'attr',
        end: /$/,
        contains: [
          {
            begin: /\d*,\d+:\d\d:\d\d.\d+,\d+:\d\d:\d\d.\d+,/,
            end: hljs.regex.lookahead(/,/),
            excludeBegin: true,
            scope: 'symbol'
          },
          assTags,
          {
            match: hljs.regex.concat(/\\/, hljs.regex.either(...inlineTags)),
            scope: 'char.escape',
            relevance: 0
          }
        ]
      },
      {
        scope: 'section',
        match: /^\[.*\]$/,
        relevance: 1
      },
      hljs.COMMENT(/^;/, /$/),
      hljs.COMMENT(/^Comment: /, /$/),
      {
        scope: 'attr',
        match: /^(?!Dialogue: |Comment: )[^,:\[\]\n]+: /,
        relevance: 0
      }
    ]
  }
}
