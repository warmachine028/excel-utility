const Details = () => {
    return (
        <main className="container mx-auto">
            <section className="ring-1 ring-blue-600 my-20 p-10 rounded-xl flex items-center justify-center">
                <table className="table-auto border-collapse rounded-xl min-w-[600px] text-white bg-slate-500">
                    <thead className="">
                        <tr>
                            <th className="px-4 py-2">Code Head</th>
                            <th className="px-4 py-2">Job No.</th>
                            <th className="px-4 py-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-800">
                        <tr className="even:bg-gray-700 hover:bg-gray-600 *:border *:border-x-gray-600 *:border-y-gray-600 last-of-type:border-b-0">
                            <td className="px-4 py-2">1/11/121</td>
                            <td className="px-4 py-2">Manasd JD</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="even:bg-gray-700 hover:bg-gray-600 *:border *:border-x-gray-600 *:border-y-gray-600 last-of-type:border-b-0">
                            <td className="px-4 py-2">1/11/121</td>
                            <td className="px-4 py-2">Manasd JD</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="even:bg-gray-700 hover:bg-gray-600 *:border *:border-x-gray-600 *:border-y-gray-600 last-of-type:border-b-0">
                            <td className="px-4 py-2">1/11/121</td>
                            <td className="px-4 py-2">Manasd JD</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Details
