import './globals.css';

export const metadata = {
  title: 'Hotel Offers',
  description: 'Find the best hotel offers!',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <header className="bg-teal-800 text-white p-6 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Example logo or brand icon */}
              <div className="text-4xl font-bold">HotelHub</div>
            </div>
            <nav>
              <ul className="flex space-x-8">
                <li><a href="#home" className="text-lg font-medium hover:text-teal-300 transition-colors">Home</a></li>
                <li><a href="#offers" className="text-lg font-medium hover:text-teal-300 transition-colors">Offers</a></li>
                <li><a href="#about" className="text-lg font-medium hover:text-teal-300 transition-colors">About</a></li>
                <li><a href="#contact" className="text-lg font-medium hover:text-teal-300 transition-colors">Contact</a></li>
              </ul>
            </nav>
            <button className="bg-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 transition-colors">
              Get Started
            </button>
          </div>
        </header>
        <main className="container mx-auto p-6">{children}</main>
        <footer className="bg-teal-900 text-white text-center py-8 mt-8">
          <div className="container mx-auto">
            <p className="text-sm mb-4">&copy; {new Date().getFullYear()} HotelHub. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-teal-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-teal-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-teal-300 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
