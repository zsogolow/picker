document.addEventListener('DOMContentLoaded', function () {

    function datePicker(date) {
        if (this === undefined || this === window) {
            return new datePicker(date || new Date());
        }

        var picker, calendar, nextMonth, prevMonth, dateInput;
        try {
            picker = document.getElementsByClassName('picker')[0];
            calendar = picker.getElementsByClassName('calendar')[0];
            dateInput = picker.getElementsByClassName('date-input')[0];
            nextMonth = calendar.getElementsByClassName('next-month')[0];
            prevMonth = calendar.getElementsByClassName('prev-month')[0];

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

            dateInput.value = date.toDateString();

            calendar.getElementsByClassName('month')[0].innerHTML = getMonth(month) + " " + year;
            calendar.getElementsByClassName('days-of-week')[0].innerHTML = '';
            for (var i = 0; i < 7; i++) {
                var dayDiv = document.createElement('div');
                dayDiv.className = 'day-of-week';
                dayDiv.innerHTML = getDay(i);
                calendar.getElementsByClassName('days-of-week')[0].appendChild(dayDiv);
            }

            var table = document.createElement('table');
            var currentDay = 1;
            for (var i = 0; i < 6; i++) { // height
                var tr = document.createElement('tr');
                tr.classList.add('week')
                for (var j = 0; j < 7; j++) { // width
                    var td = document.createElement('td');
                    td.classList.add('day');

                    if (year == date.getFullYear() &&
                        month == date.getMonth() &&
                        currentDay == date.getDate()) {
                        td.classList.add('today');
                    }

                    (function (td) {
                        td.dataset.date = (month + 1) + '/' + currentDay + '/' + year;
                        td.addEventListener('click', function () {
                            var newDate = new Date(this.dataset.date);
                            initCalendar(newDate.getFullYear(), newDate.getMonth(), newDate);
                            calendar.classList.remove('focused');
                        });
                    })(td)
                    if (i == 0 && j >= firstDayInMonth) {
                        td.innerHTML = currentDay++;
                    } else if (i > 0 && currentDay <= daysInMonth) {
                        td.innerHTML = currentDay++;
                    }

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
                    return 'March';
                case 3:
                    return 'April';
                case 4:
                    return 'May';
                case 5:
                    return 'June';
                case 6:
                    return 'July';
                case 7:
                    return 'Aug';
                case 8:
                    return 'Sept';
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

    datePicker();
});