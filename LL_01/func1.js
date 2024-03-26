/*
Напиши метод, который принимает массив последовательных (возрастающих) букв в качестве 
входных данных и возвращает отсутствующую букву в массиве. Длина массива всегда будет не менее 2. 
Массив всегда будет содержать буквы только в одном регистре. Пропущена может быть только одна буква.

Пример:
1. findMissingLetter(['a', 'b', 'c', 'd', 'f'])
input: ['a', 'b', 'c', 'd', 'f'] -> e

2. findMissingLetter(['O', 'Q', 'R', 'S'])
input: ['O', 'Q', 'R', 'S'] -> P
*/

function findMissingLetter(array) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let start = alphabet.indexOf(array[0].toLowerCase());
    for (let i = 0; i < array.length; i++) {
        if (array[i].toLowerCase() !== alphabet[start + i]) {
            return array[i].toLowerCase() === array[i] ? alphabet[start + i] : alphabet[start + i].toUpperCase();
        }
    }
}

console.log(findMissingLetter(['a', 'b', 'c', 'd', 'f'])); // e
console.log(findMissingLetter(['O', 'Q', 'R', 'S'])); // P