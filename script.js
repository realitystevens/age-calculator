const dayInput = document.getElementById("day_input_field")
const monthInput = document.getElementById("month_input_field")
const yearInput = document.getElementById("year_input_field")

const dayResult = document.getElementById("day_result_field")
const monthResult = document.getElementById("month_result_field")
const yearResult = document.getElementById("year_result_field")

const dayError = document.getElementById("day_error_field")
const monthError = document.getElementById("month_error_field")
const yearError = document.getElementById("year_error_field")



function updateAge() {
    const dayValue = dayInput.value.trim();
    const monthValue = monthInput.value.trim();
    const yearValue = yearInput.value.trim();

    // Only calculate if at least year is provided
    if (yearValue.length === 4 && monthValue && dayValue) {
        const { years, months, days } = calculateAge(yearValue, monthValue, dayValue);
        yearResult.textContent = isNaN(years) ? "--" : years;
        monthResult.textContent = isNaN(months) ? "--" : months;
        dayResult.textContent = isNaN(days) ? "--" : days;
    } else {
        yearResult.textContent = "--";
        monthResult.textContent = "--";
        dayResult.textContent = "--";
    }
}


// Listen for input events on all fields
dayInput.addEventListener("input", updateAge);
monthInput.addEventListener("input", updateAge);
yearInput.addEventListener("input", updateAge);



function calculateAge(yearValue, monthValue = "", dayValue = "") {
    const today = new Date();

    // Use current date values if any parameter is missing or empty
    const year = yearValue ? parseInt(yearValue, 10) : today.getFullYear();
    const month = monthValue ? parseInt(monthValue, 10) : today.getMonth() + 1; // JS months are 0-based
    const day = dayValue ? parseInt(dayValue, 10) : today.getDate();

    const userDate = new Date(year, month - 1, day);

    let years = today.getFullYear() - userDate.getFullYear();
    let months = today.getMonth() - userDate.getMonth();
    let days = today.getDate() - userDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}
