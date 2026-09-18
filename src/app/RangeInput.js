"use client";

import { Range } from "react-range";

export default function RangeInput({
    min,
    max,
    step,
    values,
    setValues,
}) {
    return (
        <div>
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
                    const { key, style, ...restProps } = props;

                    return (
                        <div
                            key={key}
                            {...restProps}
                            style={{
                                ...style,
                                height: "20px",
                                width: "20px",
                                borderRadius: "50%",
                                backgroundColor: "#0070f3",
                            }}
                        />
                    );
                }}
            />
        </div>
    );
}