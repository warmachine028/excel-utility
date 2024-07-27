const Button = ({ type = 'button', isDisabled = false, clickHandler, children }) => {
    return (
        <button
            type={type}
            disabled={isDisabled}
            onClick={clickHandler}
            className="ring-1 disabled:opacity-30 disabled:cursor-not-allowed ring-black rounded-sm p-3 bg-blue-500 px-10 hover:opacity-70 transition-colors duration-300 focus:bg-blue-800 ease-in-out"
        >
            {children}
        </button>
    )
}

export default Button
