import styled from "styled-components";
import {Art} from "../interfaces/Art.ts";

const AllCharsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    background-color: bisque;
`;

const SingleCharDiv=styled.div`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    max-width: 30%;
    padding: 2%;
    margin: 1%;
    background-color: 'darkorange';
    color: 'white';
    border: 3px darkred solid;
    font: italic small-caps bold calc(2px + 1vw) Papyrus, fantasy;
    text-align: center;
`;

export default function MetropolitanMuseumArt(props : { data:Art[] } ){
    return (
        <AllCharsDiv>
            {
                props.data.map((char: Art) =>
                    <SingleCharDiv key={char.objectID}>
                        <h1>{char.title}</h1>
                        <p>{char.culture || "Uknown Culture"}</p>
                        <img src={char.primaryImage} alt={`image of ${char.title}`} />
                    </SingleCharDiv>
                )
            }
        </AllCharsDiv>
    );
}
