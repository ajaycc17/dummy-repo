const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export default function ExpenseTable(props: {
    data: [];
    parentCallback: Function;
    handlePaginaExp: Function;
    pageNum: number;
    totalRows: number;
    totalExp: number;
}) {
    const maxPage = Math.ceil(props.totalRows / 10 - 1);
    return (
        <section className="bg-white p-6 rounded-2xl">
            <div className="flex items-center justify-between">
                <h1 className="font-head font-semibold text-xl">
                    Exependiture Report
                </h1>
                <h2 className="font-head font-medium">
                    {props.totalRows} Records
                </h2>
            </div>
            <table className="table-fixed w-full text-left mt-4 font-head font-medium">
                <colgroup>
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "25%" }} />
                </colgroup>
                <thead>
                    <tr className="border-y bg-gray-50">
                        <th className="p-2">Date</th>
                        <th className="p-2">Exependiture</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    {props.data.map((item: any) => {
                        const date = new Date(item.createdAt);
                        date.setHours(0, 0, 0, 0);
                        return (
                            <tr className="border-y" key={item.id}>
                                <td className="p-2">
                                    {months[date.getMonth()] +
                                        " " +
                                        date.getDate() +
                                        ", " +
                                        date.getFullYear()}
                                </td>
                                <td className="p-2">{"₹" + item.expense}</td>
                                <td className="p-2 capitalize">
                                    {item.description}
                                </td>
                                <td className="p-2">
                                    <span className="py-1 px-4 bg-gray-100 rounded-xl font-head font-medium">
                                        {"# " + item.category}
                                    </span>
                                </td>
                                <td className="p-2">
                                    <span
                                        className="py-1 cursor-pointer px-4 rounded-xl font-medium bg-gray-100 text-gray-700 mr-2"
                                        onClick={() =>
                                            props.parentCallback(
                                                item.id,
                                                "edit"
                                            )
                                        }
                                    >
                                        Edit
                                    </span>
                                    <span
                                        className="py-1 cursor-pointer px-4 rounded-xl font-medium bg-red-100 text-red-700"
                                        onClick={() =>
                                            props.parentCallback(
                                                item.id,
                                                "delete"
                                            )
                                        }
                                    >
                                        Delete
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                    <tr className="font-medium border-t">
                        <td colSpan={5} className="p-2">
                            <span className="bg-[#edf9e7] py-1.5 px-6 rounded-xl text-green-700 float-right">
                                Total Expense: {"₹" + props.totalExp}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-3">
                <button
                    className="px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded-xl"
                    disabled={props.pageNum === 0}
                    onClick={() =>
                        props.pageNum > 0 &&
                        props.handlePaginaExp(props.pageNum - 1)
                    }
                >
                    Prev
                </button>
                <span className="px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded-xl">
                    {Number(props.pageNum * 10 + 1) +
                        " - " +
                        Number(
                            props.totalRows - props.pageNum * 10 < 10
                                ? props.totalRows -
                                      props.pageNum * 10 +
                                      props.pageNum * 10
                                : props.pageNum * 10 + 10
                        ) +
                        " out of " +
                        props.totalRows}
                </span>
                <button
                    className="px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded-xl"
                    disabled={props.pageNum === maxPage}
                    onClick={() =>
                        props.pageNum < maxPage &&
                        props.handlePaginaExp(props.pageNum + 1)
                    }
                >
                    Next
                </button>
            </div>
        </section>
    );
}
