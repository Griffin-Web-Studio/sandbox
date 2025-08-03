import React, { useState, useRef, useEffect } from "react";

const Selector = (props) => {
  const { options, onSelect, multiple, value, className, ...otherAttributes } =
    props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  //need selected option for single select
  const selectedOption = options.filter(
    (option) => option.selected === true
  )[0];

  useEffect(() => {
    function handleResize() {
      // Recalculate the position of the list element here
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      listRef.current.style.top = `${dropdownRect.bottom}px`;
      listRef.current.style.right = `${
        window.innerWidth - dropdownRect.right
      }px`;
      listRef.current.style.minWidth = `${dropdownRef.current.offsetWidth}px`;
    }

    function handleScroll() {
      // Recalculate the position of the list element here
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      listRef.current.style.top = `${dropdownRect.bottom}px`;
      listRef.current.style.right = `${
        window.innerWidth - dropdownRect.right
      }px`;
      listRef.current.style.minWidth = `${dropdownRef.current.offsetWidth}px`;
    }

    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //handle auto close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  //handle list click
  // useEffect(() => {
  //     function handleListClick(event) {
  //         if (event.target.classList.contains("option")) {
  //             const selectedValue = event.target.getAttribute("value");
  //             const selectedOption = options.filter((option) => option.value === selectedValue)[0];
  //             onSelect(selectedOption);
  //             setIsOpen(false);
  //         }
  //     }

  //     listRef.current.addEventListener("click", handleListClick);

  //     return () => {
  //         listRef.current.removeEventListener("click", handleListClick);
  //     };
  // }, [options, onSelect]);

  //handle list keydown
  const onOptionSelectHandler = (event) => {
    const selectedValue = event.target.getAttribute("value");

    if (selectedOption.value !== selectedValue) {
      const UpdatedSelectedValue = options.map((item) => {
        if (item.selected) {
          return { ...item, selected: false };
        } else if (item.value === selectedValue) {
          return { ...item, selected: true };
        } else {
          return item;
        }
      });
      onSelect(UpdatedSelectedValue);
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`fancyDropdown ${isOpen ? "open" : "closed"} ${className}`}
      onClick={() => {
        setIsOpen((oldState) => !oldState);
      }}
      tabIndex="0"
      aria-label={multiple ? "Select options" : "select an option"}
      {...otherAttributes}
    >
      <span className="current">
        {multiple ? "Options selected" : selectedOption.label}
      </span>
      <div ref={listRef} className="list">
        <ul>
          {options.map((option) => (
            <li
              key={option.value}
              className={`option ${option.selected ? " selected" : ""}`}
              value={option.value}
              label={option.label}
              onClick={onOptionSelectHandler}
            >
              {option.label}
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
