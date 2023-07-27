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

export default function PremiumTable(props: {
    data: [];
    parentCallback: Function;
    ReportGeneratorCallback: Function;
    handlePaginaExp: Function;
    pageNum: number;
    totalRows: number;
    thisData: any[];
}) {
    let prevdaily: Date, prevmonthly: number, prevyearly: number;
    let dailyExp = 0,
        monthlyExp = 0,
        yearlyExp = 0,
        tillNowExp = 0;
    let flag = 0;
    let yearRow = "",
        yearRowExp = "";
    let monthRowExp = "";
    let dayRow = "",
        dayRowExp = "";
    const maxPage = Math.ceil(props.totalRows / 10 - 1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let daily: Date = today,
        monthly,
        yearly;
    return (
        <section className="bg-white p-6 rounded-2xl">
            <div className="flex items-center justify-between">
                <h1 className="font-head font-semibold text-xl">
                    Exependiture Report
                </h1>
                <div className="flex items-center gap-3 font-head">
                    <h2 className="font-head font-medium pr-3 border-r">
                        {props.totalRows} Records
                    </h2>
                    <button
                        className="py-1.5 px-4 bg-[#edf9e7] text-green-700 font-medium flex items-center rounded-xl"
                        onClick={() => props.ReportGeneratorCallback()}
                    >
                        Download Report
                    </button>
                </div>
            </div>
            <table className="table-fixed w-full text-left mt-4 font-medium font-head">
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
                <tbody>
                    {props.data.map((item: any) => {
                        const date = new Date(item.createdAt);
                        date.setHours(0, 0, 0, 0);
                        daily = date;
                        monthly = date.getMonth();
                        yearly = date.getFullYear();
                        flag = 0;
                        // check for day
                        if (
                            prevdaily !== undefined &&
                            daily.toDateString() !== prevdaily.toDateString()
                        ) {
                            dayRow =
                                months[prevmonthly] +
                                " " +
                                prevdaily.getDate() +
                                ", " +
                                prevyearly +
                                ": ";
                            dayRowExp = "₹" + dailyExp;
                            dailyExp = 0;
                            flag = 1;
                        }
                        if (
                            ((monthly !== prevmonthly &&
                                yearly !== prevyearly) ||
                                (monthly !== prevmonthly &&
                                    yearly === prevyearly) ||
                                (monthly === prevmonthly &&
                                    yearly !== prevyearly)) &&
                            prevmonthly !== undefined
                        ) {
                            monthRowExp =
                                months[prevmonthly] +
                                ", " +
                                prevyearly +
                                ": " +
                                "₹" +
                                monthlyExp;

                            flag = 1;
                            monthlyExp = 0;
                        }
                        if (yearly !== prevyearly && prevyearly !== undefined) {
                            yearRow = "Year " + prevyearly + ": ";
                            yearRowExp = "₹" + yearlyExp;
                            flag = 1;
                            yearlyExp = 0;
                        }
                        const insight = (
                            <tr className="font-medium border-y bg-gray-50">
                                <td className="p-2" colSpan={2}>
                                    {yearlyExp === 0 && (
                                        <span className="flex items-center bg-indigo-50 py-1.5 px-4 rounded-xl text-indigo-800">
                                            {yearRow + yearRowExp}
                                        </span>
                                    )}
                                </td>
                                <td className="p-2">
                                    {monthlyExp === 0 && (
                                        <span className="flex items-center bg-[#edf9e7] py-1.5 px-4 rounded-xl text-green-700">
                                            {monthRowExp}
                                        </span>
                                    )}
                                </td>
                                <td className="p-2" colSpan={2}>
                                    {dailyExp === 0 && (
                                        <span className="flex items-center bg-sky-100 py-1.5 px-4 rounded-xl text-sky-700">
                                            {dayRow + dayRowExp}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        );
                        dailyExp += Number(item.expense);
                        monthlyExp += Number(item.expense);
                        yearlyExp += Number(item.expense);
                        tillNowExp += Number(item.expense);
                        const row = (
                            <tr className="border-y">
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
                        prevdaily = daily;
                        prevmonthly = monthly;
                        prevyearly = yearly;
                        return (
                            <>
                                {flag ? insight : ""} {row}
                            </>
                        );
                    })}
                    {/* this day month and year */}
                    {daily.toDateString() !== today.toDateString() && (
                        <tr className="font-medium border-y bg-gray-50">
                            <td className="p-2" colSpan={2}>
                                {yearlyExp !== 0 &&
                                    yearly !== today.getFullYear() && (
                                        <span className="flex items-center bg-indigo-50 py-1.5 px-4 rounded-xl text-indigo-800">
                                            {"Year " +
                                                yearly +
                                                ": " +
                                                "₹" +
                                                yearlyExp}
                                        </span>
                                    )}
                            </td>
                            <td className="p-2">
                                {monthly !== undefined &&
                                    monthlyExp !== 0 &&
                                    ((monthly !== today.getMonth() &&
                                        yearly !== today.getFullYear()) ||
                                        (monthly !== today.getMonth() &&
                                            yearly === today.getFullYear()) ||
                                        (monthly === today.getMonth() &&
                                            yearly !==
                                                today.getFullYear())) && (
                                        <span className="flex items-center bg-[#edf9e7] py-1.5 px-4 rounded-xl text-green-700">
                                            {months[monthly] +
                                                ", " +
                                                yearly +
                                                ": ₹" +
                                                monthlyExp}
                                        </span>
                                    )}
                            </td>
                            <td className="p-2" colSpan={2}>
                                {monthly !== undefined && dailyExp != 0 && (
                                    <span className="flex items-center bg-sky-100 py-1.5 px-4 rounded-xl text-sky-700">
                                        {months[monthly] +
                                            " " +
                                            daily.getDate() +
                                            ", " +
                                            yearly +
                                            ": " +
                                            "₹" +
                                            dailyExp}
                                    </span>
                                )}
                            </td>
                        </tr>
                    )}
                    {/* this day month and year */}
                    <tr className="font-medium border-y">
                        <td className="p-2" colSpan={2}>
                            <span className="flex items-center bg-indigo-50 py-1.5 px-4 rounded-xl text-indigo-800">
                                {"Year " +
                                    today.getFullYear() +
                                    ": " +
                                    "₹" +
                                    props.thisData[0]}
                            </span>
                        </td>
                        <td className="p-2">
                            <span className="flex items-center bg-[#edf9e7] py-1.5 px-4 rounded-xl text-green-700">
                                {months[today.getMonth()] +
                                    ", " +
                                    today.getFullYear() +
                                    ": ₹" +
                                    props.thisData[1]}
                            </span>
                        </td>
                        <td className="p-2" colSpan={2}>
                            <span className="flex items-center bg-sky-100 py-1.5 px-4 rounded-xl text-sky-700">
                                {months[today.getMonth()] +
                                    " " +
                                    today.getDate() +
                                    ", " +
                                    today.getFullYear() +
                                    " (Today): ₹" +
                                    props.thisData[2]}
                            </span>
                        </td>
                    </tr>

                    <tr className="font-medium border-t">
                        <td colSpan={5} className="p-2">
                            <span className="bg-yellow-100 py-1.5 px-6 rounded-xl text-yellow-800 float-right">
                                Total Expense: {"₹" + props.thisData[3]}
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
