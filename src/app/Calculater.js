"use client";

import { useState } from "react";
import BarGraph from "./BarGraph";
import RangeInput from "./RangeInput";

export default function Calculater() {
    const [principal, setPrincipal] = useState([10000]);
    const [rate, setRate] = useState([5]);
    const [timeV, setTimeV] = useState([2]);

    const [interest, setInterest] = useState(0);
    const [total, setTotal] = useState(0);

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Amount",
                data: [],
                backgroundColor: "#dfc6af",
                borderColor: "#dfc6af",
                borderWidth: 1,
            },
        ],
    });


    const funds = () => {
        const principalValue = Number(principal[0]);
        const interestRate = Number(rate[0]);
        const years = Number(timeV[0]);

        if (
            principalValue > 0 &&
            interestRate > 0 &&
            years > 0
        ) {

            const siValue =
                (principalValue * interestRate * years) / 100;

            const totalValue =
                principalValue + siValue;

            setInterest(Number(siValue.toFixed(2)));
            setTotal(Number(totalValue.toFixed(2)));

            createGraph(
                principalValue,
                interestRate,
                years
            );
        }
    };


    const createGraph = (principalValue, interestRate, years) => {
        const labels = [];
        const amounts = [];

        for (let year = 1; year <= years; year++) {
            const yearlyInterest =
                (principalValue * interestRate * year) / 100;

            const yearlyTotal =
                principalValue + yearlyInterest;

            labels.push(`Year ${year}`);

            amounts.push(
                Number(yearlyTotal.toFixed(2))
            );
        }

        setChartData({
            labels: labels,

            datasets: [
                {
                    label: "Amount",
                    data: amounts,
                    backgroundColor: "#dfc6af",
                    borderColor: "#dfc6af",
                    borderWidth: 1,
                },
            ],
        });
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="flex justify-between gap-24 border border-gray-300 rounded-lg p-6 m-4">

                {/* LEFT SIDE */}
                <div className="w-1/2">

                    <h1 className="text-2xl font-bold text-slate-800 tracking-wide sm:text-2xl mb-10">
                        FD Calculator
                    </h1>

                    <p className="text-sm text-slate-400 mb-8">
                        Estimates how much your fixed deposit
                        investment will grow over time.
                    </p>


                    <div className="mb-10">

                        <div className="mb-4 flex justify-between items-center">

                            <h2 className="text-xl font-semibold text-slate-500">
                                Deposit Amount (₹)
                            </h2>

                            <span className="rounded-full bg-gray-100 px-5 py-2">
                                ₹
                                {Number(principal[0]).toLocaleString(
                                    "en-IN"
                                )}
                            </span>

                        </div>

                        <RangeInput
                            min={1000}
                            max={100000}
                            step={1000}
                            values={principal}
                            setValues={setPrincipal}
                        />

                    </div>


                    <div className="mb-10">

                        <div className="mb-4 flex justify-between items-center">

                            <h2 className="text-xl font-semibold text-slate-500">
                                Rate Of Return (%)
                            </h2>

                            <span className="rounded-full bg-gray-100 px-5 py-2">
                                {rate[0]}%
                            </span>

                        </div>

                        <RangeInput
                            min={1}
                            max={20}
                            step={1}
                            values={rate}
                            setValues={setRate}
                        />

                    </div>


                    <div className="mb-10">

                        <div className="mb-4 flex justify-between items-center">

                            <h2 className="text-xl font-semibold text-slate-500">
                                Time Period (Years)
                            </h2>

                            <span className="rounded-full bg-gray-100 px-5 py-2">
                                {timeV[0]} Years
                            </span>

                        </div>

                        <RangeInput
                            min={1}
                            max={10}
                            step={1}
                            values={timeV}
                            setValues={setTimeV}
                        />

                    </div>


                    <button
                        className="bg-[#b28a6a] hover:bg-[#9c7658] text-white font-bold py-3 px-6 rounded-full mb-10"
                        type="button"
                        onClick={funds}
                    >
                        Calculate
                    </button>

                    {total > 0 && (
                        <div>

                            <h2 className="text-xl font-semibold text-slate-900 mb-3">
                                Calculated Funds: ₹
                                {total.toLocaleString("en-IN")}
                            </h2>

                            <h2 className="text-xl font-semibold text-slate-900">
                                Interest: ₹
                                {interest.toLocaleString("en-IN")}
                            </h2>

                        </div>
                    )}

                </div>


                <div className="w-1/2 bg-[#d3b79d] rounded-xl p-6">

                    <div className="grid grid-cols-2 gap-8 mb-6">

                        <div>

                            <p className="text-sm text-white/70">
                                Maturity Amount
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-1">
                                ₹
                                {(total || 0).toLocaleString(
                                    "en-IN"
                                )}
                            </h2>

                        </div>

                        <div>

                            <p className="text-sm text-white/70">
                                Interest Earned
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-1">
                                ₹
                                {(interest || 0).toLocaleString(
                                    "en-IN"
                                )}
                            </h2>

                        </div>

                    </div>


                    <div className="bg-white rounded-2xl p-5">

                        <BarGraph Bardata={chartData} />

                    </div>

                </div>

            </div>

        </div>
    );
}