/**
 * LeetCode Problem: Valid Parentheses
 * 
 * Problema: Dada uma string contendo apenas os caracteres '(', ')', '{', '}', '[' e ']',
 * determine se a string de entrada é válida.
 * 
 * Uma string de entrada é válida se:
 * 1. Parênteses abertos devem ser fechados pelo mesmo tipo.
 * 2. Parênteses abertos devem ser fechados na ordem correta.
 * 3. Cada parêntese fechado tem um parêntese aberto correspondente do mesmo tipo.
 * 
 * Categoria: String, Stack
 * 
 * Exemplo:
 * Input: s = "()"
 * Output: true
 * 
 * Input: s = "()[]{}"
 * Output: true
 * 
 * Input: s = "(]"
 * Output: false
 * 
 * Input: s = "([)]"
 * Output: false
 * 
 * Input: s = "{[]}"
 * Output: true
 */

/**
 * LeetCode Problem: Valid Parentheses
 */

function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (const char of s) {
    if (['(', '{', '['].includes(char)) {
      stack.push(char);
    } else if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    }
  }

  return stack.length === 0;
}

function findFirstError(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  // ✅ Caso string vazia — válida
  if (s.length === 0) {
    return { valid: true, error: null, position: -1, character: '' };
  }

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // ✅ Se for abertura, empilha
    if (['(', '{', '['].includes(char)) {
      stack.push({ char, pos: i });
    }
    // ✅ Se for fechamento
    else if (map[char]) {
      if (stack.length === 0) {
        // ❌ Fechou algo que nunca abriu
        return {
          valid: false,
          error: 'Parêntese fechado sem abertura correspondente',
          position: i,
          character: char
        };
      }

      const top = stack.pop();
      if (top.char !== map[char]) {
        // ❌ Tipos não correspondem
        return {
          valid: false,
          error: 'Parêntese não corresponde ao tipo de abertura',
          position: i,
          character: char
        };
      }
    }
  }

  // ✅ Se sobrou algo aberto, erro de fechamento faltante
  if (stack.length > 0) {
    const last = stack.pop();
    return {
      valid: false,
      error: 'Parêntese não foi fechado',
      position: last.pos,
      character: last.char
    };
  }

  // ✅ Tudo certo
  return { valid: true, error: null, position: -1, character: '' };
}

module.exports = { isValid, findFirstError };