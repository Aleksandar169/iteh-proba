import { useState } from "react";

import Pcelinjak from "./Pcelinjak";
import NewPcelinjak from "./NewPcelinjak";


export default function ListaPcelinjaka(){
  

    return (
    <>
    <NewPcelinjak />
    <ul>
           <Pcelinjak
          naziv="Hergoleša"
          geoSirina={43.32}
          geoDuzina={21.89}
          adresa="Priboj"
        />

        <Pcelinjak
          naziv="Hergoleša"
          geoSirina={43.32}
          geoDuzina={21.89}
          adresa="Priboj"
        />
    </ul>
    </>
    );
}

