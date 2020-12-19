import React from 'react'

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Nail from "./Nail";
function Nails({ nailData, nailIDs, listID }) {
    return (
        <Droppable droppableId={listID} type="nail">
            {
                provided => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {
                            nailIDs.map((nailID, index) => (
                                <Nail nailData={nailData[nailID]} index={index} key={nailID} />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    )
}

export default Nails
