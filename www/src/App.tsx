import Header from "./components/views/Header";

function App() {
  return (
    <>
      <Header />
      <div className="mx-auto bg-slate-200 dark:bg-slate-800 p-8 h-screen">
        <div className="container mx-auto bg-slate-50  dark:bg-slate-900 rounded-xl shadow p-8 m-1 max-w-lg">
          <p className="text-3xl text-gray-700 dark:text-white font-bold mb-5">
            Welcome Noa
          </p>
          <p className="text-gray-500 dark:text-gray-300 text-lg">
            Any homework to register?
          </p>
        </div>
        <div className="container mx-auto bg-slate-50  dark:bg-slate-900 rounded-xl shadow p-8 m-8 text-center max-w-lg">
          <button
            type="button"
            className=" w-full border border-blue-600 bg-blue-600 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Register homework
          </button>
          <button
            type="button"
            className=" mt-4 w-full border border-green-600 bg-green-600 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-green-700 focus:outline-none focus:shadow-outline"
          >
            Add new homework
          </button>
          <button
            type="button"
            className=" mt-4 w-full border border-green-600 bg-green-600 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-green-700 focus:outline-none focus:shadow-outline"
          >
            Show challenges
          </button>
        </div>
      </div>
    </>
  );
}
export default App;
