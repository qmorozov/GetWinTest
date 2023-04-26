import { Select } from 'antd';
import { FC, useEffect, useState } from 'react';

const { Option } = Select;

export interface IOption {
  value: string;
  label: string;
}

export interface ICustomSelect {
  options: IOption[];
  required?: boolean;
  placeholder: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

const CustomSelect: FC<ICustomSelect> = ({
  options,
  onChange,
  placeholder,
  required = false,
  defaultValue,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const defaultOption = options.length > 0 ? options[0].value : undefined;
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue || defaultOption,
  );

  useEffect(() => {
    if (required) {
      setSelectedValue(defaultOption);
    }
  }, [defaultOption]);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div title={required ? 'This field is Required' : placeholder}>
      {placeholder && (
        <p className={`label-placeholder ${required ? '--required' : ''}`}>
          {placeholder}
        </p>
      )}
      <Select
        suffixIcon={
          <svg
            style={{
              transform: `rotate(${isDropdownOpen ? 180 : 0}deg)`,
              transition: 'transform 0.3s ease-in-out',
            }}
            width="10"
            height="5"
            viewBox="0 0 10 5"
          >
            <path d="M0 0L5 5L10 0H0Z" fill="#4E5AF2" />
          </svg>
        }
        onDropdownVisibleChange={(visible) => setIsDropdownOpen(visible)}
        value={selectedValue}
        style={{ width: '100%' }}
        onChange={handleChange}
      >
        {options.map(({ value, label }, index) => (
          <Option value={value} key={index}>
            {label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
