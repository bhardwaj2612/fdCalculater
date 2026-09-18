"use client";

import { useState } from "react";
import RangeCom from "./RangeCom";
import CalcRate from "./CalcRate";
import CalcTime from "./calcTime";
import BarGraph from "./BarGraph";

export default function Calculater() {
    const [values, setValues] = useState([100000]);
    const [valuesRate, setValuesRate] = useState([7]);
    const [valuesTime, setValuesTime] = useState([5]);

    const [interest, setInterest] = useState(0);
    const [total, setTotal] = useState(0);

    const [time, setTime] = useState([]);

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

    const funds = (value, rate, timePeriod) => {
        const principal = Number(value[0]);
        const interestRate = Number(rate[0]);
        const years = Number(timePeriod[0]);

        if (
            principal > 0 &&
            interestRate > 0 &&
            years > 0
        ) {

            const siValue =
                (principal * interestRate * years) / 100;


            const totalValue = principal + siValue;

            setInterest(Number(siValue.toFixed(2)));
            setTotal(Number(totalValue.toFixed(2)));


            createGraph(
                principal,
                interestRate,
                years
            );
        }
    };


    const createGraph = (principal, rate, years) => {
        const labels = [];
        const amounts = [];

        for (let year = 1; year <= years; year++) {

            const yearlyInterest =
                (principal * rate * year) / 100;


            const yearlyTotal =
                principal + yearlyInterest;

            labels.push(year);

            amounts.push(
                Number(yearlyTotal.toFixed(2))
            );
        }

        setTime(labels);

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



    const timeCal = (le) => {
        const principal = Number(values[0]);
        const rate = Number(valuesRate[0]);

        const labels = [];
        const amounts = [];

        for (let year = 1; year <= le; year++) {
            const simpleInterest =
                (principal * rate * year) / 100;

            const totalAmount =
                principal + simpleInterest;

            labels.push(year);
            amounts.push(
                Number(totalAmount.toFixed(2))
            );
        }

        setTime(labels);

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
                                ₹{Number(values[0]).toLocaleString("en-IN")}
                            </span>

                        </div>

                        <RangeCom
                            min={10000}
                            max={5000000}
                            step={1000}
                            values={values}
                            setValues={setValues}
                        />

                    </div>



                    <div className="mb-10">

                        <div className="mb-4 flex justify-between items-center">

                            <h2 className="text-xl font-semibold text-slate-500">
                                Rate Of Return (%)
                            </h2>

                            <span className="rounded-full bg-gray-100 px-5 py-2">
                                {valuesRate[0]}%
                            </span>

                        </div>

                        <CalcRate
                            min={5}
                            max={30}
                            step={1}
                            values={valuesRate}
                            setValues={setValuesRate}
                        />

                    </div>



                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 pb-4 border-b border-slate-100">

                        <h2 className="text-xl font-semibold text-slate-700">
                            Interest Payout
                        </h2>

                        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">

                            <button
                                onClick={() => timeCal(5)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-white hover:text-slate-950 hover:shadow-sm transition-all"
                            >
                                Quarterly
                            </button>

                            <button
                                onClick={() => timeCal(6)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-white hover:text-slate-950 hover:shadow-sm transition-all"
                            >
                                Half-Yearly
                            </button>

                            <button
                                onClick={() => timeCal(12)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-white hover:text-slate-950 hover:shadow-sm transition-all"
                            >
                                Yearly
                            </button>

                        </div>

                    </div>



                    <div className="mb-10">

                        <div className="mb-4 flex justify-between items-center">

                            <h2 className="text-xl font-semibold text-slate-500">
                                Time Period (Years)
                            </h2>

                            <span className="rounded-full bg-gray-100 px-5 py-2">
                                {valuesTime[0]}
                            </span>

                        </div>

                        <CalcTime
                            min={1}
                            max={50}
                            step={1}
                            values={valuesTime}
                            setValues={setValuesTime}
                        />

                    </div>



                    <button
                        className="bg-[#b28a6a] hover:bg-[#9c7658] text-white font-bold py-3 px-6 rounded-full mb-10"
                        type="button"
                        onClick={() =>
                            funds(
                                values,
                                valuesRate,
                                valuesTime
                            )
                        }
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
                                {(total || 0).toLocaleString("en-IN")}
                            </h2>

                        </div>

                        <div>

                            <p className="text-sm text-white/70">
                                Interest Earned
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-1">
                                ₹
                                {(interest || 0).toLocaleString("en-IN")}
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