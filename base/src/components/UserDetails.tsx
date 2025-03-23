import React, { useState } from 'react'

const UserDetails = () => {
  const [isCollapsedSearchMenu, setIsCollapsedSearchMenu] = useState(false);

    const handleSearchMenuToggle = () => {
        setIsCollapsedSearchMenu(!isCollapsedSearchMenu);
      };
  return (
    <>
       {/* <div className="h-auto bg-white p-4 rounded shadow">User</div> */}
            <aside
              className={`bg-gray-200 text-black h-screen transition-all duration-300 ${
                isCollapsedSearchMenu ? "w-20" : "w-1/4"
              }`}
            >
              <div className="p-4 border-b border-gray-700">
                <button
                  onClick={handleSearchMenuToggle}
                  className="p-2 hover:bg-gray-700 rounded"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                {isCollapsedSearchMenu ? (
                  <span className="text-2xl font-bold">S</span>
                ) : (
                  <span className="text-lg font-medium">Search</span>
                )}
              </div>
              <nav className="p-2 space-y-1">
                {/* Add your sidebar menu items here */}
              </nav>
            </aside>
    </>
  )
}

export default UserDetails
