import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col pl-11 pr-11 md:flex-row items-center justify-between min-h-screen p-4 bg-gray-50">
      <div className="md:w-1/2 flex flex-col items-start space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Platform</h1>
        <p className="text-gray-600">
          Discover amazing features and streamline your workflow with our innovative platform.
        </p>

        <div className="flex  gap-5">
          <Link href={`./addschool`} ><button className="px-10 py-3 border-[2px]  font-medium  hover:bg-gray-300 hover:text-white transition hover:border-gray-300 text-black border-black">
            Add Student
          </button></Link>
          <Link href={`./listschool`} ><button className="px-10 py-3 border-[2px]  font-medium  hover:bg-gray-300 hover:text-white transition hover:border-gray-300 text-black border-black">
            See Student
          </button></Link>

        </div>
      </div>
      {/* Right Image */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img
          src="/edu.jpg"
          alt="Placeholder"
          className=""
        />
      </div>
    </div>
  );
}
