import React, { useState, useEffect } from "react";
import axios from "axios";
import AddAgentForm from "./AddAgentForm";
import UploadListForm from "./UploadListForm";

export default function Dashboard({ history }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const token = localStorage.getItem("token");
      if (!token) return history.push("/login");
      try {
        const res = await axios.get("/api/list/all", {
          headers: { Authorization: "Bearer " + token },
        });
        setLists(res.data);
      } catch {
        history.push("/login");
      }
    };
    fetchLists();
  }, [history]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <AddAgentForm />
        </div>
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <UploadListForm />
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Distributed Lists</h3>

      {lists
        .filter((agent) => agent.items && agent.items.length > 0) // show only agents with items
        .map((agent) => (
          <div
            key={agent.agentId}
            className="mb-6 p-4 border rounded-lg shadow-md bg-gray-50"
          >
            <h4 className="font-semibold mb-2">
              Agent: <span className="text-blue-600">{agent.agentName}</span> (
              <span className="text-gray-500">{agent.agentEmail}</span>)
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Phone</th>
                    <th className="px-4 py-2 border">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {agent.items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{item._id}</td>
                      <td className="px-4 py-2 border">{item.firstName || "N/A"}</td>
                      <td className="px-4 py-2 border">{item.phone || "—"}</td>
                      <td className="px-4 py-2 border">{item.notes || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </div>
  );
}
