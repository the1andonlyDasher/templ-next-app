"use client"

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next'; // For accessing cookies on the client-side
import { useEffect, useState } from 'react';

async function fetchUser(id: number, token: string) {
    const response = await fetch(`/api/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    return response.json();
}


export default function DashboardPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const router = useRouter()

    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);




    const { data, error, isLoading }: any = useQuery({ queryKey: ["user", id], queryFn: () => fetchUser(Number(id), token as string) })

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {(error as Error).message}</p>;
    }

    if (!data) {
        return <p>No user data found</p>;
    }

    return (
        <div>
            <h1>Welcome, {data.name || data.email}!</h1>
            <p>Email: {data.email}</p>
            <p>Account created on: {new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
    );
}
