const CustomHeader = () => {
    return (
        <div className="title-container fixed top-0 bg-white z-10 w-full text-center py-4 shadow-md flex items-center justify-center gap-4">
            <img 
                src="https://www.shutterstock.com/image-vector/atlas-holding-globe-logo-design-600nw-2194317793.jpg" 
                alt="Atlas Holding Globe" 
                className="w-24 h-24 object-cover rounded-full"
            />
            <div className="flex flex-col items-center pr-24"> {/* Padding right to match image size */}
                <h1 className="text-6xl font-bold text-purple-800">Welcome to Atlas!</h1>
                <p className="text-xl text-purple-600">The student loan and savings simulator</p>
            </div>
        </div>
        )
};

export default CustomHeader;
