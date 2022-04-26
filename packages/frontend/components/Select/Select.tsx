interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  onChange: (newVal: SelectOption) => void;
  className?: string;
  value?: string;
}
const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  className,
  value,
}) => {
  return (
    <select
      className={className}
      onChange={(e) =>
        onChange(options.find((o) => o.value == e.target.value)!)
      }
      value={value}
    >
      {options.map((o) => (
        <option value={o.value} key={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
