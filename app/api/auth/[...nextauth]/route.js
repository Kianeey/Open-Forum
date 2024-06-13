import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@/lib/mongoose/modelses/User";
import mongoConnection from "@/lib/mongoose/mongoConnection";

NextAuth({
    callbacks: {},
});

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        autoSignIn: false,
        maxAge: 4 * 60 * 60,
    },
    callbacks: {
        async signIn({ user }) {
            await mongoConnection();
            try {
                const userExist = await User.findOne({
                    email: user.email,
                });

                if (!userExist) {
                    const userCreated = await User.create({
                        name: user.name,
                        email: user.email,
                        profile_picture: {
                            image_sourc: user.image,
                            image_alt: `Profile picture of ${user.name}`,
                        },
                    });
                    if (!userCreated) {
                        return false;
                    }
                }
                return true;
            } catch (error) {
                console.error(error.message);
                return false;
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export {handler as GET, handler as POST};