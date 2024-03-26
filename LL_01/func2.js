/* 
Напишите простой парсер, который разбирает и выполняет код на языке Deadfish. 
Deadfish имеет 4 команды, каждая длиной 1 символ: i увеличивает значение (начально 0),
d уменьшает значение, s возводит значение в квадрат, o выводит значение в возвращаемый массив.
Недопустимые символы должны быть проигнорированы.

пример:
test                input       output
parse("iiisdoso")   iiisdoso    [ 8, 64 ]
*/

function parse(code) {
    let result = [];
    let value = 0;
    code.split('').forEach((item) => {
        switch (item) {
            case 'i':
                value++;
                break;
            case 'd':
                value--;
                break;
            case 's':
                value *= value;
                break;
            case 'o':
                result.push(value);
                break;
            default:
                break;
        }
    });
    return result;
}

console.log(parse("iiisdoso")); // [ 8, 64 ]
// console.log(parse("iiisdrtysrho")); 