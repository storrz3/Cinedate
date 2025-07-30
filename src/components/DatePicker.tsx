import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerProps } from '../types';
import { motion } from 'framer-motion';

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger the animation of children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

const BirthdayDatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange }) => {
  // Calculate the range of years to show in the dropdown (e.g., 50 years back from current year)
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;
  
  // High-contrast modern color scheme
  const inputClasses = "peer w-full px-4 pb-2.5 pt-6 border border-[#00BCD4] dark:border-[#00BCD4] rounded-xl shadow-sm focus:ring-1 focus:ring-[#29ABE2] focus:border-[#29ABE2] bg-[#121212] dark:bg-[#121212] text-[#FFFFFF] dark:text-[#FFFFFF] text-center outline-none placeholder-transparent font-medium"; 

  return (
    <motion.div 
      // Modern high-contrast styling
      className="font-sans mb-8 mx-auto px-4 md:px-6 py-6 bg-[#121212] bg-opacity-95 dark:bg-[#121212] dark:bg-opacity-95 backdrop-blur-md rounded-2xl shadow-lg border border-[#00BCD4] dark:border-[#00BCD4] max-w-[280px] sm:max-w-sm block"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="font-['Against'] text-xl sm:text-2xl mb-2 text-[#FFFFFF] dark:text-[#FFFFFF] text-center tracking-wider"
        variants={itemVariants}
      >
        When were you born?
      </motion.h2>
      <motion.p 
        className="text-sm text-[#AAAAAA] dark:text-[#AAAAAA] mb-5 text-center leading-relaxed"
        variants={itemVariants}
      >
        Select your birthday to discover movies released on that special day!
      </motion.p>
      <motion.div 
        className="flex justify-center items-center w-full"
        variants={itemVariants}
      >
        <div className="relative w-full flex justify-center">
          <DatePicker
            selected={selectedDate}
            onChange={onChange}
            dateFormat="MMMM d"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            popperClassName="date-picker-popper font-sans modern-theme"
            minDate={new Date(startYear, 0, 1)}
            maxDate={new Date()}
            inputClassName={inputClasses}
            className="mx-auto"
          />
          <label 
            htmlFor="datePickerInput"
            className={`
              absolute left-0 right-0 top-0 
              text-base text-[#AAAAAA] dark:text-[#AAAAAA]
              transition-all duration-200 ease-out 
              pointer-events-none 
              origin-center
              transform text-center
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-4 
              peer-focus:scale-75 peer-focus:-translate-y-1 
              ${selectedDate ? 'scale-75 -translate-y-1' : ''}
              peer-focus:text-[#00BCD4] dark:peer-focus:text-[#00BCD4]
              text-sm font-['Against'] tracking-wide
            `}
          >
            Select your birthday
          </label>
        </div>
      </motion.div>
      <style>{`
        /* Base Font */
        .font-sans { 
          font-family: 'Inter', 'Against', sans-serif;
        }

        .peer::placeholder {
          color: transparent;
        }

        /* --- Modern Theme for DatePicker --- */
        .modern-theme {
          font-family: 'Inter', 'Against', sans-serif !important;
          z-index: 50 !important;
        }

        .react-datepicker {
          font-family: inherit;
          border: 1px solid #00BCD4 !important;
          background-color: #121212 !important;
          border-radius: 0.5rem !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2) !important;
        }

        .react-datepicker__triangle {
           display: none;
        }

        .react-datepicker__header {
          background-color: #1A1A1A !important;
          border-bottom: 1px solid #00BCD4 !important;
          padding-top: 0.75rem !important;
          padding-bottom: 0.5rem !important;
          border-top-left-radius: 0.5rem !important;
          border-top-right-radius: 0.5rem !important;
        }

        .react-datepicker__current-month,
        .react-datepicker-time__header,
        .react-datepicker-year-header {
          color: #FFFFFF !important;
          font-weight: 500 !important;
          font-size: 0.95rem !important;
          font-family: 'Against', sans-serif !important;
        }
        
        .react-datepicker__day-name,
        .react-datepicker__day,
        .react-datepicker__time-name {
          color: #AAAAAA !important;
          font-weight: 400 !important;
          margin: 0.2rem !important;
          line-height: 1.75rem !important;
          width: 1.75rem !important;
        }

        .react-datepicker__day:hover {
          background-color: #1E1E1E !important;
          border-radius: 0.375rem !important;
          color: #00BCD4 !important;
        }

        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: #00BCD4 !important;
          color: #000000 !important;
          border-radius: 0.375rem !important;
          font-weight: 500 !important;
        }
        
        .react-datepicker__day--outside-month {
            color: #555555 !important;
            pointer-events: none;
            opacity: 0.6;
        }

        .react-datepicker__day--disabled {
          color: #555555 !important;
           opacity: 0.7;
        }
        
        .react-datepicker__navigation {
            top: 0.75rem !important;
        }

        .react-datepicker__navigation-icon::before {
           border-color: #00BCD4 !important;
           border-width: 2px 2px 0 0 !important;
           height: 7px !important;
           width: 7px !important;
        }
        
        .react-datepicker__year-read-view--down-arrow,
         .react-datepicker__month-read-view--down-arrow,
         .react-datepicker__month-year-read-view--down-arrow {
          border-color: #00BCD4 !important;
          margin-top: 0px !important;
          border-width: 2px 2px 0 0 !important;
          height: 6px !important;
           width: 6px !important;
         }

          .react-datepicker__year-dropdown,
          .react-datepicker__month-dropdown,
          .react-datepicker__month-year-dropdown {
              background-color: #121212 !important;
              border-color: #00BCD4 !important;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2) !important;
              border-radius: 0.375rem !important;
          }
          
          .react-datepicker__year-option, 
          .react-datepicker__month-option, 
          .react-datepicker__month-year-option {
              padding: 0.3rem 0.75rem !important;
          }
          
          .react-datepicker__year-option:hover, 
          .react-datepicker__month-option:hover, 
          .react-datepicker__month-year-option:hover {
              background-color: #1E1E1E !important;
              color: #00BCD4 !important;
          }
          
          .react-datepicker__year-option--selected_year, 
          .react-datepicker__month-option--selected_month {
              color: #00BCD4 !important;
              font-weight: 500 !important;
              background-color: #1E1E1E !important;
          }
      `}</style>
    </motion.div>
  );
};

export default BirthdayDatePicker; 