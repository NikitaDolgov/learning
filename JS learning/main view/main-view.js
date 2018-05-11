function drawMainView(year) {
    document.getElementById('main-view').innerHTML = buildMainView(year);
}

function mainLeft() {
  let year = document.getElementById('main__year').innerText; 
  document.getElementById('main__year').innerText = year-1;
  drawMainView(year-1);
}

function mainRight() {
  let year = parseInt(document.getElementById('main__year').innerText); 
  document.getElementById('main__year').innerText = year+1;
  drawMainView(year+1);
}

function buildMainView(year) {
  return (
    "<div class='main__header'>"+
      "<p id='main__year' class='main__year'>"+year+"</p>"+
      "<button type='button' class='main__left-arrow' onclick='mainLeft()'>&#60;</button>"+
      "<button type='button' class='main__middle'>Сегодня</button>"+
      "<button type='button' class='main__right-arrow' onclick='mainRight()'>&#62;</button>"+
    "</div>"+
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
        tableRow(year, monthNumber, 1, [], []) +
        tableRow(year, monthNumber, 2, [], []) +
        tableRow(year, monthNumber, 3, [], []) +
        tableRow(year, monthNumber, 4, [], []) +
        tableRow(year, monthNumber, 5, [], []) +
        tableRow(year, monthNumber, 6, [], []) +
        tableRow(year, monthNumber, 7, [], []) +
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



// Получаем полный массив дат для для отображения месяца
function getDays(year, monthNumber) {
  // Начало массива
  let days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  let dayOfWeek = new Date(year,monthNumber,1).getDay();
  if (dayOfWeek === 0) {dayOfWeek=6} else {dayOfWeek = dayOfWeek - 1}
  let tempDatePreviousMonth = new Date(year,monthNumber-1,(new Date(year, monthNumber, 0).getDate()-dayOfWeek+1));
  //Дописываем все дни
  for (let i = 7; i < 49; i++) {
    days.push(new Date(tempDatePreviousMonth));
    tempDatePreviousMonth.setDate(tempDatePreviousMonth.getDate()+1);
  }
  return days;
}
  
  
  // Клеим строки для таблицы из массива дат
  function tableRow(year, monthNumber, rowNumber, holidays, weekneds) {
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
        return (
          '<td Class='+circleClassName+'>'+'<span Class="popuptext" id="myPopup">Popup text...</span>'+
              '<Button type="button" onclick="popup()" class='+buttonClassName+'>'+
                inputRow.getDate()+ 
              '</Button>'+
          '</td>'
        )
      });

    return '<tr>'+row.join('')+'</tr>';
  }

  function popup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }