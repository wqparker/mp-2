import MetropolitanMuseumArt from "./components/MetropolitanMuseumArt.tsx";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {Art} from "./interfaces/Art.ts";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    border: 5px darkgoldenrod solid;
`;

export default function App(){

    // useState Hook to store Data.
    const [data, setData] = useState<Art[]>([]);

    // useEffect Hook for error handling and re-rendering.
    useEffect(() => {
        async function fetchData(): Promise<void> {
          // Grab raw data, in this case a list of object ids
          const rawData = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects");
          const { objectIDs } = await rawData.json();
      
          // Grab portion of the objects since there are many many thousands
          // I settled on this range to avoid weird entries and repeat entries
          const selectedIDs = objectIDs.slice(120, 220);
      
          // Fetch object details for selected range in parallel
          // This step is needed as in contrast to the Rick and Morty api, the initial call above
          // only returns a list of object ids, we must then grab the info (img, title, etc) for each id respectively
          const arts = await Promise.all(
            selectedIDs.map(async (id: number) => {
              const artResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
              return artResponse.json();
            })
          );
      
          // Filter out those with empty images
          // Lots of objects had no image, I decided to filter these out and not display them
          const artsWithImages = arts.filter((art) => art.primaryImage && art.primaryImage !== "");
          setData(artsWithImages);
        }
      
        fetchData()
          .then(() => console.log("Data fetched successfully"))
          .catch((e: Error) => console.error("There was an error: " + e));
      }, [data.length]);
      

    return(
        <ParentDiv>
            <MetropolitanMuseumArt data={data}/>
        </ParentDiv>
    )
}
