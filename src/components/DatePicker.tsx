import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerProps } from '../types';
import { motion } from 'framer-motion';

const BirthdayDatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange }) => {
  // Calculate the range of years to show in the dropdown (e.g., 50 years back from current year)
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;
  
  return (
    <motion.div 
      className="mb-8 p-6 md:p-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-primary-700 text-center">
        When were you born?
      </h2>
      <p className="text-gray-700 mb-4 text-center">
        Enter your birthday to discover which movies were released on that day throughout history!
      </p>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          dateFormat="MMMM d, yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          yearDropdownItemNumber={100}
          scrollableYearDropdown
          placeholderText="Select your birthday"
          className="w-full p-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-300 text-center"
          wrapperClassName="w-full"
          showTimeSelect={false}
          isClearable
          minDate={new Date(startYear, 0, 1)}
          maxDate={new Date()}
        />
      </div>
    </motion.div>
  );
};

export default BirthdayDatePicker; 