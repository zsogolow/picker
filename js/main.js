function datePicker(date, input) {
    if (this === undefined || this === window) {
        return new datePicker(date || new Date(), input);
    }

    var calendar, currentMonth, nextMonth, prevMonth, dateInput;
    try {
        picker = document.createElement('div');
        picker.classList.add('picker');
        input.parentElement.insertBefore(picker, input);
        input.parentElement.removeChild(input);
        picker.appendChild(input);
        dateInput = picker.getElementsByClassName('date-input')[0];
        calendar = document.createElement('div');
        calendar.classList.add('calendar');
        var monthContainer = document.createElement('div');
        monthContainer.classList.add('month-container');
        currentMonth = document.createElement('div');
        currentMonth.classList.add('month');
        nextMonth = document.createElement('div');
        nextMonth.classList.add('next-month');
        prevMonth = document.createElement('div');
        prevMonth.classList.add('prev-month');
        var daysInMonthContainer = document.createElement('div');
        daysInMonthContainer.classList.add('days-in-month');

        monthContainer.appendChild(prevMonth);
        monthContainer.appendChild(currentMonth);
        monthContainer.appendChild(nextMonth);

        calendar.appendChild(monthContainer);
        calendar.appendChild(daysInMonthContainer);

        picker.insertBefore(calendar, picker.lastChildElement);

        dateInput.addEventListener('focus', showCalendar);
        dateInput.addEventListener('click', cancelHideCalendar);
        calendar.addEventListener('click', cancelHideCalendar);
        nextMonth.addEventListener('click', incrementMonth);
        prevMonth.addEventListener('click', decrementMonth);

    } catch (err) {
        console.log(err);
        // html is invalid, calendar is missing
    }

    var currentDate = date;
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var day = currentDate.getDay();

    initCalendar(year, month, currentDate);

    function initCalendar(year, month, date) {
        var firstDayInMonth = new Date(year, month).getDay();
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var lastDayInMonth = new Date(year, month + 1, 0).getDay();

        var firstDayInMonthDate = new Date(year, month);
        var lastDayInMonthDate = new Date(year, month + 1, 0);

        dateInput.value = date.toDateString();

        prevMonth.innerHTML = getMonth(month == 0 ? 11 : month - 1);
        currentMonth.innerHTML = getMonth(month) + " " + year;
        nextMonth.innerHTML = getMonth(month == 11 ? 0 : month + 1);

        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        for (var i = 0; i < 7; i++) {
            var dayTh = document.createElement('th');
            dayTh.className = 'day-of-week';
            dayTh.innerHTML = getDay(i);
            tr.appendChild(dayTh);
        }
        thead.appendChild(tr);
        table.appendChild(thead);

        var currentDay = firstDayInMonth * -1 + 1;
        for (var i = 0; i < 6; i++) { // height
            var tr = document.createElement('tr');
            tr.classList.add('week')
            for (var j = 0; j < 7; j++) { // width
                // create the td
                var td = document.createElement('td');
                td.classList.add('day');

                var currentDateIteration = new Date(year, month, currentDay);

                // look to see if its the current date
                if (currentDateIteration.getFullYear() == date.getFullYear() &&
                    currentDateIteration.getMonth() == date.getMonth() &&
                    currentDateIteration.getDate() == date.getDate()) {
                    td.classList.add('today');
                }

                // add event listener for click on date
                (function (td, date) {
                    td.dataset.date = date.toDateString();
                    td.addEventListener('click', function () {
                        var newDate = new Date(this.dataset.date);
                        initCalendar(newDate.getFullYear(), newDate.getMonth(), newDate);
                        calendar.classList.remove('focused');
                    });
                })(td, currentDateIteration)

                // check to see if the day is in the right month
                if (currentDay < firstDayInMonthDate.getDate() || currentDay > lastDayInMonthDate.getDate()) {
                    td.classList.add('day-disabled');
                }

                td.innerHTML = currentDateIteration.getDate();

                currentDay++;

                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        calendar.getElementsByClassName('days-in-month')[0].innerHTML = '';
        calendar.getElementsByClassName('days-in-month')[0].appendChild(table);
    }

    function hideCalendar() {
        console.log('hiding');
        calendar.classList.remove('focused');
        document.removeEventListener('click', hideCalendar);
    }

    function showCalendar() {
        console.log('showing');
        calendar.classList.add('focused');
        document.addEventListener('click', hideCalendar);
    }

    function cancelHideCalendar(event) {
        event.stopPropagation();
    }

    function incrementMonth() {
        if (month == 11) {
            year++;
            month = 0;
        } else {
            month++;
        }

        initCalendar(year, month, currentDate);
    }

    function decrementMonth() {
        if (month == 0) {
            year--;
            month = 11;
        } else {
            month--;
        }

        initCalendar(year, month, currentDate);
    }

    function getMonth(monthIndex) {
        switch (monthIndex) {
            case 0:
                return 'Jan';
            case 1:
                return 'Feb';
            case 2:
                return 'Mar';
            case 3:
                return 'Apr';
            case 4:
                return 'May';
            case 5:
                return 'Jun';
            case 6:
                return 'Jul';
            case 7:
                return 'Aug';
            case 8:
                return 'Sep';
            case 9:
                return 'Oct';
            case 10:
                return 'Nov';
            case 11:
                return 'Dec';
            default:
                break;
        }
    }

    function getDay(dayIndex) {
        switch (dayIndex) {
            case 0:
                return 'Sun';
            case 1:
                return 'Mon';
            case 2:
                return 'Tue';
            case 3:
                return 'Wed';
            case 4:
                return 'Thu';
            case 5:
                return 'Fri';
            case 6:
                return 'Sat';
            default:
                break;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    datePicker(new Date(), document.querySelectorAll('input[type=text]')[0]);
    datePicker(new Date(), document.querySelectorAll('input[type=text]')[1]);
});