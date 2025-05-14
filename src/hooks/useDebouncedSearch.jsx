"use client";

import { useState, useEffect, useRef } from "react";
const useDebouncedSearch = (delay = 1500) => {
  const [searchValue, setSearchValue] = useState("");
  const [delayedSearch, setDelayedSearch] = useState("");
  const typingTimeoutRef = useRef(null);
  const handleSearchChange = (value) => {
    setSearchValue(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setDelayedSearch(value);
    }, delay);
  };
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);
  return { searchValue, delayedSearch, handleSearchChange };
};
export default useDebouncedSearch;
