import React, { useState } from 'react';
import '../style.css';  // Import your CSS file
import iconArrow from '../assets/images/icon-arrow.svg'; // Import the arrow icon

function AgeCalculator() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dayError, setDayError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');
  const [yearsOutput, setYearsOutput] = useState('--');
  const [monthsOutput, setMonthsOutput] = useState('--');
  const [daysOutput, setDaysOutput] = useState('--');

  const ageLabels = React.useRef(null);

  const isValidDay = (day, month, year) => {
    const lastDay = new Date(year, month, 0).getDate();
    return day >= 1 && day <= lastDay;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setDayError('');
    setMonthError('');
    setYearError('');
    setYearsOutput('--');
    setMonthsOutput('--');
    setDaysOutput('--');

    if (ageLabels.current) {
      ageLabels.current.querySelectorAll('.ageLabel').forEach(label => {
        label.style.color = '';
      });
    }

    let valid = true;

    const showError = (errorSetter, message, inputRefIndex) => {
      valid = false;
      errorSetter(message);
      if (ageLabels.current) {
        ageLabels.current.querySelectorAll('label')[inputRefIndex].style.color = 'red';
      }
    };

    if (day === '') {
      showError(setDayError, 'This field is required', 0);
    }

    if (month === '') {
      showError(setMonthError, 'This field is required', 1);
    }

    if (year === '') {
      showError(setYearError, 'This field is required', 2);
    }

    if (day !== '' && (isNaN(day) || day < 1 || day > 31)) {
      showError(setDayError, 'Must be a valid day', 0);
    } else if (day !== '' && !isValidDay(day, month, year)) {
      showError(setDayError, 'Must be a valid date', 0);
    }

    if (month !== '' && (isNaN(month) || month < 1 || month > 12)) {
      showError(setMonthError, 'Must be a valid month', 1);
    }

    const currentYear = new Date().getFullYear();
    if (year !== '' && (isNaN(year) || year < 1900 || year > currentYear)) {
      showError(setYearError, 'Must be in the past', 2);
    }

    if (valid) {
      const birthDay = parseInt(day);
      const birthMonth = parseInt(month);
      const birthYear = parseInt(year);

      const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
      const today = new Date();

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      if (days < 0) {
        months--;
        const previousMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
        days += previousMonthDate.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      setYearsOutput(years);
      setMonthsOutput(months);
      setDaysOutput(days);
    }
  };

  return (
    <div className="ageContainer">
      <form id="ageCalculator" onSubmit={handleSubmit}>
        <div className="ageInput" ref={ageLabels}>
          <div className="ageInput-1">
            <label className="ageLabel" htmlFor="day">
              Day
            </label>
            <input
              id="day"
              name="days"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <span className="error-message" id="dayError">
              {dayError}
            </span>
          </div>
          <div className="ageInput-1">
            <label className="ageLabel" htmlFor="month">
              Month
            </label>
            <input
              id="month"
              name="months"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <span className="error-message" id="monthError">
              {monthError}
            </span>
          </div>
          <div className="ageInput-1">
            <label className="ageLabel" htmlFor="year">
              Year
            </label>
            <input
              id="year"
              name="years"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <span className="error-message" id="yearError">
              {yearError}
            </span>
          </div>
        </div>
        <div className="buttonContainer">
          <div className="straightLine"></div>
          <button type="submit">
            <img className="icon-arrow" src={iconArrow} alt="arrow" />
          </button>
        </div>
        <div className="ageOutput">
          <h2>
            <span>{yearsOutput}</span>years
          </h2>
          <h2>
            <span>{monthsOutput}</span>months
          </h2>
          <h2>
            <span>{daysOutput}</span>days
          </h2>
        </div>
      </form>
      <div className="attribution">
        Challenge by{' '}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noopener noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="#"> Oyerinde Emmanuel</a>.
      </div>
    </div>
  );
}

export default AgeCalculator;