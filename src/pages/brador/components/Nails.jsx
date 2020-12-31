import React from 'react'

import { Droppable } from "react-beautiful-dnd";

import { styles } from "../styles";

import Nail from "./Nail";
function Nails({ nailData, nailIDs, listID, bradorData, setBradorData }) {
    return (
        <Droppable droppableId={listID} type="nail">
            {
                provided => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={styles.nailsList}
                    >
                        {
                            (nailIDs) ? (nailIDs.map((nailID, index) => (
                                <Nail key={nailID} nailData={nailData[nailID]} nailID={nailID} listID={listID} index={index} bradorData={bradorData} setBradorData={setBradorData} />
                            ))) : ("")
                        }
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    )
}

export default Nails
