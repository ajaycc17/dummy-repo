export default function ExpenseItem(props) {
    return (
        <div>
            <ul>
                <li>
                    {props.date.toISOString()} - {props.location} -{" "}
                    {props.title} - ${props.amount}
                </li>
            </ul>
        </div>
    );
}
