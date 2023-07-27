import {
    TbRosetteNumber1,
    TbRosetteNumber2,
    TbRosetteNumber3,
} from "react-icons/tb";

export default function Leaderboard(props: {
    data: [];
    handlePaginaLeader: Function;
    leaderPageNum: number;
    totalLeaderRows: number;
}) {
    const maxPage = Math.ceil(props.totalLeaderRows / 10 - 1);
    return (
        <section className="bg-white p-6 rounded-2xl">
            <div className="flex items-center justify-between">
                <h1 className="font-head font-semibold text-xl">
                    User Leaderboard
                </h1>
                <h2 className="font-head font-medium">
                    {props.totalLeaderRows} Users
                </h2>
            </div>
            <table className="table-fixed w-full text-left mt-4 font-medium">
                <colgroup>
                    <col style={{ width: "60%" }} />
                    <col style={{ width: "40%" }} />
                </colgroup>
                <thead>
                    <tr className="border-y">
                        <th className="p-2">Name</th>
                        <th className="p-2">Expenditure</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item: any, index) => {
                        let rankIcon, highlight;
                        if (index === 0) {
                            rankIcon = (
                                <TbRosetteNumber1 className="text-xl text-sky-800 w-5 h-5 mr-2 rounded-full" />
                            );
                            highlight = "bg-sky-50 font-medium text-sky-700";
                        } else if (index === 1) {
                            rankIcon = (
                                <TbRosetteNumber2 className="text-xl text-sky-800 w-5 h-5 mr-2 rounded-full" />
                            );
                            highlight = "bg-sky-50 font-medium text-sky-700";
                        } else if (index === 2) {
                            rankIcon = (
                                <TbRosetteNumber3 className="text-xl text-sky-800 w-5 h-5 mr-2 rounded-full" />
                            );
                            highlight = "bg-sky-50 font-medium text-sky-700";
                        } else {
                            rankIcon = "";
                            // highlight = "bg-sky-50 text-sky-700";
                        }
                        return (
                            <tr className="border-y" key={index}>
                                <td className="p-2">
                                    <span
                                        className={`${highlight} py-1 px-4 rounded-xl flex items-center`}
                                    >
                                        {rankIcon}
                                        {item.name}
                                    </span>
                                </td>
                                <td className="p-2">
                                    <span
                                        className={`${highlight} py-1 px-4 rounded-xl flex items-center`}
                                    >
                                        {"₹" + item.totalExpense}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-3">
                <button
                    className="px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded-xl"
                    disabled={props.leaderPageNum === 0}
                    onClick={() =>
                        props.leaderPageNum > 0 &&
                        props.handlePaginaLeader(props.leaderPageNum - 1)
                    }
                >
                    Prev
                </button>
                <span className="px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded-xl">
                    {Number(props.leaderPageNum * 10 + 1) +
                        " - " +
                        Number(
                            props.totalLeaderRows - props.leaderPageNum * 10 <
                                10
                                ? props.totalLeaderRows -
                                      props.leaderPageNum * 10 +
                                      props.leaderPageNum * 10
                                : props.leaderPageNum * 10 + 10
                        ) +
                        " out of " +
                        props.totalLeaderRows}
                </span>
                <button
                    className="px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded-xl"
                    disabled={props.leaderPageNum === maxPage}
                    onClick={() =>
                        props.leaderPageNum < maxPage &&
                        props.handlePaginaLeader(props.leaderPageNum + 1)
                    }
                >
                    Next
                </button>
            </div>
        </section>
    );
}
