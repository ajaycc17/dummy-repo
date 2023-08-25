const ExpenseDetails = (props) => {
    return (
        <span>
            {props.location} - {props.title} - ${props.amount}
        </span>
    );
};

export default ExpenseDetails;
