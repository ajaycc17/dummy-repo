import Link from "next/link";

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

export default function ReportsList(props: {
    data: [];
    handlePaginaFiles: Function;
    filesPageNum: number;
    totalFileRows: number;
}) {
    const maxPage = Math.ceil(props.totalFileRows / 10 - 1);
    return (
        <div className="bg-white p-6 rounded-2xl">
            <div className="flex items-center justify-between">
                <h1 className="font-head font-semibold text-xl">
                    Generated Reports
                </h1>
                <h2 className="font-medium">{props.totalFileRows} Records</h2>
            </div>
            <table className="table-fixed w-full text-left mt-4 font-medium">
                <colgroup>
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "35%" }} />
                    <col style={{ width: "35%" }} />
                </colgroup>
                <thead>
                    <tr className="border-y">
                        <th className="p-2">Name</th>
                        <th className="p-2">Generated On</th>
                        <th className="p-2">Report Files</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item: any, index) => {
                        let date = item.createdAt;
                        date = new Date(date);
                        return (
                            <tr className="border-y" key={index}>
                                <td className="p-2">Report - {index + 1}</td>
                                <td className="p-2">
                                    {months[date.getMonth()] +
                                        " " +
                                        date.getDate() +
                                        ", " +
                                        date.getFullYear()}
                                </td>
                                <td className="p-2">
                                    <Link href={item.filesUrl}>
                                        <span className="py-1 cursor-pointer px-4 rounded-xl font-medium bg-[#edf9e7] text-green-700">
                                            Download
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-3">
                <button
                    className="px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded-xl"
                    disabled={props.filesPageNum === 0}
                    onClick={() =>
                        props.filesPageNum > 0 &&
                        props.handlePaginaFiles(props.filesPageNum - 1)
                    }
                >
                    Prev
                </button>
                <span className="px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded-xl">
                    {Number(props.filesPageNum * 10 + 1) +
                        " - " +
                        Number(
                            props.totalFileRows - props.filesPageNum * 10 < 10
                                ? props.totalFileRows -
                                      props.filesPageNum * 10 +
                                      props.filesPageNum * 10
                                : props.filesPageNum * 10 + 10
                        ) +
                        " out of " +
                        props.totalFileRows}
                </span>
                <button
                    className="px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded-xl"
                    disabled={props.filesPageNum === maxPage}
                    onClick={() =>
                        props.filesPageNum < maxPage &&
                        props.handlePaginaFiles(props.filesPageNum + 1)
                    }
                >
                    Next
                </button>
            </div>
        </div>
    );
}
