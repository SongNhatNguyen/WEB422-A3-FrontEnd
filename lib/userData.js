import { getToken } from "./authenticate";

async function request(url, method = "GET") {
  const token = getToken();
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${url}`, {
    method: method,
    headers: {
      Authorization: `JWT ${token}`,
      "content-type": "application/json",
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function addToFavourites(id) {
  return await request(id, "PUT");
}

export async function removeFromFavourites(id) {
  return await request(id, "DELETE");
}

export async function getFavourites() {
  return await request("");
}