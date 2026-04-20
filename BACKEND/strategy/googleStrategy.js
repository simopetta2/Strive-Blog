import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Author from '../models/Author.js';
import dotenv from 'dotenv';

dotenv.config();

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const { emails, name, photos } = profile;
        const email = emails[0].value;


        let author = await Author.findOne({ email });


        if (!author) {
            author = new Author({
                name: name.givenName,
                surname: name.familyName,
                email: email,
                avatar: photos[0].value,
            });
            await author.save();
        }


        done(null, author);
    } catch (error) {
        done(error, null);
    }
});

export default googleStrategy;