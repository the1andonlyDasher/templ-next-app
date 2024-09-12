"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import { ReactNode, useState } from "react";

const QueryProvider = ({ children }: { children: ReactNode }) => {
    // Create QueryClient in a Client Component
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;
