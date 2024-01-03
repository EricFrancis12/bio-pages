// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import type { User, BioPage } from "../types";

// type TContextValue = {
//     user: User | null,
//     refreshUser?: any,
//     bioPages: BioPage[],
//     refreshBioPages?: any
// };

// const defaultContext: TContextValue = { user: null, bioPages: [] };

// const UserInfoContext = React.createContext(defaultContext);

// export function useUserInfo() {
//     return useContext(UserInfoContext);
// }

// export default function UserInfoProvider({ children }: {
//     children: React.ReactElement
// }) {
//     const { data: session } = useSession();
//     const user_id = session?.user?.name;

//     const [user, setUser] = useState<User | null>(null);
//     const [bioPages, setBioPages] = useState<BioPage[]>([]);

//     useEffect(() => {
//         if (!user_id) {
//             setUser(null);
//             setBioPages([]);
//         } else {
//             refreshUser();
//             refreshBioPages();
//         }
//     }, [user_id]);

//     async function refreshUser() {
//         if (!user_id) return;

//         const res = await fetch(`/api/db/users/${user_id}`);
//         const newUser = await res.json();
//         if (newUser) {
//             setUser(newUser);
//         }
//     }

//     async function refreshBioPages() {
//         if (!user_id) return;

//         const res = await fetch('/api/db/bio-pages');
//         const newBioPages = await res.json();
//         if (newBioPages) {
//             setBioPages(newBioPages);
//         }
//     }

//     const value = {
//         user,
//         refreshUser,
//         bioPages,
//         refreshBioPages
//     };

//     return (
//         <UserInfoContext.Provider value={value}>
//             {children}
//         </UserInfoContext.Provider>
//     )
// }
