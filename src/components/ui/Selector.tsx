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

export default Selector;
