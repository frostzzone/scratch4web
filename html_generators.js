"use strict";


var HtmlGenerator = new Blockly.Generator('HTML');

HtmlGenerator.ORDER_ATOMIC = 0;
HtmlGenerator.ORDER_NONE = 0;

HtmlGenerator.init = function(workspace) {};
HtmlGenerator.finish = function(code) {return code;};

HtmlGenerator.scrub_ = function(block, code) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = HtmlGenerator.blockToCode(nextBlock);
  return code + nextCode;
};


function removeIndentAndTrailingNewline() {
   
}


HtmlGenerator['baseframe'] = function(block) {
  var statements_head = HtmlGenerator.statementToCode(block, 'head');
  var statements_body = HtmlGenerator.statementToCode(block, 'body');

  var code = '<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset="utf-8">\n'
    + statements_head
    +`<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MalikWhitten67/bungie-css/src/css/main.css>">
    </head>`
    + `</head>\n\n<body class="bg-container">\n`
    + statements_body
    + "</body>\n</html>\n";

  return code;
};

HtmlGenerator['styler'] = function(block) {
  var statements_head = HtmlGenerator.statementToCode(block, 'head');
  // TODO: Assemble JavaScript into code variable.
  var code = `
  <style> 
   ${statements_head}
  </style>
  
  `;
  return code;
};

HtmlGenerator['classer'] = function(block) {
  var text_text = block.getFieldValue('text');
  var statements_head = HtmlGenerator.statementToCode(block, 'head');
  // TODO: Assemble JavaScript into code variable.
  var code = `
   .${text_text}{
   ${statements_head}
   }
  `;
  return code;
};

HtmlGenerator['html'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<!DOCTYPE HTML>\n<html>\n' + statements_content + '</html>\n';
  return code;
};
HtmlGenerator['div'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<div>\n' + statements_content + '</div>\n';
  return code;
};


HtmlGenerator['margin'] = function(block) {
  var value_class = HtmlGenerator.valueToCode(block, 'class', HtmlGenerator.ORDER_ATOMIC);
  // TODO: Assemble HtmlGenerator into code variable.
  var code = '...;\n';
  return code;
};
HtmlGenerator['controls_if'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var statements_content2 = HtmlGenerator.statementToCode(block, 'content2');
  // TODO: Assemble HtmlGenerator into code variable.
  var code = `if(${statements_content }){
               ${statements_content }
               }\n`;
  return code;
};

HtmlGenerator['body'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<body >\n' + ` \n${statements_content } \n`+'</body>\n';
  return code;
};

HtmlGenerator['head'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<head>\n   \n <meta charset="utf-8">\n' + statements_content + '</head>\n';
  return code;
};

HtmlGenerator['title'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');

  if (statements_content != "")
    document.getElementById('title').innerText = statements_content;
  else
    document.getElementById('title').innerText = "untitled web page";

  var code = '<title>' + statements_content.trim() + '</title>\n';
  return code;
};

HtmlGenerator['paragraph'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<p>\n' + statements_content + '</p>\n';
  return code;
};

HtmlGenerator['plaintext'] = function(block) {
  var text_content = block.getFieldValue('content');
  var code = text_content + '\n';
  return code;
};

HtmlGenerator['division'] = function(block) {
  var value_name = HtmlGenerator.valueToCode(block, 'NAME', HtmlGenerator.ORDER_ATOMIC);
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<div' + value_name + '>\n' + statements_content + '</div>\n';
  return code;
};

HtmlGenerator['style'] = function(block) {
  var statements_name = HtmlGenerator.statementToCode(block, 'NAME');
  var code = ' style="' + statements_name.trim() + '"';
  return [code, HtmlGenerator.ORDER_NONE];
};

HtmlGenerator['color'] = function(block) {
  var colour_name = block.getFieldValue('NAME');
  var code = 'color: ' + colour_name + ';';
  return code;
};

HtmlGenerator['bgcolour'] = function(block) {
  var colour_name = block.getFieldValue('NAME');
  var code = 'background-color: ' + colour_name + ';';
  return code;
};

