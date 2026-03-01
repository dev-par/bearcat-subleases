import { db } from "../db/db";


export async function getUsers() {
    return await db.query.User.findMany();
}

export async function getListings() {
    return await db.query.Listing.findMany();
}

export async function getUsersWithListings() {
    return await db.query.User.findMany({
        with: {
            listings: true
        }
    })
}