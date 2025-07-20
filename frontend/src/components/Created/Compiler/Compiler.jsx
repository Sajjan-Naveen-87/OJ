import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from "axios";

const Compiler = () => {
    const { id } = useParams();
    const [code, setCode] = useState("// Write your code here");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [problem, setProblem] = useState(null);
    const [verdict, setVerdict] = useState("");
    const [submissions, setSubmissions] = useState([]);
    const [language, setLanguage] = useState("c");
    const [stats, setStats] = useState({ runtime: "", memory: "" });
    const [htmlDesc, setHtmlDesc] = useState("");

    useEffect(() => {
        // Fetch problem details
        axios.get(`http://localhost:8000/api/v1/problems/${id}`)
            .then((res) => {
                setProblem(res.data);
                decodeHtml(res.data.problem_desc);
            })
            .catch((err) => console.error("Error fetching problem:", err));

        // Fetch previous submissions
        axios.get(`/api/compiler/submissions/${id}/`)
            .then((res) => {
                const data = res.data;
                if (Array.isArray(data)) {
                    setSubmissions(data);
                } else if (typeof data === "object" && data !== null) {
                    setSubmissions([data]);
                } else {
                    setSubmissions([]);
                }
            })
            .catch((err) => console.error("Error fetching submissions:", err));
    }, [id]);

    const decodeHtml = (encodedStr) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = encodedStr;
        setHtmlDesc(txt.value);
    };

    const handleSubmit = () => {
        axios.post(`http://127.0.0.1:8000/api/v1/compiler/submit/`, {
            code,
            input_tests: input,
            problem_id: id,
            language,
        }).then((res) => {
            setOutput(res.data.output);
            setVerdict(res.data.verdict);
            setStats({
                runtime: res.data.runtime,
                memory: res.data.memory,
            });
            setSubmissions((prev) => [res.data, ...prev]);
        }).catch((err) => {
            console.error("Submission error:", err);
        });
    };

    const handleRun = () => {
        axios.post(`http://127.0.0.1:8000/api/v1/compiler/`, {
            code,
            input_tests: input,
            problem_id: id,
            language,
        }).then((res) => {
            setOutput(res.data.output);
            setVerdict(res.data.verdict);
            setStats({
                runtime: res.data.runtime,
                memory: res.data.memory,
            });
            setSubmissions((prev) => [res.data, ...prev]);
        }).catch((err) => {
            console.error("Submission error:", err);
        });
    };

    return (
        <div className="p-4">

            {/* Problem Description and Code Editor Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Problem Section */}
                <div>
                    <h2 className="text-xl font-bold mb-2">
                        {problem ? `Title: ${problem.title}` : "Loading..."}
                    </h2>
                    <div
                        className="mb-2 border p-2 rounded prose"
                        dangerouslySetInnerHTML={{ __html: htmlDesc }}
                    ></div>

                    {/* Verdict and Stats */}
                    <div className="mt-10">
                        <h3 className="font-semibold text-green-600">Verdict: {verdict}</h3>
                        <p className="font-semibold text-green-600 text-sm">Runtime: {stats.runtime} ms</p>
                        <p className=" font-semibold text-green-600 text-sm">Memory: {stats.memory} KB</p>
                    </div>
                </div>

                {/* Monaco Code Editor */}
                <div>
                    <label className="font-semibold" id="codinglang">Coding in &nbsp; &nbsp;</label>
                    <select
                        className="border p-2 rounded"
                        id="codinglang"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>
                    <label className="block font-semibold mb-2">Code Editor:</label>
                    <Editor
                        height="600px"
                        language={language}
                        value={code}
                        onChange={(val) => setCode(val || "")}
                        theme="vs-dark"
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: true,
                        }}
                    />
                    <div className="mt-4 flex gap-4 items-center">

                    </div>
                    {/* Custom Input */}
                    <div className="mt-6">
                        <label className="block font-semibold mb-2">Input:</label>
                        <textarea
                            rows="2"
                            className="bg-gray-400 text-black border w-full border rounded p-2"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        ></textarea>
                        <button
                            onClick={handleRun}
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                        >
                            <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                Run
                            </span>
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button
                            onClick={handleSubmit}
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                        >
                            <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                Submit
                            </span>
                        </button>

                        <h4 className="font-semibold mt-2">Output:</h4>
                        <p className="bg-gray-400 p-2 text-black border rounded">{output}</p>
                    </div>
                </div>
            </div>

            {/* Previous Submissions */}
            <div className="mt-8">
                <h3 className="bg-gray-400 text-black border w-full border rounded p-2">Previous Submissions</h3>
                <ul className="space-y-2">
                    {submissions.map((sub, idx) => (
                        <li key={idx} className="border p-2 rounded bg-white shadow text-sm">
                            <p className="font-semibold">abcd{id}</p>
                            <div className="bg-gray-400 text-black border w-full border rounded p-2">
                                Verdict: {sub.verdict}, Runtime: {sub.runtime} ms, Memory: {sub.memory} KB
                            </div>
                            <pre className="bg-gray-400 text-black border w-full border rounded p-2">
                                {sub.code}
                            </pre>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Compiler;