HtmlGenerator['genericstyle'] = function(block) {
  var text_property = block.getFieldValue('property');
  var text_value = block.getFieldValue('value');
  var code = text_property + ': ' + text_value + ';';
  return code;
};

HtmlGenerator['generictag'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_name = HtmlGenerator.valueToCode(block, 'NAME', HtmlGenerator.ORDER_ATOMIC);
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<' + text_name + value_name + '>\n' + statements_content + '</' + text_name + '>\n';
  return code;
};

HtmlGenerator['more_attributes'] = function(block) {
  var value_name1 = HtmlGenerator.valueToCode(block, 'NAME1', HtmlGenerator.ORDER_ATOMIC);
  var value_name2 = HtmlGenerator.valueToCode(block, 'NAME2', HtmlGenerator.ORDER_ATOMIC);
  var value_name3 = HtmlGenerator.valueToCode(block, 'NAME3', HtmlGenerator.ORDER_ATOMIC);
  var code = value_name1 + value_name2 + value_name3;
  return [code, HtmlGenerator.ORDER_NONE];
};

HtmlGenerator['genericattribute'] = function(block) {
  var text_attribute = block.getFieldValue('attribute');
  var text_value = block.getFieldValue('value');
  var code = ' ' + text_attribute + '="' + text_value + '"';
  return [code, HtmlGenerator.ORDER_NONE];
};

HtmlGenerator['link'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<a href="' + text_name + '">' + statements_content.trim() + '</a>\n';
  return code;
};

HtmlGenerator['span'] = function(block) {
  var value_name = HtmlGenerator.valueToCode(block, 'NAME', HtmlGenerator.ORDER_ATOMIC);
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<span' + value_name + '>' + statements_content.trim() + '</span>\n';
  return code;
};

HtmlGenerator['image'] = function(block) {
  var text_image = block.getFieldValue('IMAGE');
  var text_alt = block.getFieldValue('ALT');
  var code = '<img src="' +  text_image + '" alt="' + text_alt + '">\n';
  return code;
};

HtmlGenerator['emphasise'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<em>' + statements_content.trim() + '</em>\n';
  return code;
};

HtmlGenerator['strong'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<strong>' + statements_content.trim() + '</strong>\n';
  return code;
};

HtmlGenerator['headline'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<' + dropdown_name + '>' + statements_content.trim() + '</' +  dropdown_name + '>\n';
  return code;
};


HtmlGenerator['linebreak'] = function(block) {
  var code = '<br>\n';
  return code;
};

HtmlGenerator['horizontalbreak'] = function(block) {
  var code = '<hr>\n';
  return code;
};

HtmlGenerator['unorderedlist'] = function(block) {
  var statements_name = HtmlGenerator.statementToCode(block, 'NAME');
  var code = '<ul>\n' + statements_name + '</ul>\n';
  return code;
};

HtmlGenerator['orderedlist'] = function(block) {
  var statements_name = HtmlGenerator.statementToCode(block, 'NAME');
  var code = '<ol>\n' + statements_name + '</ol>\n';
  return code;
};

HtmlGenerator['listelement'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<li>' + statements_content + '</li>\n';
  return code;
};

HtmlGenerator['inserted'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<ins>' + statements_content.trim() + '</ins>\n';
  return code;
};

HtmlGenerator['deleted'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<del>' + statements_content.trim() + '</del>\n';
  return code;
};

HtmlGenerator['super'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<sup>' + statements_content.trim() + '</sup>\n';
  return code;
};

HtmlGenerator['sub'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<sub>' + statements_content.trim() + '</sub>\n';
  return code;
};

HtmlGenerator['code'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<code>\n' + statements_content + '</code>\n';
  return code;
};

HtmlGenerator['quote'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<q>' + statements_content.trim() + '</q>\n';
  return code;
};

HtmlGenerator['blockquote'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<blockquote>\n' + statements_content + '</blockquote>\n';
  return code;
};

