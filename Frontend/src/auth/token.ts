import { cookies } from "next/headers";

export default function getToken() {
    const cookieStore = cookies();
    const token = cookieStore.get('CASHTRACKR_TOKEN')?.value
    return token
}