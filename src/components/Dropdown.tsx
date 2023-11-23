import { useState } from 'react';

interface Props {
    name: string;
    placeholder?: string;
    defaultValue?: string;
    handleChange: (val: string) => void;
    options: Record<string, string>[];
    'data-testid' : string;
    classname?: string;
}
function Dropdown({
                      name,
                      placeholder,
                      defaultValue,
                      handleChange,
                      options = [],
                      'data-testid': dataTestId,
                      classname,
                  }: Props) {
    const [value, setValue] = useState(defaultValue || 'placeholder');

    const selectableValue = (v: string) => {
        if (!v) return false;
        return options.find((o) => o.key === v)
    };

    const handleOnChange = (val: string) => {
        if (selectableValue(val)) {
            setValue(val);
            handleChange(val);
        }
    };

    return (
        <div
            className={`block px-2 md:w-auto w-full ${classname}`}
            data-testid={dataTestId}
        >
            <label
                htmlFor={name}
                className="block text-defaultBody caption-small-demi"
            >
                <select
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => { handleOnChange(e.target.value); }}
                    className={`focus:ring-0 outline-none border-0 border-b border-mutePrimary text-default title-moderate-demi w-full 
              ${value !== 'placeholder' ? 'text-default' : 'text-inactive'}`}
                    data-testid={dataTestId ? `${dataTestId}-select` : ''}
                >
                    <option disabled value="placeholder">{placeholder}</option>
                    {
                        options.map((op) => <option value={op.key} key={op.key}>{op.name}</option>)
                    }
                </select>
            </label>
        </div>
    );
}

export default Dropdown;
