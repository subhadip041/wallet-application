export const Button = ({ label, onClick }) => {
    return (
        <button onClick={onClick} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm mt-2.5 mb-2.5 px-5 py-2.5 me-2 cursor-pointer">{label}</button>
    )
}