HtmlGenerator['sample'] = function(block) {
var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<samp>\n' + statements_content + '</samp>\n';
  return code;
};

HtmlGenerator['keyboard'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<kbd>\n' + statements_content + '</kbd>\n';
  return code;
};

HtmlGenerator['variable'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<var>' + statements_content.trim() + '</var>\n';
  return code;
};

HtmlGenerator['form'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<form>\n' + statements_content + '</form>\n';
  return code;
};

HtmlGenerator['table'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<table>\n' + statements_content + '</table>\n';
  return code;
};

HtmlGenerator['tablerow'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<tr>\n' + statements_content + '</tr>\n';
  return code;
};

HtmlGenerator['tablecell'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<td>' + statements_content.trim() + '</td>\n';
  return code;
};

HtmlGenerator['input_text'] = function(block) {
  var text_default = block.getFieldValue('default');
  var code = '<input value="' + text_default + '">\n';
  return code;
};

HtmlGenerator['button'] = function(block) {
  var statements_name = HtmlGenerator.statementToCode(block, 'NAME');
  var code = '<button>' + statements_name.trim() + '</button>\n';
  return code;
};

HtmlGenerator['input'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var text_value = block.getFieldValue('value');
  var value_text = HtmlGenerator.valueToCode(block, 'text', HtmlGenerator.ORDER_ATOMIC);
  var code = '<input type="' + dropdown_type + '" value="' + text_value + '"' + value_text + ' />\n';
  return code;
};

HtmlGenerator['script'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<script>\n' + statements_content + '</script>\n';
  return code;
};

HtmlGenerator['onclick'] = function(block) {
  var statements_name = HtmlGenerator.statementToCode(block, 'NAME');
  var code = ' onclick="' + statements_name.trim() + '"';
  return [code, HtmlGenerator.ORDER_NONE];
};

HtmlGenerator['body_attributes'] = function(block) {
  var value_name = HtmlGenerator.valueToCode(block, 'NAME', HtmlGenerator.ORDER_ATOMIC);
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = `<body class="bg-container"` + value_name + '>\n' + statements_content + '</body>\n';
  return code;
};


//blockly

