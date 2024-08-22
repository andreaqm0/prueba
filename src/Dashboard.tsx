import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Dashboard() {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(
        "https://devapi.criafurniture.com/api/v1/component/get/components"
      );
      const data = await response.data;
      return data;
    },
  });

  const switchStatus = async (id: string, active: boolean) => {
    const response = await axios.post(
      "https://devapi.criafurniture.com/api/v1/component/status/component",
      {
        id,
        status: !active,
      }
    );
    if (response.status === 200) {
      refetch();
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <main className="m-5 space-y-5">
      <h1 className="text-3xl font-semibold">Dashboard Productos</h1>
      <div className="w-full overflow-x-auto">
        <table
          className="w-full text-left border border-collapse rounded sm:border-separate border-slate-200"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Type
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Serial Name
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Size
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Status
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              ></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((product: any) => (
              <tr>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {product.type}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {product.serial_name}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  <div>D: {product.size.D}</div>
                  <div>H: {product.size.H}</div>
                  <div>W: {product.size.W}</div>
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {product.active ? "Active" : "Inactive"}
                </td>
                <td>
                  <button
                    onClick={() => switchStatus(product.id, product.active)}
                    className="inline-flex h-10 items-center justify-center gap-2 self-center whitespace-nowrap rounded-full bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                  >
                    <span className="relative only:-mx-5">
                      <span className="sr-only">Cambiar estado</span>
                      <span>{product.active ? "Deactivate" : "Activate"}</span>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
