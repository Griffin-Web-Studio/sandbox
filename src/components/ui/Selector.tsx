import React, { useState, useRef, useEffect } from "react";

export interface option {
  value: string;
  selected: boolean;
  label: string;
}

export interface SelectorProps {
  options: option[];
  onSelect: (options: option[]) => void;
  className?: string;
  multiple?: boolean;
}

export const Selector: React.FC<SelectorProps> = ({
  options,
  onSelect,
  multiple = false,
  className = "",
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const currentOption = options.filter((option) => option.selected === true)[0];

  useEffect(() => {
    function handleResize() {
      const dropdown = dropdownRef.current;
      const list = listRef.current;

      if (!dropdown || !list) return;

      // Recalculate the position of the list element here
      const dropdownRect = dropdown.getBoundingClientRect();
      list.style.top = `${dropdownRect.bottom}px`;
      list.style.right = `${window.innerWidth - dropdownRect.right}px`;
      list.style.minWidth = `${dropdown.offsetWidth}px`;
    }

    function handleScroll() {
      const dropdown = dropdownRef.current;
      const list = listRef.current;

      if (!dropdown || !list) return;

      // Recalculate the position of the list element here
      const dropdownRect = dropdown.getBoundingClientRect();
      list.style.top = dropdownRect.bottom + "px";
      list.style.right = window.innerWidth - dropdownRect.right + "px";
      list.style.minWidth = dropdown.offsetWidth + "px";
    }

    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dropdownRef, listRef]);

  //handle auto close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  //handle auto close on escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onOptionSelectHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    const optionValue = event.currentTarget.getAttribute("value");

    if (currentOption.value === optionValue) return;

    const updatedOptions = options.map((item) => {
      if (item.selected) {
        return { ...item, selected: false };
      } else if (item.value === optionValue) {
        return { ...item, selected: true };
      } else {
        return item;
      }
    });
    onSelect(updatedOptions);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`fancyDropdown ${isOpen ? "open" : "closed"} ${className}`}
      onClick={() => {
        setIsOpen((old) => !old);
      }}
      tabIndex={0}
      aria-label={multiple ? "Select options" : "select an option"}
      {...rest}
    >
      <span className="current">
        {multiple ? "Options selected" : currentOption.label}
      </span>
      <div ref={listRef} className="list">
        <ul>
          {options.map(({ value, selected, label }) => (
            <li
              key={value}
              className={`option ${selected ? " selected" : ""}`}
              value={value}
              onClick={onOptionSelectHandler}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const InputCheckbox = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="checkbox"
      className={`checkbox ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputRadio = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="radio"
      className={`radio ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputText = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="text"
      className={`text ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputNumber = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="number"
      className={`number ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputEmail = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="email"
      className={`email ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputPassword = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="password"
      className={`password ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputDate = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="date"
      className={`date ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputTime = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="time"
      className={`time ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputDateTimeLocal = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="datetime-local"
      className={`datetime-local ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputMonth = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="month"
      className={`month ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputWeek = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="week"
      className={`week ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputColor = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="color"
      className={`color ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputRange = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="range"
      className={`range ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputFile = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="file"
      className={`file ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputSearch = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="search"
      className={`search ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputTel = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="tel"
      className={`tel ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

const InputUrl = (props) => {
  const { onChange, value, className, ...otherAttributes } = props;
  return (
    <input
      type="url"
      className={`url ${className}`}
      onChange={onChange}
      value={value}
      {...otherAttributes}
    />
  );
};

export {
  Selector,
  InputCheckbox,
  InputRadio,
  InputText,
  InputNumber,
  InputEmail,
  InputPassword,
  InputDate,
  InputTime,
  InputDateTimeLocal,
  InputMonth,
  InputWeek,
  InputColor,
  InputRange,
  InputFile,
  InputSearch,
  InputTel,
  InputUrl,
};
