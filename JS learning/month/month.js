function drawMainView(year) {
    document.getElementById('main-view').innerHTML = buildMainView(year);

}

function buildMainView(year) {
  return (
    "<p class='main__year'>"+year+"</p>"+
			"<div class='main__row'>"+
				"<div class='main__month'>"+
				  buildTable(year, 0)+
        "</div>"+
        "<div class='main__month'>"+
				  buildTable(year, 1)+
        "</div>"+
        "<div class='main__month'>"+
					buildTable(year, 2)+
				"</div>"+
				"<div class='main__month'>"+
					buildTable(year, 3)+
				"</div>"+        	
			"</div>"+
			"<div class='main__row'>"+
				"<div class='main__month'>"+
					buildTable(year, 4)+
        "</div>"+
        "<div class='main__month'>"+
				  buildTable(year, 5)+
        "</div>"+
        "<div class='main__month'>"+
					buildTable(year, 6)+
				"</div>"+
				"<div class='main__month'>"+
					buildTable(year, 7)+
				"</div>"+
			"</div>"+
			"<div class='main__row'>"+
				"<div class='main__month'>"+
					buildTable(year, 8)+
        "</div>"+
        "<div class='main__month'>"+
					buildTable(year, 9)+
        "</div>"+
        "<div class='main__month'>"+
					buildTable(year, 10)+
				"</div>"+
				"<div class='main__month'>"+
          buildTable(year, 11)+
				"</div>"+
			"</div>"
  )
}


//строим таблицу
function buildTable(year, monthNumber) {
  return (
      '<table cellspasing="10px">'+
        '<caption class="main-month_name">'+getMonthName(monthNumber)+'</caption>'+
        tableRow(year, monthNumber, 1, [], [], true) +
        tableRow(year, monthNumber, 2, [], [], true) +
        tableRow(year, monthNumber, 3, [], [], true) +
        tableRow(year, monthNumber, 4, [], [], true) +
        tableRow(year, monthNumber, 5, [], [], true) +
        tableRow(year, monthNumber, 6, [], [], true) +
        tableRow(year, monthNumber, 7, [], [], true) +
      '</table>'  
  )
}

// Получаем русское название месяца по номеру
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

// Получаем список дней из месяца
function getDaysInMonth(month, year) {
    const date = new Date(Date.UTC(year, month, 1));
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
}

// Получаем полный массив дат для для отображения месяца
function getDays(year, monthNumber) {
    // Начало массива
    let days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    // Нужные номера месяцев(до,текущий и после)
    const thisMonthNumber = new Date(Date.UTC(year, monthNumber, 1)).getMonth();
    const previousMonthNumber = thisMonthNumber - 1;
    const nextMonthNumber = thisMonthNumber + 1;
    // Номер дня в недели первого числа текущего месяца
    let dayOfWeek = new Date(Date.UTC(year, monthNumber, 1)).getDay();
    // Для воскресенья вместо 0 делаем 7
    if (dayOfWeek === 0) {
      dayOfWeek = 7;
    }
  
    // Получаем массив дат для прошлого,текущего и следующего месяца
    const thisMonthDays = getDaysInMonth(thisMonthNumber, year);
    let previousMonthDays;
    if (previousMonthNumber === -1) {
      previousMonthDays = getDaysInMonth(11, year-1);
    } else {
      previousMonthDays = getDaysInMonth(previousMonthNumber, year);
    }
    let nextMonthDays;
    if (nextMonthNumber === 12) {
      nextMonthDays = getDaysInMonth(0, year+1);
    } else {
      nextMonthDays = getDaysInMonth(nextMonthNumber, year);
    }
  
    // Сколько дней надо взять из предыдущего месяца и следующего
    const a = previousMonthDays.length - dayOfWeek + 1;
    const b = 42 - thisMonthDays.length - dayOfWeek + 1;
  
    // Добавляем даты из предыдущего месяца
    for (let i = a; i < previousMonthDays.length; i++) {
      days = days.concat(previousMonthDays[i]);
    }
    // Добавляем даты из текущего месяцаэ
    for (let i = 0; i < thisMonthDays.length; i++) {
      days = days.concat(thisMonthDays[i]);
    }
    // Добавляем даты из следующего месяца
    for (let i = 0; i < b; i++) {
      days = days.concat(nextMonthDays[i]);
    }
    return days;
  }
  
  // Клеим строки для таблицы из массива дат
  function tableRow(year, monthNumber, rowNumber, holidays, weekneds, visible) {
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
      row = inputRow.map(inputRow => '<th class="main-th">' + inputRow + '</th>');
    } else
      row = inputRow.map(inputRow => {
        let circleClassName, buttonClassName;
        if (visible) {
          // Если текущая дата - выделить красным
          if (inputRow.getDate() === new Date().getDate() && inputRow.getMonth() === new Date().getMonth() && inputRow.getFullYear() === new Date().getFullYear()) {
            circleClassName = "main-circle-empty";
            buttonClassName = "main-table-button-filled";
          } else if (holidays.includes(new Date(Date.UTC(2018, inputRow.getMonth(), inputRow.getDate())).toISOString().split('T')[0], )) {
            // Иначе, все остальный дни сначала проверяются на попадание в массив праздников
            circleClassName = "main-circle-empty";
            buttonClassName = "main-button-empty circle--holiday";
          }
          else if (weekneds.includes(new Date(Date.UTC(2018, inputRow.getMonth(), inputRow.getDate())).toISOString().split('T')[0], )) {
            // Потом проверяются на попадание в массив выходных      
            circleClassName = "main-circle-empty";
            buttonClassName = "main-button-empty circle--weekend";
          }
          else {
            // Все что осталось обрабатывается тут
            circleClassName = "main-circle-empty";
            buttonClassName = "main-button-empty";
          }
        } else if (inputRow.getMonth() !== monthNumber) {
          circleClassName = 'circle_invisible';
          buttonClassName = 'Month__table-button-empty circle_invisible'
        }
        else
          // Если текущая дата - выделить синим
          if (inputRow.getDate() === new Date().getDate() && inputRow.getMonth() === new Date().getMonth()) {
            circleClassName = "circle--filled";
            buttonClassName = "main-table-button-filled";
          }
          else if (holidays.includes(new Date(Date.UTC(2018, inputRow.getMonth(), inputRow.getDate())).toISOString().split('T')[0], )) {
            // Иначе, все остальный дни сначала проверяются на попадание в массив праздников
            circleClassName = "main-circle-empty";
            buttonClassName = "main-button-empty circle--holiday";
          } else if (weekneds.includes(new Date(Date.UTC(2018, inputRow.getMonth(), inputRow.getDate())).toISOString().split('T')[0], )) {
            // Потом проверяются на попадание в массив выходных      
            circleClassName = "main-circle-empty";
            buttonClassName = "main-button-empty circle--weekend";
          } else {
            // Все что осталось обрабатывается тут
            circleClassName = "main-circle-empty";
            buttonClassName = "main-button-empty";
          }
        return (
          '<td Class='+circleClassName+'>'+
              '<Button type="button" class='+buttonClassName+'>'+
                inputRow.getDate()+
              '</Button>'+
          '</td>'
        )
      });

    return '<tr>'+row.join('')+'</tr>';
  }