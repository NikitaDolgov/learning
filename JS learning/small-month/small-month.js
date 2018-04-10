function smallMonthBefore() {
  document.getElementById('side_bottom-right').disabled = false;
  let monthNumber = getMonthNumber(document.getElementById('side_bottom-month-button').innerText);
  if (monthNumber === 1) {document.getElementById('side_bottom-left').disabled = true}
  let monthName = getMonthName(monthNumber-1); 
  document.getElementById('side_bottom-month-button').innerText = monthName;
  drawSmallMonth(document.getElementById('side_bottom-month-button'));
}

function smallMonthAfter() {
  document.getElementById('side_bottom-left').disabled = false;
  let monthNumber = getMonthNumber(document.getElementById('side_bottom-month-button').innerText); 
  if (monthNumber === 10) {document.getElementById('side_bottom-right').disabled = true}
  let monthName = getMonthName(monthNumber+1); 
  document.getElementById('side_bottom-month-button').innerText = monthName;
  drawSmallMonth();
}

function drawSmallMonth() {
  let monthNumber = getMonthNumber(document.getElementById('side_bottom-month-button').innerText);  
  document.getElementById('side_bottom-small-month').innerHTML = buildTableSmallMonth(monthNumber);
}

function getMonthNumber(name){
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  let monthNumber;
    for (let i=0;i<months.length;i++) {
      if (name === months[i]) {monthNumber=i}
    }
    return monthNumber;
}

//строим таблицу
function buildTableSmallMonth(monthNumber) {
  return (
      '<table cellspasing="10px">'+
        tableRowSmallMonth(monthNumber, 1, [], [], true) +
        tableRowSmallMonth(monthNumber, 2, [], [], true) +
        tableRowSmallMonth(monthNumber, 3, [], [], true) +
        tableRowSmallMonth(monthNumber, 4, [], [], true) +
        tableRowSmallMonth(monthNumber, 5, [], [], true) +
        tableRowSmallMonth(monthNumber, 6, [], [], true) +
        tableRowSmallMonth(monthNumber, 7, [], [], true) +
      '</table>'  
  )
}


  // Клеим строки для таблицы из массива дат
  function tableRowSmallMonth(monthNumber, rowNumber, holidays, weekneds, visible) {
    const days = getDays(2018,monthNumber);
    let inputRow = [];
    let row = [];
    // Получаем номера первого и последнего элементов из нужного блока в общем массиве дат (в зависимости от номера строки)
    const end = 7 * rowNumber - 1;
    let start = end - 6;
    // Собираем все это в отдельный массив
    for (start; start <= end; start++) {
      inputRow = inputRow.concat(days[start]);
    }
    // Превращаем массив дат в ячейки таблицы
    if (rowNumber === 1) {
      // Если месяц первый - то это заголовки
      row = inputRow.map(inputRow => '<th class="side_bar-th">' + inputRow + '</th>');
    } else
      row = inputRow.map(inputRow => {
        let circleClassName, buttonClassName;
          // Если текущая дата - выделить синим
          if (inputRow.getDate() === new Date().getDate() && inputRow.getMonth() === new Date().getMonth()) {
            circleClassName = "circle--filled";
            buttonClassName = "Month__table-button-filled";
          } else if (holidays.includes(new Date(Date.UTC(2018, inputRow.getMonth(), inputRow.getDate())).toISOString().split('T')[0], )) {
            // Иначе, все остальный дни сначала проверяются на попадание в массив праздников
            circleClassName = "circle--empty";
            buttonClassName = "Month__table-button-empty circle--holiday";
          }
          else if (weekneds.includes(new Date(Date.UTC(2018, inputRow.getMonth(), inputRow.getDate())).toISOString().split('T')[0], )) {
            // Потом проверяются на попадание в массив выходных      
            circleClassName = "circle--empty";
            buttonClassName = "Month__table-button-empty circle--weekend";
          }
          else {
            // Все что осталось обрабатывается тут
            circleClassName = "circle--empty";
            buttonClassName = "Month__table-button-empty";
          }
        return (
          '<td Class='+circleClassName+'>'+
              '<Button type="button" class="Month__table-button-empty">'+
                inputRow.getDate()+
              '</Button>'+
          '</td>'
        )
      });

    return '<tr>'+row.join('')+'</tr>';
  }