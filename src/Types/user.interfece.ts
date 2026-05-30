// import { UserRole } from "@/lib/auth-utils";
// import { IAdmin } from "./admin.interface";
// import { IAdmin } from "./admin.interface";
// import { IAdmin } from "./admin.interface";
// import { IDoctor } from "./doctor.interface";




// import { IPatient } from "./patient.interface";
export type UserRole = "ADMIN" | "SUPER_ADMIN" | "USER";
export interface UserInfo {
   id: string;
   name: string;
   email: string;
   role: UserRole;
   needPasswordChange: boolean;
   status: "ACTIVE" | "BLOCKED" | "DELETED";
   user?: UserInfo;
   profilePhoto?: string;
   createdAt: string;
   updatedAt: string;
}

export type ActionState = {
   success?: boolean;
   message?: string;
   errors?: Record<string, string>;
   // …other fields…

   // added so the server action can tell the client where to navigate next
   redirectTo?: string;
};
