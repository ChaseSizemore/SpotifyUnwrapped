import React, {useState} from "react";

import NavBar from "./NavBar";
import Cookies from "js-cookie";

const Artists  = () => {

    const initialCookieValue = Cookies.get('spotify_access_token');
    const [cookie, setCookie] = useState<string | undefined>(initialCookieValue);
    const [artists, setArtists] = useState<any>({
        display_name: '',
        followers: {total: 0},
        images: [],
    });

    const getArtists = async () => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
                headers: {
                    Authorization: `Bearer ${cookie}`,
                },
            });
            const data = await response.json();
            console.log(data);
            setArtists({
                display_name: data.display_name,
                followers: data.followers,
                images: data.images,
                country: data.country,
                product: data.product,
            });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <NavBar />
            <div className="ml-20">
                <h1 className="text-2xl font-bold">Artists</h1>


            </div>
        </>
    );
};

export default Artists;