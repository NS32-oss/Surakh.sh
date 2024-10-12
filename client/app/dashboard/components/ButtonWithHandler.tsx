"use client";

import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { randomBytes } from "crypto";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

interface ApiKeyData {
    clientId: string;
    secret: string;
    expirationDate: Date;
    revoked: boolean;
}

const apiKeysDatabase: { [key: string]: ApiKeyData } = {};

// Function to generate a new API key
function generateApiKey(clientId: string, expirationDays: number) {
    const secret = randomBytes(32).toString("hex");
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    const apiKeyData = {
        clientId,
        secret,
        expirationDate,
        revoked: false,
    };

    apiKeysDatabase[clientId] = apiKeyData;
    return { clientId, secret };
}

const ButtonWithHandler = () => {
    const [apiKeys, setApiKeys] = useState<ApiKeyData[]>([]);
    const handleCreateApiKey = () => {
        const clientId = `project-${apiKeys.length + 1}`;
        const expirationDays = 30;
        const apiKey = generateApiKey(clientId, expirationDays);
        setApiKeys([...apiKeys, apiKeysDatabase[clientId]]);
    };

    const handleToggleRevoked = (clientId: string) => {
        if (apiKeysDatabase[clientId]) {
            const updatedRevokedStatus = !apiKeysDatabase[clientId].revoked;
            apiKeysDatabase[clientId].revoked = updatedRevokedStatus;
            setApiKeys(
                apiKeys.map((key) =>
                    key.clientId === clientId
                        ? { ...key, revoked: updatedRevokedStatus }
                        : key
                )
            );
        }
    };

    const handleDeleteApiKey = (clientId: string) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this API key? This action cannot be undone."
        );
        if (isConfirmed) {
            delete apiKeysDatabase[clientId];
            setApiKeys(apiKeys.filter((key) => key.clientId !== clientId));
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-8">
            <Card>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project ID</TableHead>
                                    <TableHead>Secret</TableHead>
                                    <TableHead>Expiration Date</TableHead>
                                    <TableHead>Revoked</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {apiKeys.map((apiKey) => (
                                    <TableRow key={apiKey.clientId}>
                                        <TableCell>{apiKey.clientId}</TableCell>
                                        <TableCell>{apiKey.secret}</TableCell>
                                        <TableCell>
                                            {apiKey.expirationDate.toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={apiKey.revoked}
                                                onCheckedChange={() =>
                                                    handleToggleRevoked(
                                                        apiKey.clientId
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDeleteApiKey(
                                                            apiKey.clientId
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end py-4">
                <Button onClick={handleCreateApiKey}>
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Create new secret key
                </Button>
            </div>
        </div>
    );
};

export default ButtonWithHandler;
