export function LoadingSpinner() {
  return (
    <div
      className={`animate-spin flex rounded-full w-6 h-6 bg-gradient-to-tr from-indigo-500 to-black mr-2`}
    >
      <div className="h-4 w-4 rounded-full m-auto bg-blue-600"></div>
    </div>
  )
}
