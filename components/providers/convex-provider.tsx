"use client";

import { ReactNode } from 'react'
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { esES,enUS } from "@clerk/localizations";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ClerkProvider localization={enUS} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
            <ConvexProviderWithClerk
                useAuth={useAuth}
                client={convex}
            >
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}