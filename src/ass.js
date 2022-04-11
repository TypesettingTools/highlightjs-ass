/*
Language: Advanced SubStation Alpha
Author: Sepro
Description: Advanced SubStation Alpha (ASS) Subtitle format
Category: subtitle
*/

module.exports = function (hljs) {
  return {
    aliases: ['ass', 'AdvancedSubStationAlpha'],
    case_insensitive: true,
    contains: [
      {
        begin: '(?:^|\n)Dialogue: ',
        beginScope: 'attr',
        end: '(?=$|\n)',
        contains: [
          {
            begin: '\\d*,\\d+:\\d\\d:\\d\\d.\\d\\d,\\d+:\\d\\d:\\d\\d.\\d\\d,',
            end: '(?=,)',
            excludeBegin: true,
            scope: 'symbol'
          },
          {
            begin: ',[^,]*,\\d*,\\d*,\\d*,[^,]*,',
            excludeBegin: true,
            end: '(?=$|\n)',
            scope: 'string',
            contains: [
              {
                begin: '{',
                end: '}|\n',
                scope: 'subst',
                contains: [{
                  match: '\\\\(alpha|bord|xbord|ybord|shad|xshad|yshad|fade|clip|iclip|blur|move|fscx|fscy|fsp|frx|fry|fsc|frz|fax|fay|pos|org|fad|pbo|fr|fn|fs|be|fe|1c|2c|3c|4c|1a|2a|3a|4a|an|kf|ko|c|a|k|K|q|r|p|i|b|u|s|t)',
                  scope: 'title.function',
                  starts: {
                    scope: 'params',
                    end: '(?=\\\\|\\})',
                    excludeEnd: true,
                  }
                }]
              }
            ]
          }
        ]
      },
      {
        scope: 'section',
        match: '(?:^|\n)\\[.*\\]'
      },
      hljs.COMMENT('^;', '$'),
      hljs.COMMENT('^Comment: ', '$'),
      {
        scope: 'attr',
        match: '(?:^|\n)(?!Dialogue: |Comment: )[^,:\\[\\]]+: '
      }
    ]
  }
}
