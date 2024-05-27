export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center max-w-4xl m-auto">
        <h1 className=" text-4xl font-bold text-center max-w-lg ">
          Welcome to the admin page
        </h1>
        <p className=" font-medium my-4 ">
          An account is needed to view this page
        </p>

        <button
          className="inline-block rounded border border-indigo-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        >
          Sign In with Google
        </button>

      </div>
    </>
  );
}
