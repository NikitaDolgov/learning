function getHolidays() {
    fetch('https://vacations.directual.com/good/api/v3/struct/oracle_holidays/search?appId=4cdfef0a-7fe4-4ba1-9507-ddb946585f5c&appKey=NNgDjmFSguR', {
            method: 'POST',
            body: JSON.stringify({"filters":[{"field":"weekend_flag_front","value":"Y","exp":"=="},{"field":"year","value":2018,"exp":"=="}],"fields":"calendar_date","pageSize":400})
        })
    .then((result) => {console.log('1'); return result.json()})
    .then((json) => {
        console.log('2');
        console.log(json);
    })
    .catch(error => {console.log(error,'3')});
}

function getHolidays_1 () {
    let a = getHolidays();
    console.log('B');
    console.log(a);
}

getHolidays_1();
/*
        let v = y.result.list;
        for (let i=0;i<v.length;i++) {
            holidays = holidays.concat(v[i].obj.calendar_date);
            console.log(holidays);
        }
        console.log(holidays);
        return true;
*/        