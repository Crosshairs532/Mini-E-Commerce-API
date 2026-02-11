export declare const authService: {
    RegisterUser: (userData: any) => Promise<import("mongoose").Document<unknown, {}, import("../user/user.interface").TUser, {}, import("mongoose").DefaultSchemaOptions> & import("../user/user.interface").TUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    LoginUser: (userData: any) => Promise<{
        accessToken: string;
        role: import("../user/user.interface").Role;
        email: string;
        name: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map