function drawMonthView() {
    document.getElementById('month-view').innerHTML = buildMonthView(3);
}

function buildMonthView(monthNumber) {
    return (
        "<p class='month_view-month-and-year'>"+getMonthName(monthNumber)+" 2018 г. </p>"+
        buildMonthTable(3)

    )
}


function getMonthName(monthNumber) {
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
    return months[monthNumber];
}


function buildMonthTable(monthNumber) {
    return (
        '<table class="month_view-table">'+
          tableRowMonthView(2018, monthNumber, 1, [], []) +
          tableRowMonthView(2018, monthNumber, 2, [], []) +
          tableRowMonthView(2018, monthNumber, 3, [], []) +
          tableRowMonthView(2018, monthNumber, 4, [], []) +
          tableRowMonthView(2018, monthNumber, 5, [], []) +
          tableRowMonthView(2018, monthNumber, 6, [], []) +
          tableRowMonthView(2018, monthNumber, 7, [], []) +
        '</table>'  
    )
}


function tableRowMonthView(year, monthNumber, rowNumber, holidays, weekneds) {
    const days = getDays(year, monthNumber);
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
      row = inputRow.map(inputRow => '<th class="month_view-th">' + inputRow + '</th>');
    } else
      row = inputRow.map(inputRow => {
        let circleClassName;
          // Если текущая дата - выделить красным
          if (inputRow.getDate() === new Date().getDate() && inputRow.getMonth() === new Date().getMonth() && inputRow.getFullYear() === new Date().getFullYear()) {
            circleClassName = "month_view-circle-filled";
          } else if (holidays.includes(new Date(Date.UTC(2018, inputRow.getMonth(), inputRow.getDate())).toISOString().split('T')[0], )) {
            // Иначе, все остальный дни сначала проверяются на попадание в массив праздников
            circleClassName = "month_view-circle-empty";
          }
          else if (weekneds.includes(new Date(Date.UTC(2018, inputRow.getMonth(), inputRow.getDate())).toISOString().split('T')[0], )) {
            // Потом проверяются на попадание в массив выходных      
            circleClassName = "month_view-circle-empty";
          }
          else {
            // Все что осталось обрабатывается тут
            circleClassName = "month_view-circle-empty";
          }

        return (
          '<td Class='+circleClassName+'>'+
                inputRow.getDate()+
          '</td>'
        )
      });

    return '<tr>'+row.join('')+'</tr>';
  }