/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating HtmlGenerator for colour blocks.
 */
 'use strict';

 
 
 
 
 
 HtmlGenerator['colour_picker'] = function(block) {
   // Colour picker.
   const code = (block.getFieldValue('COLOUR'));
   return [code, HtmlGenerator.ORDER_ATOMIC];
 };
 
 HtmlGenerator['colour_random'] = function(block) {
   // Generate a random colour.
  const code =  `
 function ran() {
   var num = Math.floor(Math.random() * Math.pow(2, 24));
   return '#' + ('00000' + num.toString(16)).substr(-6);
 }
 `

   return [code,  HtmlGenerator.ORDER_FUNCTION_CALL];
 };
 HtmlGenerator['math_number'] = function(block) {
  // Numeric value.
  const code = Number(block.getFieldValue('NUM'));
  const order = code >= 0 ? HtmlGenerator.ORDER_ATOMIC :
     HtmlGenerator.ORDER_UNARY_NEGATION;
  return [code, order];
};
 
 HtmlGenerator['colour_rgb'] = function(block) {
   // Compose a colour from RGB components expressed as percentages.
   const red = HtmlGenerator.valueToCode(block, 'RED', HtmlGenerator.ORDER_NONE) || 0;
   const green =
   HtmlGenerator.valueToCode(block, 'GREEN', HtmlGenerator.ORDER_NONE) || 0;
   const blue =
   HtmlGenerator.valueToCode(block, 'BLUE', HtmlGenerator.ORDER_NONE) || 0;
   const functionName =  ('colourRgb', `
 function color (r, g, b) {
   r = Math.max(Math.min(Number(r), 100), 0) * 2.55;
   g = Math.max(Math.min(Number(g), 100), 0) * 2.55;
   b = Math.max(Math.min(Number(b), 100), 0) * 2.55;
   r = ('0' + (Math.round(r) || 0).toString(16)).slice(-2);
   g = ('0' + (Math.round(g) || 0).toString(16)).slice(-2);
   b = ('0' + (Math.round(b) || 0).toString(16)).slice(-2);
   return '#' + r + g + b;
 }
 `);
   const code = functionName + '(' + red + ', ' + green + ', ' + blue + ')';
   return [code, HtmlGenerator.ORDER_FUNCTION_CALL];
 };
 
 HtmlGenerator['colour_blend'] = function(block) {
   // Blend two colours together.
   const c1 = HtmlGenerator.valueToCode(block, 'COLOUR1', HtmlGenerator.ORDER_NONE) ||
       "'#000000'";
   const c2 = HtmlGenerator.valueToCode(block, 'COLOUR2', HtmlGenerator.ORDER_NONE) ||
       "'#000000'";
   const ratio =
   HtmlGenerator.valueToCode(block, 'RATIO', HtmlGenerator.ORDER_NONE) || 0.5;
   const functionName = ('colourBlend', `
 function (c1, c2, ratio) {
   ratio = Math.max(Math.min(Number(ratio), 1), 0);
   var r1 = parseInt(c1.substring(1, 3), 16);
   var g1 = parseInt(c1.substring(3, 5), 16);
   var b1 = parseInt(c1.substring(5, 7), 16);
   var r2 = parseInt(c2.substring(1, 3), 16);
   var g2 = parseInt(c2.substring(3, 5), 16);
   var b2 = parseInt(c2.substring(5, 7), 16);
   var r = Math.round(r1 * (1 - ratio) + r2 * ratio);
   var g = Math.round(g1 * (1 - ratio) + g2 * ratio);
   var b = Math.round(b1 * (1 - ratio) + b2 * ratio);
   r = ('0' + (r || 0).toString(16)).slice(-2);
   g = ('0' + (g || 0).toString(16)).slice(-2);
   b = ('0' + (b || 0).toString(16)).slice(-2);
   return '#' + r + g + b;
 }
 `);
   const code = functionName + '(' + c1 + ', ' + c2 + ', ' + ratio + ')';
   return [code, HtmlGenerator.ORDER_FUNCTION_CALL];
 };
 
