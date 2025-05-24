declare module 'react-mobile-datepicker' {
    import * as React from 'react';

    export interface DatePickerProps {
        value: Date;
        isOpen: boolean;
        theme?: string;
        confirmText?: string;
        cancelText?: string;
        min?: Date;
        max?: Date;
        dateFormat?: string[];
        showFormat?: string;
        showHeader?: boolean;
        onSelect: (date: Date) => void;
        onCancel?: () => void;
    }

    const DatePicker: React.FC<DatePickerProps>;
    export default DatePicker;
}