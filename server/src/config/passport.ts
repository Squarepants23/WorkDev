import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/User";

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },

    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email: profile.emails?.[0].value }],
        });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            fullName: profile.displayName,
            username:
              profile.emails?.[0].value.split("@")[0] +
              Math.floor(Math.random() * 10000),
            email: profile.emails?.[0].value,
            avatar: profile.photos?.[0].value || "",
          });
        } else if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }

        const token = jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET!,
          {
            expiresIn: "7d",
          },
        );

        return done(null, {
          token,
        });
      } catch (error) {
        return done(error as Error);
      }
    },
  ),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "/api/auth/github/callback",
    },

    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        let user = await User.findOne({
          $or: [
            { githubId: profile.id },
            { email }
          ],
        });

        if (!user) {
          user = await User.create({
            githubId: profile.id,
            fullName: profile.displayName || profile.username,
            username:
              profile.username +
              Math.floor(Math.random() * 10000),
            email: email || `${profile.username}@github.local`,
            avatar: profile.photos?.[0]?.value || "",
          });
        } else if (!user.githubId) {
          user.githubId = profile.id;
          await user.save();
        }

        const token = jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET!,
          {
            expiresIn: "7d",
          }
        );

        return done(null, { token });
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

export default passport;
