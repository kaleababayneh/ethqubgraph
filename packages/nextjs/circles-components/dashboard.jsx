import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollArea } from "../components/ui/scroll-area";
import { Button } from "../components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trustRelations, setTrustRelations] = useState([]);

  useEffect(() => {
    if (location.state && location.state.trustRelations) {
      const mappedRelations = location.state.trustRelations.map((rel) => ({
        timestamp: rel.timestamp,
        objectAvatar: rel.objectAvatar,
        relation: rel.relation,
      }));
      setTrustRelations(mappedRelations);
    }
  }, [location.state]);

  const handleNavigateToMainPage = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full h-full max-w-none bg-white dark:bg-gray-800 shadow-lg rounded-none overflow-hidden">
        <header className="bg-gray-950 text-white px-8 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Trusts Connection Dashboard</h1>
          <Button
            onClick={handleNavigateToMainPage}
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 px-2 rounded"
          >
            Go back to Circles Playground
          </Button>
        </header>
        <main className="p-6 h-[calc(100vh-60px)]">
          <div className="bg-gray-100 dark:bg-gray-900 p-5 rounded-lg h-full">
            {trustRelations.length === 0 ? (
              <p>No trust relations found!</p>
            ) : (
              <ScrollArea className="h-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Relation</TableHead>
                      <TableHead>Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trustRelations.map((relation, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(relation.timestamp * 1000).toLocaleDateString()}</TableCell>
                        <TableCell>{relation.relation}</TableCell>
                        <TableCell>{relation.objectAvatar}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;