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
    const [language, setLanguage] = useState("cpp");
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
        axios.post(`/api/compiler/`, {
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

                    <h4 className="font-semibold mt-4">Sample Testcases:</h4>
                    <ul className="list-disc list-inside text-sm">
                        <li>Input: {problem?.sample_input_1}</li>
                        <li>Output: {problem?.sample_output_1}</li>
                        <li>Input: {problem?.sample_input_2}</li>
                        <li>Output: {problem?.sample_output_2}</li>
                    </ul>
                </div>

                {/* Monaco Code Editor */}
                <div>
                    <label className="block font-semibold mb-2">Code Editor:</label>
                    <Editor
                        height="300px"
                        language={language}
                        value={code}
                        onChange={(val) => setCode(val || "")}
                        theme="vs-dark"
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                        }}
                    />
                </div>
            </div>

            {/* Language Selector and Submit Button */}
            <div className="mt-4 flex gap-4 items-center">
                <select
                    className="border p-2 rounded"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="cpp">C++</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Run & Submit
                </button>
            </div>

            {/* Verdict and Stats */}
            <div className="mt-6">
                <h3 className="font-semibold text-green-600">Verdict: {verdict}</h3>
                <p className="text-sm">Runtime: {stats.runtime} ms</p>
                <p className="text-sm">Memory: {stats.memory} KB</p>
                <h4 className="font-semibold mt-2">Output:</h4>
                <pre className="bg-gray-100 p-2 border rounded whitespace-pre-wrap">{output}</pre>
            </div>

            {/* Custom Input */}
            <div className="mt-6">
                <label className="block font-semibold mb-2">Custom Input:</label>
                <textarea
                    rows="6"
                    className="w-full border rounded p-2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                ></textarea>
            </div>

            {/* Previous Submissions */}
            <div className="mt-8">
                <h3 className="text-lg font-bold mb-2">Previous Submissions</h3>
                <ul className="space-y-2">
                    {submissions.map((sub, idx) => (
                        <li key={idx} className="border p-2 rounded bg-white shadow text-sm">
                            <div className="font-semibold text-blue-800">
                                Verdict: {sub.verdict}, Runtime: {sub.runtime} ms, Memory: {sub.memory} KB
                            </div>
                            <pre className="bg-gray-50 p-2 mt-1 overflow-auto max-h-40 whitespace-pre-wrap">
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