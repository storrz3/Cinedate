declare module 'react-datepicker' {
  import React from 'react';
  
  export interface ReactDatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null, event: React.SyntheticEvent<any> | undefined) => void;
    dateFormat?: string | string[];
    showMonthDropdown?: boolean;
    showYearDropdown?: boolean;
    scrollableYearDropdown?: boolean;
    yearDropdownItemNumber?: number;
    showTimeSelect?: boolean;
    dropdownMode?: 'scroll' | 'select';
    placeholderText?: string;
    className?: string;
    wrapperClassName?: string;
    isClearable?: boolean;
    minDate?: Date;
    maxDate?: Date;
    [key: string]: any;
  }
  
  export default class DatePicker extends React.Component<ReactDatePickerProps> {}
} 