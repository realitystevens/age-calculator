const dayInput = document.getElementById("day_input_field");
const monthInput = document.getElementById("month_input_field");
const yearInput = document.getElementById("year_input_field");

const dayResult = document.getElementById("day_result_field");
const monthResult = document.getElementById("month_result_field");
const yearResult = document.getElementById("year_result_field");

const dayError = document.getElementById("day_error_field");
const monthError = document.getElementById("month_error_field");
const yearError = document.getElementById("year_error_field");

const dayLabel = document.getElementById("day_input_label");
const monthLabel = document.getElementById("month_input_label");
const yearLabel = document.getElementById("year_input_label");

// Set initial result to "--"
yearResult.textContent = "--";
monthResult.textContent = "--";
dayResult.textContent = "--";

function updateAge() {
    const dayValue = dayInput.value.trim();
    const monthValue = monthInput.value.trim();
    const yearValue = yearInput.value.trim();

    // If no input, show all as "--"
    if (!yearValue && !monthValue && !dayValue) {
        yearResult.textContent = "--";
        monthResult.textContent = "--";
        dayResult.textContent = "--";
        return;
    }

    // Validate year input
    if (yearValue.length > 0 && yearValue.length < 4) {
        yearError.textContent = "Must be in the valid past";
        yearError.style.color = "var(--primary-red)";
        yearInput.style.border = "1px solid var(--primary-red)";
        yearLabel.style.color = "var(--primary-red)";
    } else {
        yearError.textContent = "";
        yearInput.style.border = "";
        yearLabel.style.color = "";
    }

    // If only year is inputted
    if (yearValue.length === 4 && !monthValue && !dayValue) {
        const { years } = calculateAge(yearValue, 1, 1);
        yearResult.textContent = isNaN(years) ? "--" : years;
        monthResult.textContent = "--";
        dayResult.textContent = "--";
        return;
    }

    // If year and month are inputted
    if (yearValue.length === 4 && monthValue && !dayValue) {
        const { years, months } = calculateAge(yearValue, monthValue, 1);
        yearResult.textContent = isNaN(years) ? "--" : years;
        monthResult.textContent = isNaN(months) ? "--" : months;
        dayResult.textContent = "--";
        
        if (monthValue > 12) {
            monthError.textContent = "Must be a valid month";
            monthError.style.color = "var(--primary-red)";
            monthInput.style.border = "1px solid var(--primary-red)";
            monthLabel.style.color = "var(--primary-red)";
        } else {
            monthError.textContent = "";
            monthInput.style.border = "";
            monthLabel.style.color = "";
        }
        
        return;
    }

    // If all are inputted
    if (yearValue.length === 4 && monthValue && dayValue) {
        const { years, months, days } = calculateAge(yearValue, monthValue, dayValue);
        yearResult.textContent = isNaN(years) ? "--" : years;
        monthResult.textContent = isNaN(months) ? "--" : months;
        dayResult.textContent = isNaN(days) ? "--" : days;

        if (dayValue > 31) {
            dayError.textContent = "Must be a valid day";
            dayError.style.color = "var(--primary-red)";
            dayInput.style.border = "1px solid var(--primary-red)";
            dayLabel.style.color = "var(--primary-red)";
        } else {
            dayError.textContent = "";
            dayInput.style.border = "";
            dayLabel.style.color = "";
        }

        return;
    }

    // If only month or day is inputted without year, show all as "--"
    yearResult.textContent = "--";
    monthResult.textContent = "--";
    dayResult.textContent = "--";
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
