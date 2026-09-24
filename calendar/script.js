const monthYearElement = document.getElementById("monthYear") // finds place where month and year title should go
const datesElement = document.getElementById("dates") // container where days will go
const prev = document.getElementById("prev") // selects buttons
const next = document.getElementById("next")
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


//let currentDate = new Date(); // gets the date, is a let so prev and next can change the value



const updateCalendar = (currentDate) => { // runs whne updatecalendar is called
    const currentYear = currentDate.getFullYear(); // finds the current year
    const currentMonth = currentDate.getMonth(); // finds the current month

    const currentMonthFirstDay = new Date(currentYear, currentMonth); // last day of previous month
    const currentMonthLastDay = new Date(currentYear, currentMonth+1, 0); // last day of current month
    const currentMonthFistDayIndex = currentMonthFirstDay.getDay();
    const currentMonthTotalDays = currentMonthLastDay.getDate();

    const previousMonthFirstDay = new Date(currentYear, currentMonth - 1);
    const previousMonthLastDay = new Date(currentYear, currentMonth, 0);

    const lastDayIndex = currentMonthLastDay.getDay(); // gets last day of week

    const datetoday = new Date().getDate();

    return {
        currentYear,
        currentMonth,
        currentMonthFirstDay: currentMonthFirstDay.toDateString(),
        currentMonthLastDay: currentMonthLastDay.toDateString(),
        currentMonthFirstDayIndex: currentMonthFistDayIndex === 0 ? 6 : currentMonthFistDayIndex-1,
        currentMonthTotalDays,
        
        previousMonthFirstDay: previousMonthFirstDay.toDateString(),
        previousMonthLastDay: previousMonthLastDay.toDateString(),

        totalDaysInCurrentMonth: currentMonthLastDay.getDate(),
        totalDaysInPreviousMonth: previousMonthLastDay.getDate(),

        datetoday,
    }
}

const buildUI = (offset) => {
    const currentYear = new Date().getFullYear(); // finds the current year
    const currentMonth = new Date().getMonth(); // finds the current month
    const currentMonthFirstDay = new Date(currentYear, currentMonth) // last day of previous month
    const previousMonthLastDay = new Date(currentYear, currentMonth, 0);
    const totalDaysInPreviousMonth = previousMonthLastDay.getDate()
    const currentMonthDay = new Date(currentMonth);
    const datetoday = new Date().getDate();
    console.log(currentMonthDay)



    const UIData = updateCalendar(new Date(new Date().setMonth(currentMonthFirstDay.getMonth() + offset)));
    console.log(JSON.stringify(UIData, null, '\t'));
    const MonthContainer = document.getElementById("monthYear");
    MonthContainer.innerHTML=months[UIData.currentMonth]
    const totalBlocks = 6*7;
    const container = document.getElementById("dates");
    container.innerHTML = '';

    

    for (let i = 0; i < totalBlocks; i++) {
        const dayUIElement = document.createElement('div');

        if(i < UIData.currentMonthFirstDayIndex){
            const daysToSubtractFromTotalDaysInPreviousMonth = UIData.currentMonthFirstDayIndex - i - 1;
            dayUIElement.innerHTML = (totalDaysInPreviousMonth-daysToSubtractFromTotalDaysInPreviousMonth);
            dayUIElement.classList.add('muted');

        } else if(i < UIData.totalDaysInCurrentMonth+UIData.currentMonthFirstDayIndex) {
            dayUIElement.innerHTML = (i-UIData.currentMonthFirstDayIndex)+1;
            if (i === datetoday && offset === 0) {
                dayUIElement.classList.add('todaysdate');
            }


        } else {
            dayUIElement.innerHTML = (i-UIData.totalDaysInCurrentMonth - UIData.currentMonthFirstDayIndex)+1;
            dayUIElement.classList.add('muted');
        }
        


        datesElement.classList.add('days');
        container.append(dayUIElement);
    }
    
};

let initialOffset = 0;


buildUI(0);

const prevMonth = () => {
    initialOffset--;
    buildUI(initialOffset);
};

const nextMonth = () => {
    initialOffset++;

    if (initialOffset > 11) {
        initialOffset = 0
    }

    buildUI(initialOffset);

};

