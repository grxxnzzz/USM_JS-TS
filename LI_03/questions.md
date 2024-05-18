# Ответы на контрольные вопросы

### 1. Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?
В Javascript можно получить доступ к элементу на странице по: тегу, классу, селектору, ID

---

Примеры: 
```js 
// по ID (из работы)
document.getElementById('transaction-form')

// по селектору
document.querySelector('.container')

// по классу
document.getElementsByClassName('positive')
```

---

### 2. Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?
Делегирование событий уменьшает количество обработчиков событий и упрощает управление динамически изменяющимися элементами.

**Пример из работы:**
```js
document.getElementById('transaction-form').addEventListener('submit', function (f)) {...}
```  
Обработчик события добавляется к родительскому элементу, а событие обрабатывается только если оно произошло на дочернем элементе
### 3. Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?
Изменить содержимое можно несколькими способами: через `textContent` или `innerText`, через `innerHTML`, через изменение атрибутов (`setAttribute`, `id`, `classname`)

Пример из работы:
```js
document.getElementById('total-description').innerText = transaction.description;
```  

### 4. Как можно добавить новый элемент в DOM дерево с помощью JavaScript?
Для добавления нового элемента в DOM дерево можно использовать методы `createElement` и `appendChild`

Примеры из работы:
```js
// createElement
const deleteBtn = document.createElement('button');

// appendChild
deleteCell.appendChild(deleteBtn);
```