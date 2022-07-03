import { db } from "./keys_dev.js"
import { keys } from "./keys_prod.js"

export let key;

if (process.env.NODE_ENV === 'production') {
    key = keys;
} else {
    key = db;
}
