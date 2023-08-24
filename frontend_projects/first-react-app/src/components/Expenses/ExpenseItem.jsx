// import React from "react";
import ExpenseDate from "./ExpenseDate";
import ExpenseDetails from "./ExpenseDetails";
import Card from "../UI/Card";

const ExpenseItem = (props) => {
    const deleteExp = (e) => {
        e.target.parentElement.remove();
    };
    return (
        <Card className="text-black flex gap-2">
            <ul>
                <li>
                    <ExpenseDate date={props.date} /> -{" "}
                    <ExpenseDetails
                        amount={props.amount}
                        title={props.title}
                        location={props.location}
                    />
                </li>
            </ul>
            <button onClick={deleteExp}>Delete Expense</button>
        </Card>

        // // originally JSX gets transformed into code like this
        // React.createElement(
        //     "div",
        //     { className: "expense-item" },
        //     React.createElement(ExpenseDate, { date: props.date }),
        //     React.createElement(
        //         "div",
        //         {},
        //         React.createElement("h1", {}, "Expense 1"),
        //         React.createElement("h1", {}, "Expense 2")
        //     )
        // )
    );
};

export default ExpenseItem;
