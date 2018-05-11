function drawHeader() {
    document.getElementById('header').innerHTML = buildHeader();
}

function buildHeader() {
    return "<div class='header__circles'>"+
                "<div class='header__circle header__circle-red'></div>"+
                "<div class='header__circle header__circle-yellow'></div>"+
                "<div class='header__circle header__circle-green'></div>"+
            "</div>"+
            "<div class='header__calendar-button'>"+
                "<span class='header__calendar-button-text'>Календари</span>"+
            "</div>"+
            "<div class='header_arrow'>"+
                "<div class='header__circle header__circle-grey'></div>"+
            "</div>"+
            "<div class='header__middle-buttons'>"+
                "<div class='header__day'><span class='header__middle-1'>День</span></div>"+
                "<div class='header__week-month'><span class='header__middle-1'>Неделя</span></div>"+
                "<div class='header__week-month'><span class='header__middle-1'>Месяц</span></div>"+
                "<div class='header__year'><span class='header__middle-2'>Год</span></div>"+
            "</div>"+
            "<div class='header__search'></div>	"
}

