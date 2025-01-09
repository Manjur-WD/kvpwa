import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addMaxPrice, addMinPrice } from "../../redux/features/filterProducts/FilterSlice";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const formatPrice = (value) => {
  if (value >= 10000000) {
    return (value / 10000000).toFixed(2) + " Cr";
  } else if (value >= 100000) {
    return (value / 100000).toFixed(2) + " L";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(2) + " T";
  }
  return value.toString();
};

const PriceRangeSlider = (props) => {
  const dispatch = useDispatch();
  const max_price = props?.max_price ?? 10000;
  const min_price = props?.min_price ?? 0;
  const priceGap = props?.priceGap ?? 10; // Smaller gap for smoother adjustment

  const [minValue, setMinValue] = useState(min_price);
  const [maxValue, setMaxValue] = useState(max_price);

  useEffect(() => {
    setMinValue(min_price);
    setMaxValue(max_price);
  }, [min_price, max_price]);

  const logFinalValues = useCallback(
    debounce((minValue, maxValue) => {
      dispatch(addMaxPrice(maxValue));
      dispatch(addMinPrice(minValue));
    }, 300),
    []
  );

  const handleRangeChange = (type, value) => {
    const parsedValue = parseFloat(value);
    if (type === "min") {
      const newValue = Math.min(maxValue - priceGap, parsedValue);
      setMinValue(newValue);
      logFinalValues(newValue, maxValue);
    } else if (type === "max") {
      const newValue = Math.max(minValue + priceGap, parsedValue);
      setMaxValue(newValue);
      logFinalValues(minValue, newValue);
    }
  };

  return (
    <div className="wrapper price-range">
      <header>
        <p>Use slider to adjust min and max price</p>
      </header>
      <div className="price-input">
        <div className="field">
          <label htmlFor="min-price">Min</label>
          <input
            id="min-price"
            type="text"
            className="input-min text-[12px]"
            value={formatPrice(minValue)}
            readOnly
          />
        </div>
        <div className="separator">-</div>
        <div className="field">
          <label htmlFor="max-price">Max</label>
          <input
            id="max-price"
            type="text"
            className="input-max md:text-sm text-[12px]"
            value={formatPrice(maxValue)}
            readOnly
          />
        </div>
      </div>
      <div className="slider">
        <div
          className="progress"
          style={{
            left: `${((minValue - min_price) / (max_price - min_price)) * 100}%`,
            right: `${100 - ((maxValue - min_price) / (max_price - min_price)) * 100}%`,
          }}
        ></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min={min_price}
          max={max_price}
          value={minValue}
          step="1" // Smaller step for finer control
          onChange={(e) => handleRangeChange("min", e.target.value)}
        />
        <input
          type="range"
          className="range-max"
          min={min_price}
          max={max_price}
          value={maxValue}
          step="1" // Smaller step for finer control
          onChange={(e) => handleRangeChange("max", e.target.value)}
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
