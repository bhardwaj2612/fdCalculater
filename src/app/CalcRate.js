"use client";
import { useState } from "react";
import { Range } from "react-range";

export default function CalcRate({ max, min, step, values, setValues }) {

    return (<div>
        <Range
            step={step}
            min={min}
            max={max}
            values={values}
            onChange={setValues}
            renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#ccc",
                    }}
                >
                    {children}
                </div>
            )}
            renderThumb={({ props }) => {
                // 1. Separate style and key from the rest of the props
                const { key, style, ...restProps } = props;

                return (
                    <div
                        key={key} // 2. Explicitly pass the key first
                        {...restProps} // 3. Spread the remaining library props
                        style={{
                            ...style, // 4. Merge the library styles with your custom styles
                            height: "20px",
                            width: "20px",
                            borderRadius: "50%",
                            backgroundColor: "#0070f3",
                        }}
                    />
                );
            }}

        />
        {/* <h2>Selected Value: {values[0]}</h2> */}
        {/* <values /> */}
    </div>);
}