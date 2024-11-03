import React from 'react'
import { Code } from 'lucide-react'
import * as Icon from 'react-feather'

const Footer = () => {
    return (
        <>
            <footer className=" p-4 bg-slate-900 text-white text-center">
                <h3 className="mb-4 text-lg">Connect with Me</h3>
                <div className="flex justify-center space-x-6">
                    <a href="https://www.linkedin.com/in/vinothkumar-nataraj-2285a8251/" target="_blank" rel="noopener noreferrer">
                        <Icon.Linkedin className="w-8 h-8 hover:text-blue-400 hover:-translate-y-2 transition duration-200" />
                    </a>
                    <a href="https://leetcode.com/u/Leetvino/" target="_blank" rel="noopener noreferrer">
                        <Code className="w-8 h-8 hover:text-orange-400 hover:-translate-y-2 transition duration-200" />
                    </a>
                    <a href="https://github.com/Vinoth-Kumar-N" target="_blank" rel="noopener noreferrer">
                        <Icon.GitHub className="w-8 h-8 hover:text-gray-400 hover:-translate-y-2 transition duration-200" />
                    </a>
                </div>
                <p className="mt-4 text-sm">&copy; 2024 Vinoth Kumar N. All rights reserved.<br /></p>
            </footer>
        </>
    )
}

export default Footer