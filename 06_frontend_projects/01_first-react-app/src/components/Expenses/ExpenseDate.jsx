const ExpenseDate = (props) => {
    const month = props.date.toLocaleString("en-US", { month: "long" });
    const day = props.date.toLocaleString("en-US", { day: "2-digit" });
    const year = props.date.getFullYear();
    return (
        <span>
            {day} {month}, {year}
        </span>
    );
};

export default ExpenseDate;
