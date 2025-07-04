import React from 'react';

function AboutUs() {
    return (
        <div className="bg-white min-h-screen flex items-center justify-center px-6 py-12">
            <div className="max-w-4xl w-full bg-gray-100 p-10 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    About <span className="text-red-600">CN</span> Notes
                </h2>
                <p className="text-gray-700 text-lg mb-4">
                    At <strong>CN Notes</strong>, we believe that ideas are powerful and should never be lost.
                    That's why we built a fast, secure, and easy-to-use note-taking platform where you can save and access your thoughts anytime, from anywhere.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    Whether you're a student, professional, or creative thinker, CN Notes is here to help you stay organized and inspired.
                    Your notes are stored safely and accessible with just a few clicks.
                </p>
                <p className="text-gray-700 text-lg">
                    We're committed to simplicity, privacy, and performance — because your ideas deserve the best home.
                </p>
            </div>
        </div>
    );
}

export default AboutUs;
