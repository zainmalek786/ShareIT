import React from 'react';

function Right() {
    return (
        <>
            <div className="md:w-3/12 bg-white hidden md:flex flex-col p-4 space-y-6">
                {/* Trending Topics Section */}
                <div className="bg-slate-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-blue-900 font-bold text-lg mb-2">Trending Topics</h2>
                    <ul className="space-y-3">
                        <li className="text-slate-700">#ReactJS</li>
                        <li className="text-slate-700">#Firebase</li>
                        <li className="text-slate-700">#TailwindCSS</li>
                        <li className="text-slate-700">#JavaScript</li>
                        <li className="text-slate-700">#WebDevelopment</li>
                    </ul>
                </div>

                {/* Who to Follow Section */}
                <div className="bg-slate-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-blue-900 font-bold text-lg mb-2">Who to Follow</h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://via.placeholder.com/50"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h3 className="text-slate-900 font-semibold">John Doe</h3>
                                <p className="text-slate-500">@johndoe</p>
                            </div>
                            <button className="ml-auto bg-blue-900 text-white px-3 py-1 rounded-full text-sm">
                                Follow
                            </button>
                        </div>
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://via.placeholder.com/50"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h3 className="text-slate-900 font-semibold">Jane Smith</h3>
                                <p className="text-slate-500">@janesmith</p>
                            </div>
                            <button className="ml-auto bg-blue-900 text-white px-3 py-1 rounded-full text-sm">
                                Follow
                            </button>
                        </div>
                    </div>
                </div>

                {/* Suggested Articles Section */}
                <div className="bg-slate-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-blue-900 font-bold text-lg mb-2">Suggested Articles</h2>
                    <ul className="space-y-3">
                        <li className="text-slate-700">Understanding React Hooks</li>
                        <li className="text-slate-700">Building Scalable Apps with Firebase</li>
                        <li className="text-slate-700">Tailwind CSS: Utility-First Framework</li>
                        <li className="text-slate-700">JavaScript ES6 Features You Should Know</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Right;