HtmlGenerator['controls_if'] = function(block) {
  // If/elseif/else condition.
  let n = 0;
  let code = '';
  if (HtmlGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += HtmlGenerator.injectId(HtmlGenerator.STATEMENT_PREFIX, block);
  }
  do {
    const conditionCode =
        HtmlGenerator.valueToCode(block, 'IF' + n, HtmlGenerator.ORDER_NONE) ||
        'false';
    let branchCode = HtmlGenerator.statementToCode(block, 'DO' + n);
    if (HtmlGenerator.STATEMENT_SUFFIX) {
      branchCode = HtmlGenerator.prefixLines(
                       HtmlGenerator.injectId(HtmlGenerator.STATEMENT_SUFFIX, block),
                       HtmlGenerator.INDENT) +
          branchCode;
    }
    code += (n > 0 ? ' else ' : '') + 'if (' + conditionCode + ') {\n' +
        branchCode + '}';
    n++;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || HtmlGenerator.STATEMENT_SUFFIX) {
    let branchCode = HtmlGenerator.statementToCode(block, 'ELSE');
    if (HtmlGenerator.STATEMENT_SUFFIX) {
      branchCode = HtmlGenerator.prefixLines(
                       HtmlGenerator.injectId(HtmlGenerator.STATEMENT_SUFFIX, block),
                       HtmlGenerator.INDENT) +
          branchCode;
    }
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

HtmlGenerator['controls_ifelse'] = HtmlGenerator['controls_if'];

HtmlGenerator['logic_compare'] = function(block) {
  // Comparison operator.
  const OPERATORS =
      {'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>='};
  const operator = OPERATORS[block.getFieldValue('OP')];
  const order = (operator === '==' || operator === '!=') ?
      HtmlGenerator.ORDER_EQUALITY :
      HtmlGenerator.ORDER_RELATIONAL;
  const argument0 = HtmlGenerator.valueToCode(block, 'A', order) || '0';
  const argument1 = HtmlGenerator.valueToCode(block, 'B', order) || '0';
  const code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

HtmlGenerator['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  const operator = (block.getFieldValue('OP') === 'AND') ? '&&' : '||';
  const order = (operator === '&&') ? HtmlGenerator.ORDER_ATOMIC :
                                      HtmlGenerator.ORDER_ATOMIC;
  let argument0 = HtmlGenerator.valueToCode(block, 'A', order);
  let argument1 = HtmlGenerator.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    const defaultArgument = (operator === '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  const code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

HtmlGenerator['logic_negate'] = function(block) {
  // Negation.
  const order = HtmlGenerator.ORDER_ATOMIC;
  const argument0 = HtmlGenerator.valueToCode(block, 'BOOL', order) || 'true';
  const code = '!' + argument0;
  return [code, order];
};

HtmlGenerator['logic_boolean'] = function(block) {
  // Boolean values true and false.
  const code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
  return [code, HtmlGenerator.ORDER_ATOMIC];
};

HtmlGenerator['logic_null'] = function(block) {
  // Null data type.
  return ['null', HtmlGenerator.ORDER_ATOMIC];
};

HtmlGenerator['logic_ternary'] = function(block) {
  // Ternary operator.
  const value_if =
      HtmlGenerator.valueToCode(block, 'IF', HtmlGenerator.ORDER_NONE) ||
      'false';
  const value_then =
      HtmlGenerator.valueToCode(block, 'THEN', HtmlGenerator.ORDER_NONE) ||
      'null';
  const value_else =
      HtmlGenerator.valueToCode(block, 'ELSE', HtmlGenerator.ORDER_NONE) ||
      'null';
  const code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code];
};

HtmlGenerator['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  const until = block.getFieldValue('MODE') === 'UNTIL';
  let argument0 =
  HtmlGenerator.valueToCode(
          block, 'BOOL',
          until ? HtmlGenerator.ORDER_LOGICAL_NOT : HtmlGenerator.ORDER_NONE) ||
      'false';
  let branch = HtmlGenerator.statementToCode(block, 'DO');
  branch =  HtmlGenerator.addLoopTrap(branch, block);
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

HtmlGenerator['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  let repeats;
  if (block.getField('TIMES')) {
    // Internal number.
    repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    repeats =
    HtmlGenerator.valueToCode(block, 'TIMES', HtmlGenerator.ORDER_NONE) ||
        '0';
  }
  let branch = HtmlGenerator.statementToCode(block, 'DO');
  branch = HtmlGenerator.addLoopTrap(branch, block);
  let code = `
  for (let i = ${repeats}; i < s4w; ${repeats}) {
    ${branch};
  }
  
  
  `; 
  return code;
};
HtmlGenerator['variables_get'] = function(block) {
  // Variable getter.
  const code = (block.getFieldValue('VAR'));
  return [code];
};
HtmlGenerator['variables_set'] = function(block) {
  // Variable getter.
  const argument0 = HtmlGenerator.valueToCode(block, 'VALUE', HtmlGenerator.ORDER_NONE) || '0';
  const varName =  (block.getFieldValue('VAR'));
     return varName + ' = ' + argument0 + ';\n';
  
};

 

HtmlGenerator['controls_for'] = function(block) {
  const variable0 =
  (block.getFieldValue('VAR'));
const argument0 =
HtmlGenerator.valueToCode(block, 'FROM', HtmlGenerator.ORDER_NONE) || '0';
const argument1 =
HtmlGenerator.valueToCode(block, 'TO', HtmlGenerator.ORDER_NONE) || '0';
const increment =
HtmlGenerator.valueToCode(block, 'BY', HtmlGenerator.ORDER_NONE) || '1';
let branch = HtmlGenerator.statementToCode(block, 'DO');

const code = `
for (let ${variable0} = ${argument0}; ${variable0} < ${argument1}; ${variable0}++) {
  ${branch};
}
` 
  return code;
}
