import ExpenseItem from "./components/Expenses/ExpenseItem";
import Card from "./components/UI/Card";

const App = () => {
    const exp = [
        {
            id: 1,
            title: "Car Insurance",
            amount: 294.67,
            date: new Date(2021, 2, 28),
            location: "Brisbane",
        },
        {
            id: 2,
            title: "Petrol",
            amount: 10.67,
            date: new Date(2021, 2, 28),
            location: "Brisbane",
        },
        {
            id: 3,
            title: "Groceries",
            amount: 100.67,
            date: new Date(2021, 2, 28),
            location: "Mumbai",
        },
    ];
    return (
        <Card className="text-red-700">
            <h1>Expense Items:</h1>
            {exp.map((item) => (
                <ExpenseItem
                    key={item.id}
                    title={item.title}
                    amount={item.amount}
                    date={item.date}
                    location={item.location}
                />
            ))}
        </Card>
    );
};

export default App;
